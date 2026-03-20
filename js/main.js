document.addEventListener('DOMContentLoaded',()=>{
  const btn=document.getElementById('menu-btn');
  const sidebar=document.getElementById('sidebar');
  const overlay=document.getElementById('overlay');
  const close=()=>{sidebar.classList.add('-translate-x-full');overlay.classList.add('hidden')};
  const open=()=>{sidebar.classList.remove('-translate-x-full');overlay.classList.remove('hidden')};
  if(btn)btn.addEventListener('click',open);
  if(overlay)overlay.addEventListener('click',close);
  document.querySelectorAll('#sidebar a').forEach(a=>a.addEventListener('click',()=>{if(window.innerWidth<1024)close()}));

  document.querySelectorAll('[data-faq]').forEach(el=>{
    el.addEventListener('click',()=>{
      const ans=el.nextElementSibling;
      const icon=el.querySelector('[data-icon]');
      const isOpen=!ans.classList.contains('hidden');
      document.querySelectorAll('[data-faq]').forEach(q=>{
        q.nextElementSibling.classList.add('hidden');
        const ic=q.querySelector('[data-icon]');if(ic)ic.textContent='+';
      });
      if(!isOpen){ans.classList.remove('hidden');if(icon)icon.textContent='\u2212';}
    });
  });

  document.querySelectorAll('[data-tab-btn]').forEach(b=>{
    b.addEventListener('click',()=>{
      const g=b.closest('[data-tab-group]');
      g.querySelectorAll('[data-tab-btn]').forEach(x=>{x.classList.remove('text-primary-500','border-primary-500');x.classList.add('text-slate-500','border-transparent')});
      g.querySelectorAll('[data-tab-panel]').forEach(p=>p.classList.add('hidden'));
      b.classList.add('text-primary-500','border-primary-500');b.classList.remove('text-slate-500','border-transparent');
      const p=g.querySelector(`[data-tab-panel="${b.dataset.tabBtn}"]`);if(p)p.classList.remove('hidden');
    });
  });

  const cur=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('#sidebar a[href]').forEach(a=>{
    if(a.getAttribute('href')===cur||(!cur&&a.getAttribute('href')==='index.html')){
      a.classList.add('bg-primary-50','text-primary-700','font-medium');a.classList.remove('text-slate-600','hover:bg-gray-50');
    }
  });

  const tocLinks=document.querySelectorAll('#toc a');
  if(tocLinks.length){
    const entries=[];
    tocLinks.forEach(l=>{const el=document.getElementById(l.getAttribute('href').slice(1));if(el)entries.push({el,link:l})});
    new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){tocLinks.forEach(l=>{l.classList.remove('text-primary-700','font-medium');l.classList.add('text-slate-500')});const m=entries.find(x=>x.el===e.target);if(m){m.link.classList.add('text-primary-700','font-medium');m.link.classList.remove('text-slate-500')}}})},{rootMargin:'-80px 0px -60% 0px'}).observe&&entries.forEach(e=>new IntersectionObserver(es=>{es.forEach(en=>{if(en.isIntersecting){tocLinks.forEach(l=>{l.classList.remove('text-primary-700','font-medium');l.classList.add('text-slate-500')});const m=entries.find(x=>x.el===en.target);if(m){m.link.classList.add('text-primary-700','font-medium');m.link.classList.remove('text-slate-500')}}})},{rootMargin:'-80px 0px -60% 0px'}).observe(e.el));
  }

  const si=document.getElementById('search-input'),sr=document.getElementById('search-results');
  if(si&&sr){
    const data=[
      {t:'Ars Noveau',s:'魔法',u:'ars-noveau.html',k:'magic spell mana マナ スペル 魔法 グリフ 儀式 防具'},
      {t:'Diamond Compressor',s:'圧縮・強化',u:'diamond-compressor.html',k:'diamond compress enchant 圧縮 ダイヤ エンチャント 強化'},
      {t:'Storage Drawers',s:'ストレージ',u:'storage-drawers.html',k:'drawer storage ドロワー 収納 ホッパー'},
      {t:'MyPet',s:'ペット',u:'mypet.html',k:'pet tame evolve テイム 進化 ペット レアリティ 性格'},
      {t:'LevelledMobs',s:'モブ',u:'levelmobs.html',k:'level mob レベル モブ ドロップ'}
    ];
    si.addEventListener('input',()=>{
      const q=si.value.toLowerCase().trim();
      if(q.length<2){sr.classList.add('hidden');return}
      const m=data.filter(i=>i.t.toLowerCase().includes(q)||i.k.includes(q)||i.s.includes(q));
      sr.innerHTML=m.length?m.map(i=>`<a href="${i.u}" class="block px-4 py-3 hover:bg-gray-50 border-b border-slate-100 last:border-0"><div class="text-sm font-medium text-slate-900">${i.t}</div><div class="text-xs text-slate-500">${i.s}</div></a>`).join(''):'<div class="px-4 py-3 text-sm text-slate-500">結果なし</div>';
      sr.classList.remove('hidden');
    });
    document.addEventListener('click',e=>{if(!e.target.closest('#search-box'))sr.classList.add('hidden')});
  }

  const btt=document.getElementById('btt');
  if(btt){window.addEventListener('scroll',()=>{btt.classList.toggle('opacity-0',scrollY<300);btt.classList.toggle('pointer-events-none',scrollY<300)});btt.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}))}
});
