console.log('🔥 MATTIS SCRIPT LOADED SUCCESSFULLY! 🔥');

// Mattis & Co - Main JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('📋 DOM Content Loaded');
    initializeApp();
});

// Listen for all components loaded event
document.addEventListener('allComponentsLoaded', function() {
    console.log('🎯 Components loaded, initializing navigation and links...');
    
    // Now it's safe to set up navigation and smooth scrolling
    setupNavigation();
    setupSmoothScrolling();
    
    console.log('✅ Navigation and smooth scrolling initialized');
});

// Initialize all app functionality
function initializeApp() {
    console.log('🚀 Initializing app...');
    
    setupRotatingText();
    setupScrollAnimations();
    setupInteractions();
    
    // DON'T setup navigation or smooth scrolling here - wait for components
    console.log('✅ Basic app functionality initialized');
}

// Rotating text animation
function setupRotatingText() {
    const rotatingTexts = [
        'TECH • COMMUNITIES • INFRASTRUCTURE',
        'MUNICIPAL • HEALTHCARE • TRADES',
        'REGIONAL SERVICES • LOGISTICS',
        'REBUILDING FORGOTTEN AMERICA'
    ];
    
    let currentIndex = 0;
    const rotatingElement = document.getElementById('rotating-text');
    
    if (rotatingElement) {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % rotatingTexts.length;
            rotatingElement.textContent = rotatingTexts[currentIndex];
        }, 4000);
        console.log('✅ Rotating text animation setup');
    } else {
        console.log('⚠️ Rotating text element not found');
    }
}

// FIXED: Smooth scrolling for navigation links - ONLY call after components load
function setupSmoothScrolling() {
    console.log('🔗 Setting up smooth scrolling...');
    
    // Only select anchors that are pure hash links (no file paths)
    const navigationLinks = document.querySelectorAll('a[href^="#"]:not([href="#"]):not([href*=".html"])');
    console.log(`Found ${navigationLinks.length} navigation links`);
    
    navigationLinks.forEach((anchor, index) => {
        if (!anchor.hasAttribute('data-scroll-initialized')) {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                
                // Double-check: skip if contains file path or is empty/invalid
                if (!href || href === '#' || href.includes('.html') || href.startsWith('javascript:') || href.length <= 1) {
                    return; // Let the browser handle the navigation normally
                }
                
                e.preventDefault();
                
                try {
                    const target = document.querySelector(href);
                    if (target) {
                        const nav = document.querySelector('.nav');
                        const navHeight = nav ? nav.offsetHeight : 80;
                        const targetPosition = target.offsetTop - navHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        console.log(`Smooth scrolling to: ${href}`);
                    }
                } catch (error) {
                    console.warn('Invalid selector for smooth scrolling:', href, error);
                    // If there's an error, let the browser handle it normally
                    window.location.href = href;
                }
            });
            anchor.setAttribute('data-scroll-initialized', 'true');
        }
    });
}

// Intersection Observer for scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
    
    console.log(`✅ Scroll animations setup for ${fadeElements.length} elements`);
}

// Navigation scroll effects and mobile toggle - ONLY call after components load
function setupNavigation() {
    console.log('🧭 Setting up navigation...');
    
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Debug logging
    console.log('Navigation elements check:', {
        nav: nav ? 'FOUND' : 'NOT FOUND',
        navToggle: navToggle ? 'FOUND' : 'NOT FOUND', 
        navLinks: navLinks ? 'FOUND' : 'NOT FOUND'
    });
    
    // Exit early if nav elements don't exist
    if (!nav) {
        console.error('❌ Navigation elements not found! Components may not be loaded.');
        return;
    }
    
    console.log('✅ Navigation elements found');
    
    // Remove any existing scroll listener to prevent duplicates
    if (window.navigationScrollListener) {
        window.removeEventListener('scroll', window.navigationScrollListener);
        console.log('🗑️ Removed existing scroll listener');
    }
    
    // Navigation background on scroll
    const scrollListener = function() {
        // Extra safety check
        const currentNav = document.querySelector('.nav');
        if (!currentNav) {
            console.warn('⚠️ Nav element disappeared during scroll');
            return;
        }
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        try {
            if (scrollTop > 100) {
                currentNav.classList.add('scrolled');
            } else {
                currentNav.classList.remove('scrolled');
            }
        } catch (error) {
            console.error('❌ Error in scroll listener:', error);
        }
    };
    
    // Store reference globally to prevent duplicates
    window.navigationScrollListener = scrollListener;
    window.addEventListener('scroll', scrollListener);
    console.log('✅ Scroll listener added');
    
    // Mobile navigation toggle
    if (navToggle && navLinks) {
        console.log('📱 Setting up mobile navigation');
        
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
            console.log('📱 Mobile nav toggled');
        });
        
        // Close mobile nav when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Close mobile nav when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target)) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
        
        console.log('✅ Mobile navigation setup complete');
    } else {
        console.log('⚠️ Mobile navigation elements not found');
    }
    
    console.log('✅ Navigation setup completed successfully');
}

// Interactive elements
function setupInteractions() {
    setupThesisCards();
    setupButtonEffects();
    setupServiceCards();
    setupTeamMembers();
    setupContactForm();
    
    console.log('✅ Interactive elements setup');
}

// Thesis cards click animations
function setupThesisCards() {
    const cards = document.querySelectorAll('.thesis-card');
    console.log(`Setting up ${cards.length} thesis cards`);
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease';
            
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
                this.style.transition = 'all 0.3s ease';
            }, 100);
            
            const title = this.querySelector('h4');
            console.log('Thesis card clicked:', title ? title.textContent : 'Unknown');
        });
    });
}

// Enhanced button effects
function setupButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    console.log(`Setting up ${buttons.length} buttons`);
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('btn-secondary')) {
                this.style.transform = 'translateY(0)';
            }
        });
        
        button.addEventListener('click', function() {
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.3);
                width: 20px;
                height: 20px;
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation if not already added
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                0% { transform: scale(0); opacity: 1; }
                100% { transform: scale(4); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        console.log('✅ Ripple animation styles added');
    }
}

// Service card interactions
function setupServiceCards() {
    const cards = document.querySelectorAll('.service-card');
    console.log(`Setting up ${cards.length} service cards`);
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Team member interactions
function setupTeamMembers() {
    const members = document.querySelectorAll('.team-member');
    console.log(`Setting up ${members.length} team members`);
    
    members.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            const photo = this.querySelector('.member-photo');
            if (photo) photo.style.transform = 'scale(1.1)';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            const photo = this.querySelector('.member-photo');
            if (photo) photo.style.transform = 'scale(1)';
        });
    });
}

// Contact form handling
function setupContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) {
        console.log('⚠️ Contact form not found');
        return;
    }
    
    console.log('✅ Contact form found, setting up...');
    
    const select = form.querySelector('.form-select');
    if (select) {
        select.addEventListener('change', function() {
            if (this.value) {
                this.style.color = 'var(--text-primary)';
            } else {
                this.style.color = '#9ca3af';
            }
        });
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        if (!data.name || !data.email || !data.message || !data.interest) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        submitButton.style.opacity = '0.7';
        
        setTimeout(() => {
            showFormMessage('Message sent! We\'ll get back to you within 24 hours.', 'success');
            form.reset();
            if (select) select.style.color = '#9ca3af';
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
        }, 2000);
        
        console.log('Form submitted:', data);
    });
}

// Show form messages
function showFormMessage(message, type) {
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message--${type}`;
    messageEl.textContent = message;
    
    messageEl.style.cssText = `
        padding: 1rem 1.5rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;
        text-align: center;
        font-weight: 500;
        border: 1px solid;
        ${type === 'error' 
            ? 'background: #fef2f2; color: #dc2626; border-color: #fecaca;' 
            : 'background: rgba(186, 218, 85, 0.1); color: var(--dark-grey); border-color: var(--accent-green);'
        }
    `;
    
    const form = document.querySelector('.contact-form');
    if (form) {
        form.insertBefore(messageEl, form.firstChild);
        
        setTimeout(() => {
            messageEl.remove();
        }, 5000);
    }
}

// Utility functions
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    console.log('Window resized');
}, 250));

// Export functions for potential external use
window.MattisApp = {
    setupRotatingText,
    setupSmoothScrolling,
    setupScrollAnimations,
    setupNavigation,
    setupInteractions
};

console.log('🎉 Mattis script loaded and ready!');