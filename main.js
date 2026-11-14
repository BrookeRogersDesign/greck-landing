// Header compacts once you scroll.
const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('is-compact', scrollY > 40);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Split the hero statement into words so they can rise in one by one.
const statement = document.querySelector('.statement');
let i = 0;
const wrapWords = (node) => {
  for (const child of [...node.childNodes]) {
    if (child.nodeType === Node.TEXT_NODE) {
      const frag = document.createDocumentFragment();
      child.textContent.split(/(\s+)/).forEach((part) => {
        if (!part.trim()) return frag.append(part);
        const w = document.createElement('span');
        w.className = 'w';
        w.textContent = part;
        w.style.transitionDelay = `${0.25 + i++ * 0.045}s`;
        frag.append(w);
      });
      child.replaceWith(frag);
    } else {
      wrapWords(child);
    }
  }
};
wrapWords(statement);

// Reveal on scroll.
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }
}, { threshold: 0.2 });
document.querySelectorAll('.reveal, .statement').forEach((el) => io.observe(el));

// The hero is on screen at load, so start its fade-in right away.
setTimeout(() => {
  document.querySelectorAll('.hero .reveal, .hero .statement').forEach((el) => el.classList.add('is-in'));
}, 60);

// Signup. Each email is sent to Kenzie's inbox through FormSubmit (free, no account)
// until the page moves to Shopify. The first signup sends her an activation email;
// nothing gets through until she clicks it. FormSubmit then emails her a random
// address that can replace hers here, so her Gmail isn't in the page source.
const SIGNUP_TO = 'mackenziegreckel@gmail.com';

const signup = document.querySelector('.signup');
const form = signup.querySelector('.signup-form');
const note = signup.querySelector('.form-note');
const button = form.querySelector('button');

const subscribe = (email) =>
  fetch(`https://formsubmit.co/ajax/${SIGNUP_TO}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      email,
      _subject: 'New GRECK list signup',
      _template: 'table',
      _honey: form.elements._honey.value, // bots fill this hidden field; FormSubmit drops those
    }),
  })
    .then((res) => res.json())
    .then((r) => { if (String(r.success) !== 'true') throw new Error(r.message); });

const showError = (msg) => {
  form.classList.remove('is-error');
  void form.offsetWidth;
  form.classList.add('is-error');
  note.textContent = msg;
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = form.elements['contact[email]'];
  if (!email.checkValidity() || !email.value) {
    showError("That email doesn't look right.");
    email.focus();
    return;
  }
  button.disabled = true;
  try {
    await subscribe(email.value.trim());
    signup.classList.add('is-done');
    note.textContent = "You're on the list. We'll be in touch.";
  } catch {
    showError('Something went wrong. Try again in a minute.');
  } finally {
    button.disabled = false;
  }
});

// About photo slideshow: crossfades every few seconds, click to skip ahead.
const slidesEl = document.querySelector('.slides');
const slides = [...slidesEl.querySelectorAll('.slide')];
const count = document.querySelector('.slide-count');
let current = 0;
let timer;
const show = (n) => {
  slides[current].classList.remove('is-active');
  current = (n + slides.length) % slides.length;
  slides[current].classList.add('is-active');
  count.textContent = `${current + 1}/${slides.length}`;
};
const play = () => {
  clearInterval(timer);
  if (slides.length > 1 && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    timer = setInterval(() => show(current + 1), 4000);
  }
};
count.textContent = `1/${slides.length}`;
slidesEl.addEventListener('click', () => { show(current + 1); play(); });
slidesEl.addEventListener('mouseenter', () => clearInterval(timer));
slidesEl.addEventListener('mouseleave', play);
play();
