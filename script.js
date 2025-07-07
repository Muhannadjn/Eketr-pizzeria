
// Utility function for smooth scrolling
function scrollToSection(selector) {
  const element = document.querySelector(selector);
  if (element) {
    const headerHeight = document.querySelector('header').offsetHeight + 20; // Extra padding
    const elementPosition = element.offsetTop - headerHeight;
    
    window.scrollTo({
      top: Math.max(0, elementPosition),
      behavior: 'smooth'
    });
  }
}

// Call now functionality
function callNow() {
  window.location.href = 'tel:+46812345067';
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    scrollToSection(targetId);
  });
});

// Enhanced header scroll behavior without parallax to prevent overlapping
let lastScrollTop = 0;
const header = document.querySelector('header');
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Add scrolled class for enhanced styling
  if (scrollTop > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Show/hide back to top button
  if (scrollTop > 500) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
  
  // Keep header visible to prevent layout issues
  header.style.transform = 'translateY(0)';
  
  lastScrollTop = scrollTop;
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Initialize enhanced animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Enhanced info blocks animation
  document.querySelectorAll('.info-block').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
    item.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.2}s`;
    observer.observe(item);
  });

  // Add interactive logo effects
  const logos = document.querySelectorAll('.logo-circle, .hero-logo-circle');
  logos.forEach(logo => {
    logo.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1) rotate(5deg)';
    });
    logo.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) rotate(0deg)';
    });
  });
});

// Add loading state for images
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('load', function() {
      this.style.opacity = '1';
    });
  });
});

// Enhanced mobile menu functionality
function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobileNav');
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const body = document.body;
  
  mobileNav.classList.toggle('active');
  menuToggle.classList.toggle('active');
  body.classList.toggle('mobile-menu-open');
}

function closeMobileMenu() {
  const mobileNav = document.getElementById('mobileNav');
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const body = document.body;
  
  mobileNav.classList.remove('active');
  menuToggle.classList.remove('active');
  body.classList.remove('mobile-menu-open');
}

// Add click handlers for phone numbers
document.addEventListener('DOMContentLoaded', function() {
  const phoneLinks = document.querySelectorAll('.phone-link, .call-button');
  phoneLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Analytics or tracking could be added here
      console.log('Phone call initiated');
    });
  });
});

// Performance optimization: Lazy load map
document.addEventListener('DOMContentLoaded', function() {
  const mapContainer = document.querySelector('.map-container iframe');
  
  const mapObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const iframe = entry.target;
        if (!iframe.src) {
          iframe.src = iframe.dataset.src;
        }
        mapObserver.unobserve(iframe);
      }
    });
  });
  
  if (mapContainer) {
    mapObserver.observe(mapContainer);
  }
});

// Enhanced menu category navigation - scroll to specific category
function showCategory(categoryId) {
  // Update active button
  const buttons = document.querySelectorAll('.menu-nav-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active');
    btn.style.transform = 'scale(1)';
  });
  
  // Find and activate the clicked button
  const activeButton = Array.from(buttons).find(btn => 
    btn.onclick.toString().includes(categoryId)
  );
  if (activeButton) {
    activeButton.classList.add('active');
    activeButton.style.transform = 'scale(1.05)';
  }
  
  // Scroll to specific category with precise positioning
  const selectedCategory = document.getElementById(categoryId);
  if (selectedCategory) {
    // Get accurate measurements
    const header = document.querySelector('header');
    const menuNav = document.querySelector('.menu-nav');
    
    // Calculate total fixed elements height
    const headerRect = header.getBoundingClientRect();
    const menuNavRect = menuNav.getBoundingClientRect();
    const headerHeight = headerRect.height;
    const menuNavHeight = menuNavRect.height;
    
    // Extra padding to ensure category title is clearly visible
    const extraPadding = 60;
    
    // Get the category's position relative to the document
    const categoryRect = selectedCategory.getBoundingClientRect();
    const categoryTop = categoryRect.top + window.pageYOffset;
    
    // Calculate the target scroll position
    const targetPosition = categoryTop - headerHeight - menuNavHeight - extraPadding;
    
    // Ensure we don't scroll past the top of the page
    const finalPosition = Math.max(0, targetPosition);
    
    window.scrollTo({
      top: finalPosition,
      behavior: 'smooth'
    });
  }
}

// Add smooth reveal animation for hero content with mouse parallax
document.addEventListener('DOMContentLoaded', function() {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 300);
  }

  // Mouse movement parallax effect
  document.addEventListener('mousemove', function(e) {
    const mouseX = (e.clientX / window.innerWidth) - 0.5;
    const mouseY = (e.clientY / window.innerHeight) - 0.5;
    
    // Apply subtle parallax to hero logo
    const heroLogo = document.querySelector('.hero-logo-image');
    if (heroLogo) {
      const translateX = mouseX * 8;
      const translateY = mouseY * 8;
      heroLogo.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }
    
    // Apply parallax to hero background elements
    const heroContainer = document.querySelector('.hero-logo-container');
    if (heroContainer) {
      const translateX = mouseX * 5;
      const translateY = mouseY * 5;
      const beforeElement = heroContainer.querySelector('::before');
      const afterElement = heroContainer.querySelector('::after');
    }
  });
});

// Language toggle functionality
let currentLanguage = 'sv'; // Default to Swedish

function toggleLanguage() {
  currentLanguage = currentLanguage === 'sv' ? 'en' : 'sv';
  updateLanguage();
  
  // Update the toggle button
  const toggleBtn = document.querySelector('.language-toggle');
  const flagIcon = toggleBtn.querySelector('.flag-icon');
  const langText = toggleBtn.querySelector('.lang-text');
  
  if (currentLanguage === 'en') {
    flagIcon.textContent = '🇸🇪';
    langText.textContent = 'SV';
  } else {
    flagIcon.textContent = '🇬🇧';
    langText.textContent = 'EN';
  }
  
  // Save language preference
  localStorage.setItem('preferredLanguage', currentLanguage);
}

function updateLanguage() {
  const elementsWithLang = document.querySelectorAll('[data-sv][data-en]');
  
  elementsWithLang.forEach(element => {
    const text = element.getAttribute(`data-${currentLanguage}`);
    if (text) {
      element.textContent = text;
    }
  });
  
  // Update menu navigation buttons
  const menuNavButtons = document.querySelectorAll('.menu-nav-btn[data-sv][data-en]');
  menuNavButtons.forEach(button => {
    const text = button.getAttribute(`data-${currentLanguage}`);
    if (text) {
      button.textContent = text;
    }
  });
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
  // Check for saved language preference
  const savedLanguage = localStorage.getItem('preferredLanguage');
  if (savedLanguage) {
    currentLanguage = savedLanguage;
    updateLanguage();
    
    // Update toggle button to reflect current language
    const toggleBtn = document.querySelector('.language-toggle');
    const flagIcon = toggleBtn.querySelector('.flag-icon');
    const langText = toggleBtn.querySelector('.lang-text');
    
    if (currentLanguage === 'en') {
      flagIcon.textContent = '🇸🇪';
      langText.textContent = 'SV';
    } else {
      flagIcon.textContent = '🇬🇧';
      langText.textContent = 'EN';
    }
  }
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    // Close any open modals or menus
    const mobileNav = document.querySelector('nav.mobile-open');
    if (mobileNav) {
      mobileNav.classList.remove('mobile-open');
    }
  }
});

// Add focus management for accessibility
document.addEventListener('DOMContentLoaded', function() {
  const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
  
  focusableElements.forEach(element => {
    element.addEventListener('focus', function() {
      this.style.outline = '2px solid #F7B718';
      this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
      this.style.outline = 'none';
    });
  });
});

// Scroll to top function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
