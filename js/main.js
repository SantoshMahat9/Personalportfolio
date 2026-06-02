/* ============================================================
   main.js — Santosh Mahato Portfolio
   Vanilla JavaScript — no dependencies required
   ============================================================ */

'use strict';

// ------------------------------------------------------------------
// NAVBAR — scroll shadow + active link highlighting
// ------------------------------------------------------------------
(function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');

  /* Add scrolled class for shadow */
  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 20);

    /* Highlight active nav link based on scroll position */
    let currentId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) currentId = sec.id;
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === currentId);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();

// ------------------------------------------------------------------
// MOBILE NAV TOGGLE
// ------------------------------------------------------------------
(function initMobileNav() {
  const toggle  = document.getElementById('navToggle');
  const menu    = document.getElementById('navMenu');
  const navLinks = menu.querySelectorAll('.nav-link');

  function closeMenu() {
    menu.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  /* Close menu when a nav link is clicked */
  navLinks.forEach(link => link.addEventListener('click', closeMenu));

  /* Close on outside click */
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) closeMenu();
  });
})();

// ------------------------------------------------------------------
// SCROLL REVEAL — animate elements as they enter viewport
// ------------------------------------------------------------------
(function initScrollReveal() {
  /* Add .reveal class to elements we want to animate */
  const selectors = [
    '.section-header',
    '.about-text',
    '.about-details',
    '.about-facts',
    '.skill-category',
    '.project-card',
    '.timeline-item',
    '.edu-card',
    '.contact-info',
    '.contact-form',
  ];

  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      /* Stagger child items in a group */
      el.style.transitionDelay = `${i * 0.07}s`;
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

// ------------------------------------------------------------------
// CONTACT FORM — client-side validation + mailto fallback
// ------------------------------------------------------------------
(function initContactForm() {
  const form       = document.getElementById('contactForm');
  if (!form) return;

  const nameInput  = document.getElementById('fname');
  const emailInput = document.getElementById('femail');
  const msgInput   = document.getElementById('fmessage');
  const submitBtn  = document.getElementById('submitBtn');
  const formNote   = document.getElementById('formNote');

  const nameError  = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const msgError   = document.getElementById('messageError');
  const btnText    = submitBtn.querySelector('.btn-text');

  function clearErrors() {
    [nameInput, emailInput, msgInput].forEach(el => el.classList.remove('error'));
    [nameError, emailError, msgError].forEach(el => el.textContent = '');
    formNote.textContent = '';
    formNote.className = 'form-note';
  }

  function validateEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  }

  function validate() {
    let valid = true;

    if (!nameInput.value.trim()) {
      nameInput.classList.add('error');
      nameError.textContent = 'Please enter your name.';
      valid = false;
    }

    if (!emailInput.value.trim()) {
      emailInput.classList.add('error');
      emailError.textContent = 'Please enter your email address.';
      valid = false;
    } else if (!validateEmail(emailInput.value)) {
      emailInput.classList.add('error');
      emailError.textContent = 'Please enter a valid email address.';
      valid = false;
    }

    if (!msgInput.value.trim()) {
      msgInput.classList.add('error');
      msgError.textContent = 'Please enter a message.';
      valid = false;
    }

    return valid;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    if (!validate()) return;

    const name    = nameInput.value.trim();
    const email   = emailInput.value.trim();
    const subject = document.getElementById('fsubject').value.trim() || 'Portfolio Contact';
    const message = msgInput.value.trim();

    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
      const response = await fetch("https://formsubmit.co/ajax/santoshkumarmahato284@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            subject: subject,
            message: message
        })
      });

      if (response.ok) {
        submitBtn.classList.remove('loading');
        btnText.textContent = 'Message Sent ✓';
        showNote('Thank you — your message has been sent.', true);
        form.reset();
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      submitBtn.classList.remove('loading');
      btnText.textContent = 'Send Message';
      showNote('There was an error sending your message. Please try again or email me directly.', false);
    }

    /* Reset button and note after 6s */
    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      btnText.textContent = 'Send Message';
      hideNote();
    }, 6000);
  });

  function showNote(message, success = true) {
    formNote.textContent = message;
    formNote.classList.add('show');
    formNote.classList.toggle('error-note', !success);
  }

  function hideNote() {
    formNote.classList.remove('show');
    formNote.classList.remove('error-note');
    formNote.textContent = '';
  }

  /* Live validation on blur */
  nameInput.addEventListener('blur', () => {
    if (nameInput.value.trim()) {
      nameInput.classList.remove('error');
      nameError.textContent = '';
    }
  });

  emailInput.addEventListener('blur', () => {
    if (emailInput.value.trim() && validateEmail(emailInput.value)) {
      emailInput.classList.remove('error');
      emailError.textContent = '';
    }
  });

  msgInput.addEventListener('blur', () => {
    if (msgInput.value.trim()) {
      msgInput.classList.remove('error');
      msgError.textContent = '';
    }
  });
})();

// ------------------------------------------------------------------
// SMOOTH SCROLL — compensate for fixed navbar height
// ------------------------------------------------------------------
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navH   = document.getElementById('navbar').offsetHeight;
      const top    = target.getBoundingClientRect().top + window.scrollY - navH - 8;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

// ------------------------------------------------------------------
// 3D CARD HOVER & GLARE TILT EFFECT
// ------------------------------------------------------------------
(function initCardTilt() {
  function applyTilt() {
    const cards = document.querySelectorAll('.project-card, .skill-category, .edu-card, .timeline-content, .about-details, .contact-item');
    cards.forEach(card => {
      // Create glare overlay if not present
      if (!card.querySelector('.card-glare')) {
        const glare = document.createElement('div');
        glare.className = 'card-glare';
        card.appendChild(glare);
      }

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xc = rect.width / 2;
        const yc = rect.height / 2;

        const tiltMax = 8; // Max tilt degrees
        const rotateX = ((yc - y) / yc) * tiltMax;
        const rotateY = -((xc - x) / xc) * tiltMax;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;

        const glare = card.querySelector('.card-glare');
        if (glare) {
          glare.style.opacity = '1';
          glare.style.background = `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 75%)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        const glare = card.querySelector('.card-glare');
        if (glare) {
          glare.style.opacity = '0';
        }
      });
    });
  }

  // Run on load and after short delay to handle any dynamic items
  window.addEventListener('DOMContentLoaded', applyTilt);
  setTimeout(applyTilt, 500);
})();

// ------------------------------------------------------------------
// DYNAMIC TYPING EFFECT (Hero Roles)
// ------------------------------------------------------------------
(function initTypingEffect() {
  const textEl = document.getElementById('typing-text');
  if (!textEl) return;

  const roles = [
    "Computer Engineering Student",
    "Full Stack Developer",
    "AI/ML Enthusiast"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      textEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45; // Deleting is faster
    } else {
      textEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 95; // Steady typing
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2000; // Pause at end of role
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 600; // Pause before typing next role
    }

    setTimeout(type, typingSpeed);
  }

  // Start the typing loop
  setTimeout(type, 800);
})();

// ------------------------------------------------------------------
// SCROLL PROGRESS INDICATOR
// ------------------------------------------------------------------
(function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    bar.style.width = scrolled + '%';
  }, { passive: true });
})();

// ------------------------------------------------------------------
// NEWSLETTER SUBSCRIBE FORM
// ------------------------------------------------------------------
(function initSubscribeForm() {
  const form = document.getElementById('subscribeForm');
  if (!form) return;

  const emailInput = document.getElementById('subscribeEmail');
  const submitBtn = document.getElementById('subscribeBtn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    if (!email) return;

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '...';
    submitBtn.disabled = true;

    try {
      const response = await fetch("https://formsubmit.co/ajax/santoshkumarmahato284@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            subject: 'New Newsletter Subscriber',
            email: email,
            message: `You have a new subscriber: ${email}`
        })
      });

      if (response.ok) {
        submitBtn.innerHTML = '✓';
        emailInput.value = '';
        emailInput.placeholder = 'Subscribed!';
      } else {
        throw new Error('Failed');
      }
    } catch (error) {
      submitBtn.innerHTML = '✗';
    }

    setTimeout(() => {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
      emailInput.placeholder = 'Email Address';
    }, 4000);
  });
})();
