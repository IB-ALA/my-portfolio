
document.querySelectorAll('.js-hamburger-menu-toggler').forEach((elemrnt) => {
  elemrnt.addEventListener('click', () => {
    document.querySelector('.js-menu-links').classList.toggle('show');
    document.querySelector('.js-hamburger-icon').classList.toggle('show');
    console.log('working');
    
  });
});