/**
 * Optics Lab — 网站核心引擎
 * =============================
 * 功能：主题渲染、导航构建、页面路由、Markdown加载、LaTeX渲染
 * 用户只需编辑 config.js 来定制网站，不要修改这个文件
 */

// ============================================================
// 1. 主题引擎：从 CONFIG 读取配色方案，注入 CSS 变量
// ============================================================
(function applyTheme() {
  const preset = CONFIG.themePreset || 'dark-blue';
  const theme = CONFIG.themes[preset] || CONFIG.themes['dark-blue'];

  const vars = [
    `--bg: ${theme.bg}`,
    `--surface: ${theme.surface}`,
    `--border: ${theme.border}`,
    `--text: ${theme.text}`,
    `--heading: ${theme.heading}`,
    `--muted: ${theme.muted}`,
    `--accent: ${theme.accent}`,
    `--accent2: ${theme.accent2}`,
    `--code-bg: ${theme.codeBg}`,
    `--nav-width: ${theme.navWidth || 260}px`,
    `--font-body: ${CONFIG.fonts?.body || 'sans-serif'}`,
    `--font-heading: ${CONFIG.fonts?.heading || 'sans-serif'}`,
    `--font-code: ${CONFIG.fonts?.code || 'monospace'}`,
    `--font-math: ${CONFIG.fonts?.math || 'serif'}`,
    `--content-max: ${CONFIG.layout?.contentMaxWidth || 960}px`,
  ].join(';');

  document.getElementById('dynamic-theme').textContent = `:root { ${vars} }`;
  document.getElementById('site-name').textContent = CONFIG.siteName;
  document.getElementById('site-subtitle').textContent = CONFIG.subtitle;
  document.getElementById('nav-footer-text').textContent =
    `© ${new Date().getFullYear()} ${CONFIG.author}`;

  document.title = CONFIG.siteName + ' — 光学学习档案';
})();

// ============================================================
// 2. 导航构建：根据 NAV_ITEMS 生成下拉菜单
// ============================================================
(function buildNavigation() {
  const container = document.getElementById('nav-items');
  if (!container) return;

  NAV_ITEMS.forEach((item, idx) => {
    const section = document.createElement('div');
    section.className = 'nav-section';

    // 分类标题 (可点击展开/折叠)
    const header = document.createElement('div');
    header.className = 'nav-category';
    header.innerHTML = `<span class="nav-icon">${item.icon || ''}</span>${item.label}`;
    header.onclick = function(e) {
      const list = this.nextElementSibling;
      const isOpen = list.style.display !== 'none';
      list.style.display = isOpen ? 'none' : 'block';
      this.classList.toggle('open', !isOpen);
    };

    // 子页面列表
    const list = document.createElement('div');
    list.className = 'nav-sublist';
    list.style.display = idx < 3 ? 'block' : 'none'; // 前3个分类默认展开
    if (idx < 3) header.classList.add('open');

    if (item.children && item.children.length > 0) {
      item.children.forEach(child => {
        const link = document.createElement('a');
        link.className = 'nav-link';
        link.href = '#' + (child.path || child.id);
        const typeIcon = {document:'📄', interactive:'🎮', program:'💻', link:'🔗'}[child.type] || '📄';
        link.innerHTML = `${typeIcon} ${child.label}`;
        link.dataset.path = child.path || child.id;
        link.dataset.source = child.source || '';
        link.dataset.type = child.type || 'document';
        link.dataset.id = child.id;
        link.onclick = function(e) {
          e.preventDefault();
          const navPath = this.dataset.path;
          const source = this.dataset.source;
          const pageType = this.dataset.type;
          const pageId = this.dataset.id;

          // "link" 类型: 在新标签页打开独立 HTML 页面
          if (pageType === 'link') {
            window.open(source, '_blank');
            return;
          }

          window.location.hash = navPath;
          loadPage(navPath, source, pageType, pageId);
          document.querySelectorAll('.nav-link').forEach(a => a.classList.remove('active'));
          this.classList.add('active');

          // 移动端关闭侧栏
          if (window.innerWidth < 768) {
            document.getElementById('sidebar').classList.remove('show');
          }
        };
        list.appendChild(link);
      });
    }

    section.appendChild(header);
    section.appendChild(list);
    container.appendChild(section);
  });

  // 监听 hash 变化 (浏览器前进/后退)
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const link = document.querySelector(`.nav-link[data-path="${hash}"]`);
      if (link) link.click();
    } else {
      showHomepage();
    }
  });
})();

// ============================================================
// 3. 页面路由与加载引擎
// ============================================================
async function loadPage(navPath, source, pageType, pageId) {
  const loading = document.getElementById('loading');
  const errorMsg = document.getElementById('error-msg');
  const article = document.getElementById('article-view');
  const homepage = document.getElementById('homepage');

  // 显示加载状态
  loading.style.display = 'block';
  errorMsg.style.display = 'none';
  article.style.display = 'none';
  homepage.style.display = 'none';

  try {
    // 根据类型决定加载方式
    if (pageType === 'interactive') {
      // 交互演示 — 直接内嵌 HTML
      await loadInteractive(pageId, article);
    } else {
      // 文档/程序 — 加载 Markdown 并渲染
      await loadMarkdown(source, article);
    }

    // 渲染 LaTeX
    if (window.MathJax && CONFIG.mathJax?.enabled !== false) {
      await MathJax.typesetPromise([article]);
    }

    loading.style.display = 'none';
    article.style.display = 'block';

  } catch (err) {
    console.error('加载失败:', err);
    loading.style.display = 'none';
    errorMsg.style.display = 'block';
    errorMsg.innerHTML =
      `<p style="color:var(--accent2);font-size:16px;">⚠️ 内容加载失败</p>
       <p style="color:var(--muted);">路径: ${source || navPath}</p>
       <p style="color:var(--muted);">请检查 config.js 中的 source 路径是否正确，或该文件是否存在。</p>`;
  }
}

// ---- Markdown 加载器 (简易版, 支持代码块/标题/列表/LaTeX) ----
async function loadMarkdown(source, container) {
  const resp = await fetch(source);
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

  let md = await resp.text();

  // 提取 frontmatter (YAML 头)
  let meta = {};
  if (md.startsWith('---')) {
    const end = md.indexOf('---', 3);
    if (end > 0) {
      const fm = md.substring(3, end);
      md = md.substring(end + 3);
      fm.split('\n').forEach(line => {
        const [k, ...v] = line.split(':');
        if (k && v.length) meta[k.trim()] = v.join(':').trim();
      });
    }
  }

  // 简单的 Markdown → HTML 转换
  let html = md2html(md);

  // 包装
  let titleHtml = '';
  if (meta.title) {
    titleHtml = `<h1>${meta.title}</h1>`;
    if (meta.date) titleHtml += `<p style="color:var(--muted)">${meta.date}</p>`;
  }
  container.innerHTML = `<div class="doc-content">${titleHtml}${html}</div>`;
}

// ---- 简易 Markdown → HTML 转换器 ----
function md2html(md) {
  // 代码块 (```...```)
  md = md.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre><code class="language-${lang}">${escapeHtml(code.trim())}</code></pre>`;
  });

  // 行内代码 (`code`)
  md = md.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

  // 标题 (### → h3, ## → h2, # → h1)
  md = md.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
  md = md.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  md = md.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  md = md.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // 加粗 **text**
  md = md.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // 斜体 *text*
  md = md.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // 表格 (简易)
  md = md.replace(/^\|(.+)\|\n\|[-|\s]+\|\n((?:\|.+\|\n?)*)/gm, (match) => {
    const lines = match.trim().split('\n');
    let tbl = '<table>';
    lines.forEach((line, i) => {
      if (i === 1) return; // skip separator
      const cells = line.split('|').filter(c => c.trim());
      const tag = i === 0 ? 'th' : 'td';
      tbl += '<tr>' + cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join('') + '</tr>';
    });
    tbl += '</table>';
    return tbl;
  });

  // 无序列表
  md = md.replace(/^(\s*)[-*] (.+)$/gm, '<li>$2</li>');
  md = md.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');

  // 有序列表
  md = md.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

  // 引用块 (> text)
  md = md.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
  md = md.replace(/<\/blockquote>\n<blockquote>/g, '\n');

  // 水平线 (---)
  md = md.replace(/^---$/gm, '<hr>');

  // 链接 [text](url)
  md = md.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // 图片 ![alt](url)
  md = md.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');

  // 段落：连续的文本行合并
  let html = '';
  const blocks = md.split(/\n\n+/);
  blocks.forEach(block => {
    block = block.trim();
    if (!block) return;
    if (block.startsWith('<h') || block.startsWith('<table') ||
        block.startsWith('<ul') || block.startsWith('<pre') ||
        block.startsWith('<blockquote') || block.startsWith('<hr') ||
        block.startsWith('<img')) {
      html += block + '\n';
    } else if (block.startsWith('<li')) {
      html += '<ul>' + block + '</ul>\n';
    } else {
      html += '<p>' + block.replace(/\n/g, '<br>') + '</p>\n';
    }
  });

  return html;
}

// ---- 交互演示加载器 ----
async function loadInteractive(pageId, container) {
  // 从预设的交互内容加载
  const demos = {
    'angle-mapper': interactiveAngleMapper,
    'slit-diffraction': null,
    'sl-speckle-demo': interactiveSpeckleDemo,
  };
  const fn = demos[pageId];
  if (fn) {
    container.innerHTML = fn();
  } else {
    container.innerHTML = `<div class="doc-content">
      <h1>交互演示</h1>
      <p>请在 Python 环境中运行对应的演示程序：</p>
      <pre><code>cd teaching
python demo_${pageId.replace('demo-','')}.py</code></pre>
      <p style="color:var(--muted);">提示：交互演示需要本地 Python + matplotlib 环境。</p>
    </div>`;
  }
}

// ---- HTML 转义 ----
function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ---- 显示首页 ----
function showHomepage() {
  document.getElementById('article-view').style.display = 'none';
  document.getElementById('loading').style.display = 'none';
  document.getElementById('error-msg').style.display = 'none';
  const hp = document.getElementById('homepage');

  if (CONFIG.homepage?.showHero) {
    document.getElementById('hero-title').textContent =
      CONFIG.homepage.heroTitle || '欢迎';
    document.getElementById('hero-subtitle').textContent =
      CONFIG.homepage.heroSubtitle || '';
  }

  if (CONFIG.homepage?.showRecentUpdates) {
    buildRecentUpdates();
  }

  hp.style.display = 'block';
}

// ---- 构建最近更新列表 ----
function buildRecentUpdates() {
  const container = document.getElementById('recent-updates');
  const items = [];
  NAV_ITEMS.forEach(cat => {
    if (cat.children) {
      cat.children.forEach(child => {
        items.push({
          category: cat.label,
          categoryId: cat.id,
          icon: cat.icon,
          label: child.label,
          type: child.type,
          description: child.description || '',
          id: child.id,
          path: child.path,
          source: child.source,
        });
      });
    }
  });

  // 取前 N 个
  const recent = items.slice(0, CONFIG.homepage.recentCount || 6);
  let html = '<h2>📋 内容索引</h2><div class="card-grid">';
  recent.forEach(item => {
    const typeLabel = {document:'文档', interactive:'交互', program:'程序'}[item.type] || '';
    html += `
    <div class="card" onclick="window.location.hash='${item.path}';
      document.querySelector('.nav-link[data-path=\\'${item.path}\\']')?.click()">
      <div class="card-badge">${typeLabel}</div>
      <h3>${item.icon || ''} ${item.label}</h3>
      <p>${item.description}</p>
      <small style="color:var(--muted)">📁 ${item.category}</small>
    </div>`;
  });
  html += '</div>';
  container.innerHTML = html;
}

// ============================================================
// 4. 交互演示内嵌
// ============================================================

// ---- 角度-频率映射器 (内嵌 Canvas 版) ----
function interactiveAngleMapper() {
  return `
<div class="doc-content">
<h1>📐 角度-频率映射器</h1>
<p>拖动滑块改变平面波的入射角 θ，观察 <strong>sin(θ) = λ / L<sub>x</sub> = λ · f<sub>x</sub></strong> 的几何意义。</p>
<p style="color:var(--muted);font-size:14px;">红色斜线 = 波前（等相位面）| 黑色水平线 = 观测平面 | 红色圆点 = 波前与观测面的交点 | 蓝色箭头 = 空间周期 L<sub>x</sub></p>
<div style="text-align:center;">
  <canvas id="angle-canvas" width="800" height="500" style="border:1px solid var(--border);border-radius:8px;background:#111;"></canvas>
</div>
<div style="text-align:center;margin:16px 0;">
  <label>平面波角度 θ: <input type="range" id="angle-slider" min="5" max="85" value="30" step="1" style="width:300px;">
    <strong><span id="angle-value">30</span>°</strong></label>
</div>
<div id="angle-info" style="text-align:center;font-size:15px;background:var(--surface);padding:12px;border-radius:8px;">
  λ = 1.0 &nbsp;|&nbsp; sin(θ) = <span id="sin-val">0.500</span> &nbsp;|&nbsp;
  L<sub>x</sub> = <span id="lx-val">2.00</span> &nbsp;|&nbsp;
  f<sub>x</sub> = <span id="fx-val">0.500</span>
</div>
</div>
<script>
(function(){
  const canvas = document.getElementById('angle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W=800, H=500, lambda=1.0;
  const slider = document.getElementById('angle-slider');
  function draw(thetaDeg){
    const theta = thetaDeg * Math.PI/180;
    ctx.fillStyle='#111'; ctx.fillRect(0,0,W,H);
    // 观测平面
    const z0 = H/2 + 50;
    ctx.strokeStyle='#fff'; ctx.lineWidth=3;
    ctx.beginPath(); ctx.moveTo(20,z0); ctx.lineTo(W-20,z0); ctx.stroke();
    ctx.fillStyle='#fff'; ctx.font='13px sans-serif';
    ctx.fillText('观测平面 (z=0)', W-150, z0-10);
    // 波前
    const sinT=Math.sin(theta), cosT=Math.cos(theta);
    const nMin=Math.floor((0*sinT - (z0+100)*cosT)/lambda)-5;
    const nMax=Math.ceil((W*sinT - (z0-200)*cosT)/lambda)+5;
    const intersections=[];
    for(let n=nMin; n<=nMax; n++){
      const z1 = (0*sinT - n*lambda)/cosT;
      const z2 = (W*sinT - n*lambda)/cosT;
      ctx.strokeStyle='rgba(255,80,80,0.35)'; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.moveTo(0, z0-z1); ctx.lineTo(W, z0-z2); ctx.stroke();
      const xInt = n*lambda/sinT;
      if(xInt>=20 && xInt<=W-20){ intersections.push(xInt); }
    }
    // 交点圆点
    intersections.forEach(x=>{
      ctx.fillStyle='#ff4444'; ctx.beginPath(); ctx.arc(x, z0, 7, 0, Math.PI*2); ctx.fill();
    });
    // Lx 箭头
    if(intersections.length>=2){
      const mid = Math.floor(intersections.length/2);
      const x1=intersections[mid-1], x2=intersections[mid];
      ctx.strokeStyle='#58a6ff'; ctx.lineWidth=2;
      ctx.beginPath(); ctx.moveTo(x1, z0-25); ctx.lineTo(x2, z0-25); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x1, z0-30); ctx.lineTo(x1, z0-20); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x2, z0-30); ctx.lineTo(x2, z0-20); ctx.stroke();
      ctx.fillStyle='#58a6ff'; ctx.font='bold 14px sans-serif';
      ctx.fillText('Lx='+(x2-x1).toFixed(2), (x1+x2)/2-25, z0-35);
    }
    // 角度标注
    ctx.strokeStyle='rgba(255,255,255,0.4)'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(W/2,z0); ctx.lineTo(W/2+80*Math.cos(Math.PI/2-theta), z0-80*Math.sin(Math.PI/2-theta)); ctx.stroke();
    ctx.fillStyle='#fff'; ctx.font='16px sans-serif'; ctx.fillText('θ='+thetaDeg+'°', W/2+30, z0-40);
  }
  draw(30);
  slider.oninput = function(){
    const v = parseInt(this.value);
    document.getElementById('angle-value').textContent = v;
    const s = Math.sin(v*Math.PI/180), lx = lambda/s;
    document.getElementById('sin-val').textContent = s.toFixed(3);
    document.getElementById('lx-val').textContent = lx.toFixed(2);
    document.getElementById('fx-val').textContent = (1/lx).toFixed(3);
    draw(v);
  };
})();
<\/script>`;
}

// ---- 3×3 散斑演示 ----
function interactiveSpeckleDemo() {
  return `
<div class="doc-content">
<h1>🔬 3×3 散斑投影演示</h1>
<p>完整的 VCSEL→准直镜→DOE→目标面 仿真结果。打开下面的 HTML 文件查看交互式版本：</p>
<div style="background:var(--surface);padding:20px;border-radius:8px;margin:16px 0;">
  <p>📁 交互文件位置：</p>
  <pre><code>C:\\UA study\\claude\\test\\python_sim\\output\\projector_speckle_3x3.html</code></pre>
  <p>在文件资源管理器中双击打开，或 <a href="file:///C:/UA study/claude/test/python_sim/output/projector_speckle_3x3.html">点击这里</a>。</p>
</div>
<h3>仿真参数</h3>
<table>
<tr><th>参数</th><th>值</th></tr>
<tr><td>VCSEL</td><td>32×32 阵列, 940nm, 20° FWHM</td></tr>
<tr><td>准直镜</td><td>f=3.0mm, NA=0.4</td></tr>
<tr><td>DOE</td><td>3×3 Dammann光栅, 8台阶</td></tr>
<tr><td>投影距离</td><td>500mm</td></tr>
<tr><td>散斑对比度</td><td>≈1.0 (完全发展散斑)</td></tr>
</table>
</div>`;
}

// ============================================================
// 5. 页面移动端适配
// ============================================================
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('show');
}

// ============================================================
// 6. 启动：检查 URL hash 并加载对应页面
// ============================================================
(function init() {
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const link = document.querySelector(`.nav-link[data-path="${hash}"]`);
    if (link) {
      link.click();
      return;
    }
  }
  showHomepage();
})();
