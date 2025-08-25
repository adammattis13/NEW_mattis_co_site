// javascript/navigation-config.js
// Universal Navigation Configuration for Mattis & Co
// This file handles all navigation paths and mobile menu functionality

class NavigationConfig {
    constructor() {
        this.currentPath = window.location.pathname;
        this.currentLevel = this.detectLevel();
        this.basePath = this.getBasePath();
        this.isInitialized = false;
        console.log('🧭 NavigationConfig initialized:', {
            path: this.currentPath,
            level: this.currentLevel,
            basePath: this.basePath
        });
    }
    
    detectLevel() {
        // Detect which directory level we're at
        if (this.currentPath.includes('/pages/theses/')) {
            return 'theses'; // Two levels deep
        }
        if (this.currentPath.includes('/pages/')) {
            return 'pages'; // One level deep
        }
        return 'root'; // Root level
    }
    
    getBasePath() {
        // Return the correct path prefix based on directory level
        const levels = {
            'root': '',
            'pages': '../',
            'theses': '../../'
        };
        return levels[this.currentLevel] || '';
    }
    
    // Adjust path for current directory level
    adjustPath(path) {
        // For pages directory, adjust paths
        if (this.currentLevel === 'pages') {
            if (path.startsWith('pages/')) {
                return path.replace('pages/', '');
            }
        }
        // For theses directory, adjust paths
        else if (this.currentLevel === 'theses') {
            if (path.startsWith('pages/')) {
                return '../' + path.replace('pages/', '');
            }
        }
        return this.basePath + path;
    }
    
    // Generate consistent navigation links for any page
    getNavLinks() {
        return {
            home: this.adjustPath('index.html'),
            privateEquity: this.adjustPath('index.html') + '#private-equity',
            advisory: this.adjustPath('index.html') + '#advisory',
            about: this.adjustPath('pages/about.html'),
            portfolio: this.adjustPath('pages/portfolio.html'),
            team: this.adjustPath('pages/team.html'),
            theses: this.adjustPath('index.html') + '#theses',
            contact: this.adjustPath('pages/contact.html'),
            privacy: this.adjustPath('pages/privacy.html'),
            terms: this.adjustPath('pages/terms.html')
        };
    }
    
    // Get component paths
    getComponentPaths() {
        return {
            header: this.basePath + 'components/header.html',
            footer: this.basePath + 'components/footer.html'
        };
    }
    
    // Initialize navigation after components load
   initializeNavigation() {
    if (this.isInitialized) {
        console.log('⚠️ Navigation already initialized, skipping...');
        return;
    }
    
    const links = this.getNavLinks();
    
    // Update header navigation links
    this.updateElement('nav-logo', links.home);
    this.updateElement('nav-pe', links.privateEquity);
    this.updateElement('nav-advisory', links.advisory);
    this.updateElement('nav-about', links.about);
    this.updateElement('nav-portfolio', links.portfolio);
    this.updateElement('nav-team', links.team);
    this.updateElement('nav-theses', links.theses);
    this.updateElement('nav-contact', links.contact);
    this.updateElement('nav-cta-deal', links.contact);
    this.updateElement('nav-cta-advisors', links.contact);
    
    // Update ALL footer navigation links
    this.updateElement('footer-home', links.home);
    this.updateElement('footer-about', links.about);
    this.updateElement('footer-portfolio', links.portfolio);
    this.updateElement('footer-team', links.team);
    this.updateElement('footer-contact', links.contact);
    this.updateElement('footer-pe', links.privateEquity);
    this.updateElement('footer-advisory', links.advisory);
    this.updateElement('footer-theses', links.theses);
    this.updateElement('footer-privacy', links.privacy);
    this.updateElement('footer-terms', links.terms);
    
    // Add special handling for anchor links
    this.setupAnchorLinks();
    
    this.isInitialized = true;
    console.log('✅ Navigation links initialized for level:', this.currentLevel);
}
    
    // Handle anchor links that should close mobile menu
    setupAnchorLinks() {
        document.querySelectorAll('.nav-anchor').forEach(link => {
            link.addEventListener('click', (e) => {
                const navRight = document.querySelector('.nav-right');
                const navToggle = document.querySelector('.nav-toggle');
                
                // Close mobile menu if open
                if (navRight && navToggle) {
                    navRight.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // Handle smooth scrolling for same-page anchors
                const href = link.getAttribute('href');
                if (href && href.startsWith('#') && !href.includes('.html')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const navHeight = document.querySelector('.nav')?.offsetHeight || 80;
                        window.scrollTo({
                            top: target.offsetTop - navHeight - 20,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    
    // Setup mobile menu with single handler
    setupMobileMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const navRight = document.querySelector('.nav-right');
        
        if (!navToggle || !navRight) {
            console.warn('⚠️ Mobile menu elements not found');
            return;
        }
        
        // Remove any existing listeners by cloning
        const newToggle = navToggle.cloneNode(true);
        navToggle.parentNode.replaceChild(newToggle, navToggle);
        
        // Add single click handler
        newToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navRight.classList.toggle('active');
            newToggle.classList.toggle('active');
            document.body.style.overflow = navRight.classList.contains('active') ? 'hidden' : '';
            console.log('📱 Mobile menu toggled:', navRight.classList.contains('active'));
        });
        
        // Close menu when clicking any link
        navRight.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navRight.classList.remove('active');
                newToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav') && navRight.classList.contains('active')) {
                navRight.classList.remove('active');
                newToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Handle dropdown on mobile
        const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
        const dropdown = document.querySelector('.nav-dropdown');
        
        if (dropdownToggle && dropdown) {
            dropdownToggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
        
        console.log('✅ Mobile menu setup complete');
    }
    
    // Load components dynamically
    async loadComponents() {
        const paths = this.getComponentPaths();
        
        try {
            // Load header
            const headerResponse = await fetch(paths.header);
            const headerHTML = await headerResponse.text();
            document.getElementById('header').innerHTML = headerHTML;
            
            // Load footer
            const footerResponse = await fetch(paths.footer);
            const footerHTML = await footerResponse.text();
            document.getElementById('footer').innerHTML = footerHTML;
            
            console.log('✅ Components loaded successfully');
            
            // Initialize navigation after components are loaded
            setTimeout(() => {
                this.initializeNavigation();
                this.setupMobileMenu();
                
                // Fire event for other scripts
                document.dispatchEvent(new Event('componentsReady'));
            }, 100);
            
        } catch (error) {
            console.error('❌ Error loading components:', error);
        }
    }
}

// Create global instance
window.navConfig = new NavigationConfig();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.navConfig.loadComponents();
});