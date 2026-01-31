// Form Validation Functions
const contactForm = {
  form: null,
  nameInput: null,
  emailInput: null,
  messageInput: null,
  submitBtn: null,

  init() {
    this.form = document.getElementById('contact');
    this.nameInput = document.getElementById('contact-name');
    this.emailInput = document.getElementById('contact-email');
    this.messageInput = document.getElementById('contact-message');
    this.submitBtn = document.getElementById('submit-btn');

    if (this.form) {
      // Real-time validation on input
      this.nameInput.addEventListener('blur', () => this.validateName());
      this.nameInput.addEventListener('input', () => this.validateName());
      
      this.emailInput.addEventListener('blur', () => this.validateEmail());
      this.emailInput.addEventListener('input', () => this.validateEmail());
      
      this.messageInput.addEventListener('blur', () => this.validateMessage());
      this.messageInput.addEventListener('input', () => this.validateMessage());

      // Form submission
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  },

  validateName() {
    const name = this.nameInput.value.trim();
    const errorEl = document.getElementById('name-error');

    if (!name) {
      this.showError(this.nameInput, errorEl, 'Name is required');
      return false;
    } else if (name.length < 2) {
      this.showError(this.nameInput, errorEl, 'Name must be at least 2 characters');
      return false;
    } else if (!/^[a-zA-Z\s'-]+$/.test(name)) {
      this.showError(this.nameInput, errorEl, 'Name can only contain letters, spaces, hyphens, and apostrophes');
      return false;
    } else {
      this.clearError(this.nameInput, errorEl);
      return true;
    }
  },

  validateEmail() {
    const email = this.emailInput.value.trim();
    const errorEl = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      this.showError(this.emailInput, errorEl, 'Email is required');
      return false;
    } else if (!emailRegex.test(email)) {
      this.showError(this.emailInput, errorEl, 'Please enter a valid email address');
      return false;
    } else {
      this.clearError(this.emailInput, errorEl);
      return true;
    }
  },

  validateMessage() {
    const message = this.messageInput.value.trim();
    const errorEl = document.getElementById('message-error');

    if (!message) {
      this.showError(this.messageInput, errorEl, 'Message is required');
      return false;
    } else if (message.length < 10) {
      this.showError(this.messageInput, errorEl, 'Message must be at least 10 characters');
      return false;
    } else {
      this.clearError(this.messageInput, errorEl);
      return true;
    }
  },

  showError(inputEl, errorEl, message) {
    inputEl.classList.add('invalid');
    inputEl.classList.remove('valid');
    errorEl.textContent = message;
    errorEl.style.display = 'block';
  },

  clearError(inputEl, errorEl) {
    inputEl.classList.remove('invalid');
    inputEl.classList.add('valid');
    errorEl.textContent = '';
    errorEl.style.display = 'none';
  },

  handleSubmit(e) {
    e.preventDefault();

    // Validate all fields
    const isNameValid = this.validateName();
    const isEmailValid = this.validateEmail();
    const isMessageValid = this.validateMessage();

    if (isNameValid && isEmailValid && isMessageValid) {
      // Form is valid - show success message
      const successEl = document.getElementById('form-success');
      successEl.textContent = '✓ Message sent successfully! Thank you for contacting me.';
      successEl.style.display = 'block';

      // Reset form after 2 seconds
      setTimeout(() => {
        this.form.reset();
        this.nameInput.classList.remove('valid');
        this.emailInput.classList.remove('valid');
        this.messageInput.classList.remove('valid');
        successEl.style.display = 'none';
      }, 2000);
    } else {
      // Form is invalid
      const errorEl = document.getElementById('form-success');
      errorEl.textContent = '✗ Please fix the errors above and try again.';
      errorEl.style.display = 'block';
      errorEl.classList.add('error');

      setTimeout(() => {
        errorEl.style.display = 'none';
        errorEl.classList.remove('error');
      }, 3000);
    }
  }
};

// Lightbox Functions
let currentImageIndex = 0;
let allPortfolioImages = [];

function initLightbox() {
  // Get all portfolio images
  const portfolioImages = document.querySelectorAll('.portfolio-item img');
  allPortfolioImages = Array.from(portfolioImages);

  // Add click event listeners to images
  portfolioImages.forEach((img, index) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function(e) {
      e.preventDefault();
      currentImageIndex = index;
      openLightbox(img.src, img.alt);
    });
  });
}

function openLightbox(imageSrc, imageAlt) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxAlt = document.getElementById('lightbox-alt');

  if (lightbox && lightboxImg) {
    lightboxImg.src = imageSrc;
    lightboxImg.alt = imageAlt;
    if (lightboxAlt) {
      lightboxAlt.textContent = imageAlt;
    }
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // Allow scrolling
  }
}

function prevImage() {
  if (allPortfolioImages.length === 0) return;
  currentImageIndex = (currentImageIndex - 1 + allPortfolioImages.length) % allPortfolioImages.length;
  const img = allPortfolioImages[currentImageIndex];
  openLightbox(img.src, img.alt);
}

function nextImage() {
  if (allPortfolioImages.length === 0) return;
  currentImageIndex = (currentImageIndex + 1) % allPortfolioImages.length;
  const img = allPortfolioImages[currentImageIndex];
  openLightbox(img.src, img.alt);
}

// Portfolio Filter Function
function filterMyPortfolio(category) {
  const items = document.querySelectorAll('.portfolio-item');
  const filterButtons = document.querySelectorAll('.filter-btn');

  // Update active button
  filterButtons.forEach(button => {
    button.classList.remove('active');
    if (button.getAttribute('data-filter') === category) {
      button.classList.add('active');
    }
  });

  // Filter items with fade effect
  items.forEach(item => {
    const itemCategory = item.getAttribute('data-category');
    
    if (category === 'all' || itemCategory === category) {
      // Show item with fade-in animation
      item.classList.remove('hidden');
      setTimeout(() => {
        item.classList.add('visible');
      }, 10);
    } else {
      // Hide item with fade-out animation
      item.classList.remove('visible');
      setTimeout(() => {
        item.classList.add('hidden');
      }, 10);
    }
  });
}

// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Hamburger menu toggle
  if (hamburgerMenu && navMenu) {
    hamburgerMenu.addEventListener('click', function() {
      hamburgerMenu.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideNav = navMenu.contains(event.target);
      const isClickInsideButton = hamburgerMenu.contains(event.target);

      if (!isClickInsideNav && !isClickInsideButton && navMenu.classList.contains('active')) {
        hamburgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  // Smooth scrolling with active link detection
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Check if it's an internal anchor link
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // Handle Home button - scroll to top
        if (targetId === 'home') {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          window.history.pushState(null, null, href);
        } else {
          // Scroll to other sections
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            // Smooth scroll to target
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            
            // Update URL without page reload
            window.history.pushState(null, null, href);
          }
        }
      }
    });
  });

  // Detect active section on scroll
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id], article[id], form[id]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + section.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Update active link on scroll
  window.addEventListener('scroll', updateActiveLink);
  
  // Initial call
  updateActiveLink();

  // Initialize lightbox
  initLightbox();

  // Initialize form validation
  contactForm.init();

  // Close lightbox when clicking outside image
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation for lightbox
  document.addEventListener('keydown', function(e) {
    if (document.getElementById('lightbox').classList.contains('active')) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    }
  });
});
