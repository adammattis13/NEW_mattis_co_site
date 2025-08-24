console.log('🔥 MATTIS SCRIPT LOADED SUCCESSFULLY! 🔥');

// Mattis & Co - Main JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('📋 DOM Content Loaded');
    initializeApp();
});

// Listen for all components loaded event
document.addEventListener('allComponentsLoaded', function() {
    console.log('🎯 Components loaded, initializing additional features...');
    
    // Navigation is now handled by NavigationManager
    // Just setup any additional smooth scrolling for non-nav elements
    setupSmoothScrolling();
    
    console.log('✅ Navigation system initialized via NavigationManager');
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
                        
                        console.log(`Smooth scrolled to: ${href}`);
                    } else {
                        console.warn(`Target not found for: ${href}`);
                    }
                } catch (error) {
                    console.warn('Invalid selector for smooth scrolling:', href, error);
                }
            });
            anchor.setAttribute('data-scroll-initialized', 'true');
        }
    });
    
    console.log('✅ Smooth scrolling setup complete');
}

// Setup navigation behavior
function setupNavigation() {
    // This is now handled by NavigationManager
    console.log('Navigation handled by NavigationManager');
}

// Scroll animations
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

    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
    
    console.log('✅ Scroll animations setup');
}

// Interactive elements
function setupInteractions() {
    // Service cards hover
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Thesis cards click
    document.querySelectorAll('.thesis-card').forEach(card => {
        card.addEventListener('click', function() {
            const thesisType = this.dataset.thesis;
            if (thesisType) {
                console.log('Thesis card clicked:', thesisType);
                // Handle thesis navigation
            }
        });
    });
    
    console.log('✅ Interactions setup');
}

// Export MattisApp functions for use in HTML pages
window.MattisApp = {
    setupNavigation: function() {
        // Navigation is now handled by NavigationManager
        console.log('Navigation handled by NavigationManager');
    },
    setupSmoothScrolling: setupSmoothScrolling,
    setupInteractions: setupInteractions,
    setupScrollAnimations: setupScrollAnimations
};

console.log('✅ MattisApp exported to window');