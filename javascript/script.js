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
    // REMOVED THE PROBLEMATIC LINE: setupScrollAnimations() was here causing the error
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
    const navRight = document.querySelector('.nav-right'); // FIXED: Changed from nav-links to nav-right
    
    // Debug logging
    console.log('Navigation elements check:', {
        nav: nav ? 'FOUND' : 'NOT FOUND',
        navToggle: navToggle ? 'FOUND' : 'NOT FOUND', 
        navRight: navRight ? 'FOUND' : 'NOT FOUND' // Updated label
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
    
    // Mobile navigation toggle - FIXED to use nav-right
    if (navToggle && navRight) {
        console.log('📱 Setting up mobile navigation');
        
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navRight.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.style.overflow = navRight.classList.contains('active') ? 'hidden' : '';
            console.log('📱 Mobile nav toggled');
        });
        
        // Close mobile nav when clicking on a link
        navRight.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navRight.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close mobile nav when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && navRight.classList.contains('active')) {
                navRight.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
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
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Service cards hover effects
function setupServiceCards() {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Team member cards
function setupTeamMembers() {
    const teamCards = document.querySelectorAll('.team-member');
    
    teamCards.forEach(card => {
        card.addEventListener('click', function() {
            console.log('Team member clicked:', this.querySelector('h3')?.textContent);
        });
    });
}

// Contact form handling
function setupContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Contact form submitted');
            // Add form handling logic here
        });
    }
}

// Export functions for use in other scripts
window.MattisApp = {
    setupNavigation,
    setupSmoothScrolling,
    setupInteractions,
    setupScrollAnimations
};