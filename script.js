// ============================================================================
// PREMIUM EDUCATIONAL WEBSITE - ENHANCED JAVASCRIPT
// Modern School Management System with Advanced Animations
// ============================================================================

// Mobile Menu Toggle with Enhanced UX
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.site-nav a').forEach(link => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
    });
  });
}

// ============================================================================
// ANIMATED COUNTER FUNCTION
// Smooth number animation for statistics section
// ============================================================================

function animateCounter(element, target, duration = 2000) {
  const increment = target / (duration / 16);
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.ceil(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
}

// ============================================================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// Triggers animations when elements enter viewport
// ============================================================================

const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px'
};

// Counter Animation Observer
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.target);
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all stat numbers for animation trigger
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.stat-number').forEach(element => {
    counterObserver.observe(element);
  });
});

// Also animate counters on page load as a fallback
window.addEventListener('load', () => {
  // Add a small delay to ensure DOM is fully rendered
  setTimeout(() => {
    document.querySelectorAll('.stat-number').forEach(element => {
      // Check if animation hasn't already been triggered
      if (element.textContent === '0') {
        const target = parseInt(element.dataset.target);
        animateCounter(element, target);
      }
    });
  }, 300);
});

// ============================================================================
// SCROLL FADE-IN ANIMATIONS
// Animate elements as they scroll into view
// ============================================================================

const scrollObserverOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      scrollObserver.unobserve(entry.target);
    }
  });
}, scrollObserverOptions);

// Observe fade-in elements
document.querySelectorAll('.fade-in-scroll, .fade-in-scroll-delay-1, .fade-in-scroll-delay-2, .fade-in-scroll-delay-3, .fade-in-scroll-delay-4, .fade-in-scroll-delay-5, .fade-in-scroll-delay-6').forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.transition = 'all 0.6s ease-out';
  scrollObserver.observe(element);
});

// ============================================================================
// FORM HANDLING
// Enhanced form submission with validation and feedback
// ============================================================================

const admissionForm = document.getElementById('admission-form');
const contactForm = document.getElementById('contact-form');
const loginForm = document.getElementById('login-form');

function handleFormSubmit(form, feedbackId, successMessage) {
  if (!form) return;

  form.addEventListener('submit', event => {
    event.preventDefault();
    const isValid = form.checkValidity();
    const feedback = document.getElementById(feedbackId);

    if (feedback) {
      if (isValid) {
        feedback.textContent = successMessage;
        feedback.style.color = '#10b981';
        form.reset();
        
        // Clear feedback after 3 seconds
        setTimeout(() => {
          feedback.textContent = '';
        }, 3000);
      } else {
        feedback.textContent = 'Please fill in all required fields correctly.';
        feedback.style.color = '#ef4444';
      }
    }
  });
}

function handleLoginForm(form) {
  if (!form) return;

  form.addEventListener('submit', event => {
    event.preventDefault();
    const feedback = document.getElementById('login-feedback');
    const userId = form.userid.value.trim();
    const password = form.password.value;

    if (userId === 'group_1' && password === 'pass') {
      if (feedback) {
        feedback.textContent = 'Login successful. Redirecting to dashboard...';
        feedback.style.color = '#10b981';
      }
      form.reset();
      setTimeout(() => {
        window.location.href = 'Admin Dashboard.html';
      }, 1000);
    } else {
      if (feedback) {
        feedback.textContent = 'Invalid user ID or password. Please try again.';
        feedback.style.color = '#ef4444';
      }
    }
  });
}

handleFormSubmit(admissionForm, 'admission-feedback', 'Admission application submitted successfully!');
handleFormSubmit(contactForm, 'contact-feedback', 'Message sent successfully!');
handleLoginForm(loginForm);

// ============================================================================
// SMOOTH PARALLAX SCROLLING EFFECT
// Creates depth effect with hero section
// ============================================================================

const hero = document.querySelector('.hero');
const heroBackground = document.querySelector('.hero-background');

if (hero && heroBackground) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroBackground.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
  });
}

// ============================================================================
// THEME TOGGLE FUNCTIONALITY
// Dark/Light mode with localStorage persistence
// ============================================================================

(function() {
  const THEME_KEY = 'salisu_theme';

  function applyTheme(theme) {
    if (theme === 'dark') document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  }

  function toggleTheme() {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    updateButton();
  }

  function updateButton() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.textContent = document.body.classList.contains('dark') ? '☀️ Light' : '🌙 Dark';
  }

  // insert theme toggle button if header exists
  function ensureToggle() {
    const headerInner = document.querySelector('.header-inner');
    if (!headerInner) return;
    if (document.getElementById('theme-toggle')) return;

    const btn = document.createElement('button');
    btn.id = 'theme-toggle';
    btn.className = 'theme-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Toggle theme');
    btn.addEventListener('click', toggleTheme);
    headerInner.appendChild(btn);
    updateButton();
  }

  // Initialize theme from localStorage
  const saved = localStorage.getItem(THEME_KEY);
  applyTheme(saved === 'dark' ? 'dark' : 'light');
  document.addEventListener('DOMContentLoaded', ensureToggle);
  // if DOMContentLoaded already fired
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    ensureToggle();
  }
})();

// ============================================================================
// ENHANCED PARTICLE EFFECTS
// Floating particles with improved performance
// ============================================================================

function initializeParticles() {
  const particles = document.querySelectorAll('.particle');
  if (particles.length === 0) return;

  // Optional: Add parallax effect to particles on mouse movement
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    particles.forEach((particle, index) => {
      const speed = (index + 1) * 20;
      const x = (window.innerWidth * mouseX * 0.5) / speed;
      const y = (window.innerHeight * mouseY * 0.5) / speed;
      particle.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
}

document.addEventListener('DOMContentLoaded', initializeParticles);

// ============================================================================
// SCROLL TO TOP BUTTON (Optional Enhancement)
// Show/hide button based on scroll position
// ============================================================================

function createScrollTopButton() {
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = '↑';
  scrollBtn.className = 'scroll-top-btn';
  scrollBtn.setAttribute('aria-label', 'Scroll to top');
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 300ms ease;
    z-index: 99;
    box-shadow: 0 4px 20px rgba(37, 99, 235, 0.3);
  `;

  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.style.opacity = '1';
      scrollBtn.style.visibility = 'visible';
    } else {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.visibility = 'hidden';
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  scrollBtn.addEventListener('mouseenter', () => {
    scrollBtn.style.transform = 'scale(1.1)';
  });

  scrollBtn.addEventListener('mouseleave', () => {
    scrollBtn.style.transform = 'scale(1)';
  });
}

document.addEventListener('DOMContentLoaded', createScrollTopButton);

// ============================================================================
// SMOOTH SCROLL LINK BEHAVIOR
// Enhance navigation links with smooth scrolling
// ============================================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return; // Skip empty anchors
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ============================================================================
// INTERSECTION OBSERVER FOR STICKY HEADER SHADOW
// Add shadow to header when page is scrolled
// ============================================================================

const header = document.querySelector('.site-header');
if (header) {
  const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        header.style.boxShadow = '0 10px 30px rgba(37, 99, 235, 0.2)';
      } else {
        header.style.boxShadow = '0 4px 20px rgba(37, 99, 235, 0.15)';
      }
    });
  }, { threshold: 0 });

  const headerSentinel = document.createElement('div');
  headerSentinel.style.height = '1px';
  document.body.insertBefore(headerSentinel, header.nextSibling);
  headerObserver.observe(headerSentinel);
}

// ============================================================================
// PERFORMANCE OPTIMIZATION
// Debounce scroll and resize events
// ============================================================================

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll-heavy operations if needed
const debouncedScroll = debounce(() => {
  // Add any additional scroll-based operations here
}, 100);

window.addEventListener('scroll', debouncedScroll, { passive: true });

console.log('✨ Premium Educational Website - JavaScript Initialized Successfully!');
  }

  // insert button if header exists
  function ensureToggle() {
    const headerInner = document.querySelector('.header-inner');
    if (!headerInner) return;
    if (document.getElementById('theme-toggle')) return;

    const btn = document.createElement('button');
    btn.id = 'theme-toggle';
    btn.className = 'theme-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Toggle theme');
    btn.addEventListener('click', toggleTheme);
    headerInner.appendChild(btn);
    updateButton();
  }

  // initialize
  const saved = localStorage.getItem(THEME_KEY);
  applyTheme(saved === 'dark' ? 'dark' : 'light');
  document.addEventListener('DOMContentLoaded', ensureToggle);
  // if DOMContentLoaded already fired
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    ensureToggle();
  }
})();

