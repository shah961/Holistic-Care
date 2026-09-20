/**
 * HOLISTIC CARE PHARMACY - CORE FUNCTIONALITY (main.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initFAQAccordion();
  initProductCategoryFilters();
  initContactFormValidation();
});

/**
 * Mobile Navigation Functionality
 * Strictly explicit click trigger (NO swipe gestures)
 */
function initMobileNavigation() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const closeNavBtn = document.getElementById('closeNavBtn');
  const mobileNavMenu = document.getElementById('mobileNavMenu');
  const body = document.body;

  if (!hamburgerBtn || !mobileNavMenu) return;

  function openMenu() {
    mobileNavMenu.classList.add('is-open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    hamburgerBtn.setAttribute('aria-label', 'Close navigation');
    body.classList.add('nav-open');
  }

  function closeMenu() {
    mobileNavMenu.classList.remove('is-open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    hamburgerBtn.setAttribute('aria-label', 'Open navigation');
    body.classList.remove('nav-open');
  }

  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = mobileNavMenu.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeNavBtn) {
    closeNavBtn.addEventListener('click', closeMenu);
  }

  // Close menu on clicking outside menu container
  document.addEventListener('click', (e) => {
    if (mobileNavMenu.classList.contains('is-open') && 
        !mobileNavMenu.contains(e.target) && 
        !hamburgerBtn.contains(e.target)) {
      closeMenu();
    }
  });

  // Keyboard navigation escape close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNavMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

/**
 * FAQ Accordion Interface
 */
function initFAQAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const isOpen = faqItem.classList.contains('active');

      // Close all active items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const q = item.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        faqItem.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * Product Categories Filter
 */
function initProductCategoryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-category-card');

  if (!filterBtns.length || !productCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Frontend Contact Form Handler
 */
function initContactFormValidation() {
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const emailAddress = document.getElementById('emailAddress').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!fullName || !emailAddress || !phoneNumber || !message) {
      if (formFeedback) {
        formFeedback.className = 'form-feedback';
        formFeedback.style.backgroundColor = '#FDE8E8';
        formFeedback.style.color = '#9B1C1C';
        formFeedback.style.display = 'block';
        formFeedback.textContent = 'Please fill out all required fields.';
      }
      return;
    }

    if (formFeedback) {
      formFeedback.className = 'form-feedback success';
      formFeedback.style.display = 'block';
      formFeedback.textContent = 'Thank you! Your inquiry details have been logged. For immediate direct service, feel free to reach us via WhatsApp (+92 304 4211888).';
    }

    contactForm.reset();
  });
}
