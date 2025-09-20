
function myMenuFunction(){
    var menuBtn = document.getElementById("myNavMenu");
    if(menuBtn.className === "nav-menu"){
        menuBtn.className += " responsive";
    } else {
        menuBtn.className = "nav-menu";
    }
}

// Închide meniul când se face click pe un link
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const menuBtn = document.getElementById("myNavMenu");
            if(menuBtn.className.includes("responsive")) {
                menuBtn.className = "nav-menu";
            }
        });
    });
});

window.onscroll = function() {headerShadow()};

function headerShadow(){
    const navHeader = document.getElementById("header");
    if(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50){
        navHeader.style.boxShadow = "0 1px 6px rgba(0,0,0,0.1)";
        navHeader.style.height = "70px";
        navHeader.style.lineHeight = "70px";
    } else{
        navHeader.style.boxShadow = "none";
        navHeader.style.height = "90px";
        navHeader.style.lineHeight = "90px";
    }
}

function downloadCV(){
  const link = document.createElement("a");
  link.href = "assets/js/My_CV.pdf";
  link.download = "My_CV.pdf";
  link.click();
}

/* ----- TYPING EFFECT ----- */
var typingEffect = new Typed(".typedText",{
    strings : ["Developer","Developer","Developer"],
    loop : true,
    typeSpeed : 100, 
    backSpeed : 80,
    backDelay : 2000
 })
/* ----- ## -- SCROLL REVEAL ANIMATION -- ## ----- */
 const sr = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 2000,
        reset: true     
 })
/* -- HOME -- */
sr.reveal('.featured-text-card',{})
sr.reveal('.featured-name',{delay: 100})
sr.reveal('.featured-text-info',{delay: 200})
sr.reveal('.featured-text-btn',{delay: 200})
sr.reveal('.social_icons',{delay: 200})
sr.reveal('.featured-image',{delay: 300})

/* -- PROJECT BOX -- */
sr.reveal('.project-box',{interval: 200})
/* -- HEADINGS -- */
sr.reveal('.top-header',{})
/* ----- ## -- SCROLL REVEAL LEFT_RIGHT ANIMATION -- ## ----- */
/* -- ABOUT INFO & CONTACT INFO -- */
const srLeft = ScrollReveal({
  origin: 'left',
  distance: '80px',
  duration: 2000,
  reset: true
})

srLeft.reveal('.about-info',{delay: 100})
srLeft.reveal('.contact-info',{delay: 100})
/* -- ABOUT SKILLS & FORM BOX -- */
const srRight = ScrollReveal({
  origin: 'right',
  distance: '80px',
  duration: 2000,
  reset: true
})

srRight.reveal('.skills-box',{delay: 100})
srRight.reveal('.form-control',{delay: 100})

/* ----- CHANGE ACTIVE LINK ----- */

const sections = document.querySelectorAll('section[id]')
function scrollActive() {
  const scrollY = window.scrollY;
  sections.forEach(current =>{
    const sectionHeight = current.offsetHeight,
        sectionTop = current.offsetTop - 50,
      sectionId = current.getAttribute('id')
    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) { 
        document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link')
    }  else {
      document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link')
    }
  })
}
window.addEventListener('scroll', scrollActive)

window.addEventListener('scroll', () => {
  const row = document.querySelector('.timeline-row');
  const line = row.querySelector('.timeline-line');
  const rect = row.getBoundingClientRect();

  const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
  const totalHeight = rect.height;
  const progress = Math.max(0, Math.min(1, visibleHeight / totalHeight));

  if (progress > 0.3) {
    line.style.animationPlayState = 'running';
  } else {
    line.style.animation = 'none'; // resetează
    void line.offsetWidth;         // forțează reflow
    line.style.animation = 'growLine 2s ease-out forwards';
    line.style.animationPlayState = 'paused';
  }

  // skill-urile apar pe rând
  const skills = row.querySelectorAll('.animated-skills span');
  skills.forEach(skill => {
    skill.style.animationPlayState = progress > 0.3 ? 'running' : 'paused';
  });
});

// ----- CONTACT EMAILJS HANDLER -----
(function(){
  const sendBtn = document.querySelector('.form-button .btn');
  if(!sendBtn) return;
  sendBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll('.form-inputs .input-field');
    const nameInput = inputs[0] ? inputs[0].value.trim() : '';
    const emailInput = inputs[1] ? inputs[1].value.trim() : '';
    const message = (document.querySelector('.text-area textarea')?.value || '').trim();

    if(!window.emailjs){ alert('EmailJS not loaded.'); return; }
    const serviceId = 'service_nw2fa5t';
    const templateId = 'template_d4dxvlb';
    const templateParams = {
      from_name: nameInput,
      reply_to: emailInput,
      message: message
    };
    try{
      await emailjs.send(serviceId, templateId, templateParams);
      alert('Mesajul a fost trimis cu succes!');
    }catch(err){
      console.error(err);
      alert('A apărut o eroare la trimitere.');
    }
  });
})();

// ----- PROJECT MODAL -----
const projectModal = document.getElementById('projectModal');
const modalBody = projectModal ? projectModal.querySelector('.modal-body') : null;
const modalCloseBtn = projectModal ? projectModal.querySelector('.modal-close') : null;

function openProjectModal(contentHtml, imageSrc, titleText){
  if(!projectModal || !modalBody) return;
  const visual = `<div class="modal-visual"><img src="${imageSrc}" alt="${titleText}"></div>`;
  const content = `<div class="modal-content-pane">${contentHtml}</div>`;
  modalBody.innerHTML = visual + content;
  projectModal.classList.add('open');
  document.body.classList.add('modal-open');
}

function closeProjectModal(){
  if(!projectModal || !modalBody) return;
  projectModal.classList.remove('open');
  document.body.classList.remove('modal-open');
  modalBody.innerHTML = '';
}

if(modalCloseBtn){
  modalCloseBtn.addEventListener('click', closeProjectModal);
}
if(projectModal){
  projectModal.addEventListener('click', (e) => { if(e.target === projectModal) closeProjectModal(); });
}
window.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeProjectModal(); });

document.querySelectorAll('.project-box').forEach((box) => {
  const btn = box.querySelector('.project-toggle-btn');
  if(!btn) return;
  btn.addEventListener('click', () => {
    const details = btn.nextElementSibling; // existing content
    const title = box.querySelector('h3')?.textContent?.trim() || 'Project';
    const image = box.getAttribute('data-image') || 'assets/images/avatar.png';

    // Find primary project link inside details (if any)
    const projectLinkEl = details ? details.querySelector('a') : null;
    const projectHref = projectLinkEl ? projectLinkEl.getAttribute('href') || '' : '';
    const projectLinkText = projectLinkEl ? (projectLinkEl.textContent || '').trim() || 'Vezi proiectul' : '';

    // Find repository link in the project box (may be in .project-links or have class .repo-btn)
    const repoLinkEl = box.querySelector('.repo-btn') || box.querySelector('.project-links a');
    const repoHref = repoLinkEl ? repoLinkEl.getAttribute('href') || '' : '';

    // Build description HTML (exclude inline <a> tags from details)
    const descriptionHtml = details ? Array.from(details.children)
      .filter(el => el.tagName.toLowerCase() !== 'a')
      .map(el => el.outerHTML)
      .join('') : '';

    // Build CTA HTML: include project button and repository button (if present)
    let ctaHtml = '';
    if(projectHref){
      ctaHtml += `<div class="modal-cta"><a class="btn purple-btn large-btn" href="${projectHref}" target="_blank" rel="noopener">${projectLinkText}</a>`;
    }
    if(repoHref){
      // place repo button next to project button
      ctaHtml += ` <a class="repo-btn large-btn" href="${repoHref}" target="_blank" rel="noopener">Repository</a>`;
    }
    if(projectHref){ ctaHtml += `</div>`; }

    openProjectModal(descriptionHtml + ctaHtml, image, title);
  });
});
