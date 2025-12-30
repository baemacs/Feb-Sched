// script.js — interactive behavior for the valentine page
document.addEventListener('DOMContentLoaded',()=>{
  // Initialize EmailJS with environment variables
  emailjs.init(process.env.EMAILJS_PUBLIC_KEY);

  const surpriseBtn = document.getElementById('surpriseBtn');
  const overlay = document.getElementById('overlay');
  const closeOverlay = document.getElementById('closeOverlay');
  const optionsOverlay = document.getElementById('optionsOverlay');
  const closeOptionsOverlay = document.getElementById('closeOptionsOverlay');
  const finishOverlay = document.getElementById('finishOverlay');
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const proposalHeading = document.getElementById('proposalHeading');
  const confettiRoot = document.getElementById('confetti-root');
  const noArray = ['No, Thanks!', 'Ayaw mo talaga? :(((','Pleaseee T_T', 'Libre kita Burger Steak!', ':(', 'pighati T_T']

  function showOverlay(){
    overlay.classList.remove('hidden');
    yesBtn.focus();
  }

  function close(){
    overlay.classList.add('hidden');
  }

  function closeOptions(){
    optionsOverlay.classList.add('hidden');
  }

  function closeFinish(){
    finishOverlay.classList.add('hidden');
  }

  surpriseBtn.addEventListener('click',showOverlay);
  closeOverlay.addEventListener('click',close);
  closeOptionsOverlay.addEventListener('click',closeOptions);

  // close on escape
  document.addEventListener('keydown',(e)=>{
    if(e.key==='Escape') {
      if(!finishOverlay.classList.contains('hidden')) {
        closeFinish();
      } else if(!optionsOverlay.classList.contains('hidden')) {
        closeOptions();
      } else if(!overlay.classList.contains('hidden')) {
        close();
      }
    }
  });

  yesBtn.addEventListener('click',()=>{
    proposalHeading.textContent = 'Yehey! ✨';
    document.querySelector('.proposal-actions').style.display = 'none';
    runConfetti();
    // show options overlay after confetti
    setTimeout(()=>{
      close();
      optionsOverlay.classList.remove('hidden');
    },1400);
  });

  noBtn.addEventListener('click',()=>{
    // move the button to a random position
    const randomX = Math.random() * (window.innerWidth - 120);
    const randomY = Math.random() * (window.innerHeight - 60);
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.textContent = noArray[Math.floor(Math.random() * noArray.length)];
  });

  // simple confetti — creates small colored rectangles that fall
  function runConfetti(){
    const colors = ['#ff7ab6','#ffd166','#8bd3ff','#c8a2ff','#ff9ccf'];
    const count = 60;
    const width = window.innerWidth;
    for(let i=0;i<count;i++){
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      el.style.background = colors[Math.floor(Math.random()*colors.length)];
      const startLeft = Math.random()*width;
      el.style.left = `${startLeft}px`;
      el.style.top = `${-20 - Math.random()*100}px`;
      el.style.transform = `rotate(${Math.random()*360}deg)`;
      confettiRoot.appendChild(el);

      // animate
      const duration = 2200 + Math.random()*1600;
      el.animate([
        {transform: el.style.transform, top: el.style.top, opacity:1},
        {transform: `translateY(${window.innerHeight + 200}px) rotate(${360+Math.random()*360}deg)`, top: `${window.innerHeight+200}px`, opacity:0}
      ],{duration, easing:'cubic-bezier(.2,.6,.2,1)'});

      // cleanup
      setTimeout(()=>{ try{ el.remove(); }catch(e){} }, duration+400);
    }
  }

  // Option button clicks
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const chosenOption = btn.textContent;
      
      // Send email with chosen option
      emailjs.send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_ID, {
        from_name: 'Valentine App',
        message: `Pia chose: ${chosenOption}`
      })
      .then((response) => {
        console.log('Email sent successfully:', response);
        closeOptions();
        finishOverlay.classList.remove('hidden');
      })
      .catch((error) => {
        console.error('Email failed:', error);
        closeOptions();
        finishOverlay.classList.remove('hidden');
      });
    });
  });

  // Close finish overlay on click
  finishOverlay.addEventListener('click', closeFinish);
});
