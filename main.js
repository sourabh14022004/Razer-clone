// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove('active');
  }
});

// Header scroll effect
const header = document.querySelector('header');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > lastScrollY) {
    // Scrolling down
    header.style.transform = 'translateY(-100%)';
  } else {
    // Scrolling up
    header.style.transform = 'translateY(0)';
  }
  
  // Only update if we've scrolled more than 10px to avoid flickering
  if (Math.abs(currentScrollY - lastScrollY) > 10) {
    lastScrollY = currentScrollY;
  }
  
  // Always show header at the top of the page
  if (currentScrollY < 10) {
    header.style.transform = 'translateY(0)';
  }
});

// Product hover effect
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px)';
    card.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.5)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
  });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    
    if (emailInput.value) {
      // Simulate form submission
      const submitBtn = newsletterForm.querySelector('button');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Subscribing...';
      submitBtn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        alert(`Thank you for subscribing with ${emailInput.value}!`);
        emailInput.value = '';
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    }
  });
}

// Lazy loading images
document.addEventListener('DOMContentLoaded', () => {
  const lazyImages = document.querySelectorAll('img');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = image.src; // Trigger load if it was deferred
          imageObserver.unobserve(image);
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Close mobile menu if open
      mobileMenu.classList.remove('active');
    }
  });
});

// Add animation to elements when they come into view
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.product-card, .category-card, .news-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
};

// Initialize animations
if ('IntersectionObserver' in window) {
  document.addEventListener('DOMContentLoaded', animateOnScroll);
}