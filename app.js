
(function(){
  const KEY_LANG='site-lang';
  const KEY_THEME='theme';
  const root=document.documentElement;
  const toggle=document.getElementById('theme-toggle');
  const savedTheme=localStorage.getItem(KEY_THEME);
  function applyTheme(t){ root.setAttribute('data-theme', t||''); localStorage.setItem(KEY_THEME, t||''); }
  if(savedTheme){ applyTheme(savedTheme); }
  if(toggle){ toggle.addEventListener('click',()=>{const c=root.getAttribute('data-theme');applyTheme(c==='dark'?'light':'dark');}); }

  function markActiveLang(lang){
    document.querySelectorAll('.lang-btn').forEach(b=>{
      const is=(b.dataset&&b.dataset.lang)===lang;
      b.setAttribute('aria-pressed', is?'true':'false');
      b.classList.toggle('active', is);
    });
  }
  async function fetchJson(p){ const r=await fetch(p); if(!r.ok) throw new Error('Fetch '+p); return r.json(); }
  async function loadLanguage(lang){
    const en=await fetchJson('lang/en.json');
    let dict=en;
    if(lang && lang!=='en'){
      try{ const overlay=await fetchJson('lang/'+lang+'.json'); dict=Object.assign({}, en, overlay); }catch(e){}
    }
    document.querySelectorAll('[data-i18n]').forEach(el=>{ const k=el.getAttribute('data-i18n'); if(dict[k]!==undefined){ el.textContent=dict[k]; }});
    markActiveLang(lang||'en');
  }
  window.setLanguage=async function(lang){ localStorage.setItem(KEY_LANG,lang); await loadLanguage(lang); };
  (async function(){
    const saved=localStorage.getItem(KEY_LANG);
    const b=(navigator.language||'').toLowerCase();
    const det=saved||(b.startsWith('fr')&&'fr')||(b.startsWith('ru')&&'ru')||((b.startsWith('uk')||b.startsWith('ua'))&&'uk')||(b.startsWith('es')&&'es')||'en';
    await loadLanguage(det);
  })();
})();
