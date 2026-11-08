const menu=document.querySelector('.menu');const nav=document.querySelector('#navigation');function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Ouvrir le menu');menu.textContent='☰'}menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu');menu.textContent=open?'×':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();menu.focus()}});

(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const root=document.documentElement,header=document.querySelector('header');
 let last=window.scrollY,queued=false,reset;
 const update=()=>{
  const current=window.scrollY,delta=current-last;last=current;queued=false;
  header.classList.toggle('is-scrolled',current>24);
  if(reduced.matches)return;
  const range=Math.max(1,document.documentElement.scrollHeight-innerHeight);
  root.style.setProperty('--background-shift',`${Math.min(1,current/range)*-24}px`);
  root.style.setProperty('--logo-angle',`${Math.max(-9,Math.min(9,delta*.35))}deg`);
  root.style.setProperty('--logo-lift',`${Math.max(-2,Math.min(2,-delta*.08))}px`);
  clearTimeout(reset);reset=setTimeout(()=>{root.style.setProperty('--logo-angle','0deg');root.style.setProperty('--logo-lift','0px')},160);
 };
 addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(update)}},{passive:true});
 reduced.addEventListener('change',()=>{root.style.setProperty('--logo-angle','0deg');root.style.setProperty('--logo-lift','0px');root.style.setProperty('--background-shift','0px')});
 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){if(!reduced.matches)entry.target.classList.add('motion-reveal');observer.unobserve(entry.target)}}),{threshold:.12});
  document.querySelectorAll('.section-head,.commitments article,.service-details article,.recruit-photo,.recruit-copy,.team-photo').forEach(el=>observer.observe(el));
 }
 update();
})();

(()=>{const scene=document.querySelector('.hero-slideshow'),button=document.querySelector('.slideshow-pause');if(!scene||!button)return;button.addEventListener('click',()=>{const paused=scene.classList.toggle('is-paused');button.setAttribute('aria-pressed',String(paused));button.setAttribute('aria-label',paused?'Reprendre le diaporama':'Mettre le diaporama en pause');button.textContent=paused?'▶ Reprendre':'Ⅱ Pause'});})();

(()=>{const form=document.querySelector('#quote-form');if(!form)return;const summary=document.querySelector('#quote-summary');form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const get=k=>String(data.get(k)||'').trim();const body=['Bonjour,','', 'Je souhaite échanger avec EGIP au sujet du projet suivant :','',`Prestation : ${get('service')}`,`Nom : ${get('fullname')}`,`Entreprise : ${get('company')||'Non renseignée'}`,`E-mail : ${get('email')}`,`Téléphone : ${get('phone')}`,`Lieu du site : ${get('location')}`,`Démarrage : ${get('timing')}`,'','Description du projet :',get('message'),'','Merci de me recontacter.'].join('\n');summary.value=body;document.querySelector('#quote-feedback').hidden=false;window.location.href='mailto:egipsarl@hotmail.fr?subject='+encodeURIComponent('Demande de devis EGIP — '+get('service'))+'&body='+encodeURIComponent(body)});document.querySelector('#copy-quote').addEventListener('click',async()=>{const status=document.querySelector('#copy-status');try{await navigator.clipboard.writeText(summary.value);status.textContent='Demande copiée.'}catch{summary.focus();summary.select();status.textContent='Sélectionnez et copiez le texte de votre demande.'}})})();
