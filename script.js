const navIcon = document.querySelector('.nav-icon');
const nav = document.querySelector('nav');
const homeSection = document.getElementById('home');

navIcon.addEventListener('click', () => {
  nav.style.display = 'block';
  navIcon.style.display = 'none';
});

document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !navIcon.contains(e.target)) {
    nav.style.display = 'none';
    navIcon.style.display = 'block';
  }
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.style.display = 'none';
    navIcon.style.display = 'block';
  });
});

window.addEventListener('scroll', () => {
  nav.style.display = 'none';
  navIcon.style.display = 'block';
});
