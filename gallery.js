
(function(){
  const modal = document.createElement('div');
  modal.className='modal';
  modal.innerHTML = `
    <div class="modal__inner">
      <div class="modal__head">
        <div class="modal__title">Preview</div>
        <button class="modal__close" aria-label="Close">Close ✕</button>
      </div>
      <div class="modal__body">
        <img alt="Preview"/>
      </div>
    </div>`;
  document.addEventListener('DOMContentLoaded',()=>{
    document.body.appendChild(modal);
    const imgEl = modal.querySelector('img');
    const closeBtn = modal.querySelector('.modal__close');
    function close(){ modal.classList.remove('open'); }
    modal.addEventListener('click', (e)=>{ if(e.target===modal) close(); });
    closeBtn.addEventListener('click', close);

    document.querySelectorAll('.gallery-card').forEach(card=>{
      card.addEventListener('click', (e)=>{
        e.preventDefault();
        const full = card.getAttribute('data-full');
        const title = card.getAttribute('data-title')||'Preview';
        modal.querySelector('.modal__title').textContent = title;
        imgEl.src = full;
        modal.classList.add('open');
      });
    });

    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') close(); });
  });
})();
