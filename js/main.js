document.addEventListener('DOMContentLoaded',()=>{
  const menuBtn=document.querySelector('.mobile-menu-btn');
  const sidebar=document.querySelector('.sidebar');
  const overlay=document.querySelector('.sidebar-overlay');
  if(menuBtn){menuBtn.addEventListener('click',()=>{sidebar.classList.toggle('open');overlay.classList.toggle('active')})}
  if(overlay){overlay.addEventListener('click',()=>{sidebar.classList.remove('open');overlay.classList.remove('active')})}
  document.querySelectorAll('.sidebar-nav a').forEach(link=>{link.addEventListener('click',()=>{if(window.innerWidth<=1024){sidebar.classList.remove('open');overlay.classList.remove('active')}})});
  // FAQ
  document.querySelectorAll('.faq-question').forEach(q=>{q.addEventListener('click',()=>{const item=q.parentElement;const answer=item.querySelector('.faq-answer');const isOpen=item.classList.contains('open');document.querySelectorAll('.faq-item.open').forEach(o=>{o.classList.remove('open');o.querySelector('.faq-answer').style.maxHeight='0'});if(!isOpen){item.classList.add('open');answer.style.maxHeight=answer.scrollHeight+'px'}})});
  // Tabs
  document.querySelectorAll('.tab-btn').forEach(btn=>{btn.addEventListener('click',()=>{const g=btn.closest('.tab-group');const t=btn.dataset.tab;g.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));g.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));btn.classList.add('active');g.querySelector('#'+t).classList.add('active')})});
  // Back to top
  const btt=document.querySelector('.back-to-top');
  if(btt){window.addEventListener('scroll',()=>{btt.classList.toggle('visible',window.scrollY>300)});btt.addEventListener('click',()=>{window.scrollTo({top:0,behavior:'smooth'})})}
  // Active sidebar
  const cur=window.location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.sidebar-nav > a, .sidebar-nav .nav-links > a').forEach(l=>{const h=l.getAttribute('href');if(h===cur||(cur===''&&h==='index.html'))l.classList.add('active')});
  // Scroll spy
  const tocLinks=document.querySelectorAll('.sidebar-toc a');
  if(tocLinks.length>0){const headings=[];tocLinks.forEach(l=>{const id=l.getAttribute('href').replace('#','');const el=document.getElementById(id);if(el)headings.push({el,link:l})});const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){tocLinks.forEach(l=>l.classList.remove('active'));const m=headings.find(h=>h.el===e.target);if(m)m.link.classList.add('active')}})},{rootMargin:'-80px 0px -60% 0px'});headings.forEach(h=>obs.observe(h.el))}
  // Search
  const si=document.querySelector('.search-input');const sr=document.querySelector('.search-results');
  if(si&&sr){const data=[
    {title:'Ars Noveau',section:'魔法プラグイン',url:'ars-noveau.html',kw:'ars magic spell mana マナ スペル 魔法 グリフ 儀式'},
    {title:'スペルシステム',section:'Ars Noveau',url:'ars-noveau.html#spell-system',kw:'投射 接触 自己 足元'},
    {title:'防具システム',section:'Ars Noveau',url:'ars-noveau.html#armor-system',kw:'guardian arcane weaver 守護 魔導 魔織'},
    {title:'スレッドシステム',section:'Ars Noveau',url:'ars-noveau.html#thread-system',kw:'thread slot 飛行 暗視'},
    {title:'儀式システム',section:'Ars Noveau',url:'ars-noveau.html#ritual-system',kw:'ritual core pedestal 儀式 台座'},
    {title:'Diamond Compressor',section:'圧縮・強化',url:'diamond-compressor.html',kw:'diamond compress enchant 圧縮 ダイヤ エンチャント 強化'},
    {title:'オーバーエンチャント',section:'Diamond Compressor',url:'diamond-compressor.html#overenchant',kw:'強化 成功率 金床'},
    {title:'Storage Drawers',section:'ストレージ',url:'storage-drawers.html',kw:'drawer storage barrel ドロワー 収納'},
    {title:'MyPet',section:'ペットシステム',url:'mypet.html',kw:'pet tame evolve skill テイム 進化 ペット レアリティ'},
    {title:'レアリティ',section:'MyPet',url:'mypet.html#rarity',kw:'common uncommon rare epic legendary mythic'},
    {title:'進化',section:'MyPet',url:'mypet.html#evolution',kw:'evolve zombie skeleton 進化'},
    {title:'スキルツリー',section:'MyPet',url:'mypet.html#skilltree',kw:'combat farm pvp ride tank support'},
    {title:'LevelledMobs',section:'モブシステム',url:'levelmobs.html',kw:'level mob monster レベル モブ ドロップ'},
    {title:'ドロップテーブル',section:'LevelledMobs',url:'levelmobs.html#drops',kw:'drop loot 報酬'}
  ];
  si.addEventListener('input',()=>{const q=si.value.toLowerCase().trim();if(q.length<2){sr.classList.remove('active');return}const m=data.filter(i=>i.title.toLowerCase().includes(q)||i.kw.toLowerCase().includes(q)||i.section.toLowerCase().includes(q));if(m.length>0){sr.innerHTML=m.map(i=>'<a class="search-result-item" href="'+i.url+'"><div class="result-title">'+i.title+'</div><div class="result-section">'+i.section+'</div></a>').join('');sr.classList.add('active')}else{sr.innerHTML='<div class="search-result-item"><div class="result-title">結果が見つかりませんでした</div></div>';sr.classList.add('active')}});
  document.addEventListener('click',e=>{if(!e.target.closest('.header-search'))sr.classList.remove('active')})}
});
