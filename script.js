const menu=document.querySelector('.menu'),nav=document.querySelector('.nav');
menu?.addEventListener('click',()=>{nav.classList.toggle('open');menu.setAttribute('aria-expanded',nav.classList.contains('open'))});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('seen');revealObserver.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll('.section,.join').forEach(el=>revealObserver.observe(el));

const sections=[...document.querySelectorAll('section[id]')],navLinks=[...document.querySelectorAll('.nav nav a[href^="#"]')];
const setActive=()=>{let current='home';const offset=window.scrollY+130;sections.forEach(s=>{if(s.offsetTop<=offset)current=s.id});navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${current}`))};
setActive();window.addEventListener('scroll',setActive,{passive:true});
