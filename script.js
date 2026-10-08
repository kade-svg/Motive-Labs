(function(){
  const toggle=document.querySelector('.nav-toggle');
  const nav=document.querySelector('.site-nav');
  if(toggle&&nav){
    toggle.addEventListener('click',()=>{
      const open=nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded',String(open));
    });
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
    }));
  }

  const root=document.documentElement;
  const themeButtons=document.querySelectorAll('.theme-toggle');
  function applyTheme(theme){
    root.dataset.theme=theme;
    try{localStorage.setItem('motive-theme',theme);}catch(e){}
    themeButtons.forEach(btn=>{
      const dark=theme==='dark';
      btn.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');
      const label=btn.querySelector('.theme-label');
      if(label) label.textContent=dark?'Light mode':'Dark mode';
      const meta=document.getElementById('theme-color');
      if(meta) meta.setAttribute('content',dark?'#0b0c0f':'#f5f5f7');
    });
  }
  applyTheme(root.dataset.theme || (window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'));
  themeButtons.forEach(btn=>btn.addEventListener('click',()=>applyTheme(root.dataset.theme==='dark'?'light':'dark')));

  const updateRows=document.querySelectorAll('.update-row');
  const updateCount=document.getElementById('update-count');
  const maxUpdates=15;
  updateRows.forEach((row,index)=>{
    if(index>=maxUpdates) row.remove();
  });
  if(updateCount){
    const visibleUpdates=Math.min(updateRows.length,maxUpdates);
    updateCount.textContent=String(visibleUpdates).padStart(2,'0') + (visibleUpdates===1?' update':' updates');
  }

  const modal=document.getElementById('education-modal');
  if(modal){
    const modalTitle=modal.querySelector('[data-modal-title]');
    const modalText=modal.querySelector('[data-modal-text]');
    const close=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');};
    document.querySelectorAll('[data-education-title]').forEach(card=>{
      card.addEventListener('click',()=>{
        if(modalTitle) modalTitle.textContent=card.dataset.educationTitle || '';
        if(modalText) modalText.textContent=card.dataset.educationDescription || '';
        modal.classList.add('open');
        modal.setAttribute('aria-hidden','false');
        document.body.classList.add('modal-open');
      });
    });
    modal.querySelectorAll('[data-modal-close]').forEach(el=>el.addEventListener('click',close));
    document.addEventListener('keydown',event=>{if(event.key==='Escape') close();});
  }

  const items=document.querySelectorAll('.product-card,.os-card,.os-teaser,.education-preview-card,.education-page-card,.update-row,.highlight');
  if('IntersectionObserver' in window){
    const obs=new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){entry.target.classList.add('is-visible');obs.unobserve(entry.target)}
      });
    },{threshold:.12});
    items.forEach(item=>{item.classList.add('reveal');obs.observe(item)});
  }
})();