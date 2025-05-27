// Navegação mobile toggle
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Navbar sticky background ao scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if(window.scrollY > 50){
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Animação fade-in para as seções
const fadeElems = document.querySelectorAll('.fade-in');

function checkFadeIn() {
  const windowBottom = window.innerHeight + window.scrollY;
  fadeElems.forEach(elem => {
    const elemTop = elem.offsetTop;
    if(windowBottom > elemTop + elem.offsetHeight / 4){
      elem.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', checkFadeIn);
window.addEventListener('load', checkFadeIn);

// Carrossel parceiros - pausa no hover
const carousel = document.querySelector('.carousel-track');
let isPaused = false;

carousel.addEventListener('mouseenter', () => {
  carousel.style.animationPlayState = 'paused';
});
carousel.addEventListener('mouseleave', () => {
  carousel.style.animationPlayState = 'running';
});

// Validação simples do formulário
const form = document.getElementById('contact-form');
const feedback = document.getElementById('form-feedback');

form.addEventListener('submit', e => {
  e.preventDefault();
  clearErrors();

  let valid = true;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();

  if(name === ''){
    setError('name', 'Por favor, informe seu nome');
    valid = false;
  }

  if(email === '' || !validateEmail(email)){
    setError('email', 'Informe um email válido');
    valid = false;
  }

  if(subject === ''){
    setError('subject', 'Por favor, informe o assunto');
    valid = false;
  }
  if(message === ''){
    setError('message', 'A mensagem não pode ficar vazia');
    valid = false;
  }

  if(!valid) return;

  // Simula envio
  feedback.textContent = 'Enviando...';
  feedback.style.color = '#555';
  feedback.classList.add('show');

  setTimeout(() => {
    feedback.textContent = 'Mensagem enviada com sucesso! Obrigado pelo contato.';
    feedback.style.color = '#28a745';
    form.reset();
  }, 1500);
});

function setError(fieldName, message) {
  const input = form[fieldName];
  const errorElem = input.nextElementSibling;
  errorElem.textContent = message;
  errorElem.classList.add('error-visible');
  input.focus();
}

function clearErrors() {
  const errors = form.querySelectorAll('.error-visible');
  errors.forEach(el => el.classList.remove('error-visible'));
  feedback.classList.remove('show');
  feedback.textContent = '';
}

function validateEmail(email) {
  // Regex simples para validação de email
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
s