
// Handle pre-selection of form options via data attributes
document.addEventListener('DOMContentLoaded', () => {
  // Listen for clicks on buttons with data-preselect attribute
  document.addEventListener('click', (e) => {
    if (e.target.matches('a[data-preselect]')) {
      const preselectValue = e.target.getAttribute('data-preselect');
      console.log('Button clicked with preselect value:', preselectValue);
      
      const selectElement = document.querySelector('select[name="type"]');
      console.log('Select element found:', selectElement);
      
      if (selectElement && (preselectValue === 'founder' || preselectValue === 'investor')) {
        console.log('Setting select value to:', preselectValue);
        selectElement.value = preselectValue;
        console.log('Select value after setting:', selectElement.value);
      }
    }
  });
});

// Enhanced Scroll Animation Observer - Updated with modern animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add stagger effect for focus cards
            if (entry.target.classList.contains('focus-about')) {
                const focusCards = entry.target.querySelector('.focus-cards');
                if (focusCards) {
                    focusCards.classList.add('visible');
                }
            }
            
            // Add visible class to about-flex
            if (entry.target.classList.contains('focus-about')) {
                const aboutFlex = entry.target.querySelector('.about-flex');
                if (aboutFlex) {
                    setTimeout(() => {
                        aboutFlex.classList.add('visible');
                    }, 300);
                }
            }
            
            // Add visible class to contact-inner
            if (entry.target.classList.contains('contact')) {
                const contactInner = entry.target.querySelector('.contact-inner');
                if (contactInner) {
                    setTimeout(() => {
                        contactInner.classList.add('visible');
                    }, 200);
                }
            }
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
    
    // Add visible class to hero content on load
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('visible');
    }
    
    // Adjust the wave video speed
    const waveVideo = document.getElementById('waveVideo');
    if (waveVideo) {
        waveVideo.playbackRate = 0.75; // Play at 75% speed
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        // Extract the anchor part (before any query parameters)
        const anchorPart = href.split('?')[0];
        const target = document.querySelector(anchorPart);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const type = formData.get('type');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !type || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission (in real implementation, this would send to a server)
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you soon.');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Parallax effect removed - hero section stays fixed

// Cursor circle animation
document.addEventListener('DOMContentLoaded', () => {
    const cursorCircle = document.getElementById('cursorCircle');
    
    if (cursorCircle) {
        // Elements that should hide the cursor circle
        const hideOnElements = [
            'a', 'button', 'input', 'select', 'textarea',
            '.btn', '.focus-card', '.team-card', '.differentiator-card',
            '.status-bar', '.status-nav', '.mobile-menu',
            '.hero-content', '.about-us-box', '.contact-form'
        ];
        
        const shouldHideCircle = (element) => {
            if (!element) return false;
            
            // Check if element or any parent matches hide conditions
            let current = element;
            while (current && current !== document.body) {
                // Check tag name
                const tagName = current.tagName?.toLowerCase();
                if (tagName === 'a' || tagName === 'button' || tagName === 'input' || 
                    tagName === 'select' || tagName === 'textarea') {
                    return true;
                }
                
                // Check classes
                for (const selector of hideOnElements) {
                    if (current.matches && current.matches(selector)) {
                        return true;
                    }
                }
                
                current = current.parentElement;
            }
            
            return false;
        };
        
        document.addEventListener('mousemove', (e) => {
            cursorCircle.style.left = e.clientX + 'px';
            cursorCircle.style.top = e.clientY + 'px';
            
            if (shouldHideCircle(e.target)) {
                cursorCircle.style.display = 'none';
            } else {
                cursorCircle.style.display = 'block';
            }
        });
        
        document.addEventListener('mouseenter', (e) => {
            if (!shouldHideCircle(e.target)) {
                cursorCircle.style.display = 'block';
            }
        });
        
        document.addEventListener('mouseleave', () => {
            cursorCircle.style.display = 'none';
        });
    }
});

// Enhanced hover effects for focus cards with blue theme
document.addEventListener('DOMContentLoaded', () => {
    const focusCards = document.querySelectorAll('.focus-card');
    
    focusCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Animation is handled by CSS, but we can add extra effects here if needed
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset handled by CSS
        });
    });
    
    // Button hover effects removed
});

// Typing effect for hero headline (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on page load (uncomment to enable)
// document.addEventListener('DOMContentLoaded', () => {
//     const heroHeadline = document.querySelector('.hero-headline');
//     if (heroHeadline) {
//         const originalText = heroHeadline.textContent;
//         typeWriter(heroHeadline, originalText, 30);
//     }
// });

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    mobileMenu.classList.toggle('open');
  });
  // Close menu when clicking a link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      mobileMenu.classList.remove('open');
    }
  });
}

// Utility function for smooth animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Call animation function on scroll
window.addEventListener('scroll', animateOnScroll);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', animateOnScroll); 

// M Mask scroll animation
window.addEventListener('scroll', () => {
    const maskContent = document.getElementById('m-mask-content');
    if (!maskContent) return;
    const scrollY = window.scrollY || window.pageYOffset;
    // Rotate the M mask from -8deg to 8deg as you scroll the first 1000px
    const maxScroll = 1000;
    const minDeg = -8;
    const maxDeg = 8;
    const percent = Math.min(scrollY / maxScroll, 1);
    const deg = minDeg + (maxDeg - minDeg) * percent;
    maskContent.style.transform = `rotate(${deg}deg)`;
}); 

// Fade-in on scroll for .fade-in sections
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// Smooth scroll for anchor links
function smoothScroll(e) {
  const href = this.getAttribute('href');
  if (href && href.startsWith('#')) {
    // Extract the anchor part (before any query parameters)
    const anchorPart = href.split('?')[0];
    const target = document.querySelector(anchorPart);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', smoothScroll);
});
