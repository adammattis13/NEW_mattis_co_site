class NavigationManager {
    constructor() {
        this.config = {
            rootPath: this.detectRootPath(),
            currentPath: window.location.pathname,
            currentPage: this.getCurrentPage(),
            depth: this.getPathDepth(),
            isMobile: window.innerWidth <= 768
        };
        
        // Define site structure for easier maintenance
        this.siteStructure = {
            home: {
                path: 'index.html',
                title: 'Home',
                sections: ['private-equity', 'advisory', 'theses']
            },
            pages: {
                about: { path: 'pages/about.html', title: 'Our Story' },
                portfolio: { path: 'pages/portfolio.html', title: 'Portfolio' },
                team: { path: 'pages/team.html', title: 'Team' },
                contact: { path: 'pages/contact.html', title: 'Contact' },
                privacy: { path: 'pages/privacy.html', title: 'Privacy Policy' },
                terms: { path: 'pages/terms.html', title: 'Terms of Service' }
            },
            theses: {
                infrastructure: { 
                    path: 'pages/theses/infrastructure.html', 
                    title: 'Essential Infrastructure',
                    parent: 'Investment Theses'
                },
                'community-tech': { 
                    path: 'pages/theses/community-tech.html', 
                    title: 'Community-First Technology',
                    parent: 'Investment Theses'
                }
            }
        };
        
        this.init();
    }
    
    // Detect the root path dynamically
    detectRootPath() {
        const pathParts = window.location.pathname.split('/').filter(p => p);
        const depth = pathParts.filter(p => p.includes('.html')).length ? 
            pathParts.length - 1 : pathParts.length;
        
        if (depth === 0) return './';
        return '../'.repeat(depth);
    }
    
    // Get current page identifier
    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        return filename.replace('.html', '');
    }
    
    // Calculate path depth
    getPathDepth() {
        const path = window.location.pathname;
        const parts = path.split('/').filter(p => p && p !== 'index.html');
        return parts.length;
    }
    
    // Generate absolute path from root
    getAbsolutePath(relativePath) {
        // If already absolute, return as is
        if (relativePath.startsWith('/') || relativePath.startsWith('http')) {
            return relativePath;
        }
        
        // Build absolute path based on current depth
        return this.config.rootPath + relativePath;
    }
    
    // Setup all navigation elements
    init() {
        this.setupNavigation();
        this.setupBreadcrumbs();
        this.setupMobileMenu();
        this.setupActiveStates();
        this.setupScrollBehavior();
        this.handleDeepLinking();
    }
    
    // Main navigation setup
    setupNavigation() {
        // Wait for header to be loaded
        const checkHeader = setInterval(() => {
            const navElements = {
                logo: document.getElementById('nav-logo'),
                pe: document.getElementById('nav-pe'),
                advisory: document.getElementById('nav-advisory'),
                about: document.getElementById('nav-about'),
                portfolio: document.getElementById('nav-portfolio'),
                team: document.getElementById('nav-team'),
                theses: document.getElementById('nav-theses'),
                contact: document.getElementById('nav-contact'),
                ctaDeal: document.getElementById('nav-cta-deal'),
                ctaAdvisors: document.getElementById('nav-cta-advisors')
            };
            
            if (navElements.logo) {
                clearInterval(checkHeader);
                this.updateNavigationPaths(navElements);
                this.setupDropdownBehavior();
            }
        }, 100);
    }
    
    // Update all navigation paths
    updateNavigationPaths(elements) {
        // Logo always goes to home
        elements.logo.href = this.getAbsolutePath('index.html');
        
        // Handle section anchors vs page links
        if (this.config.currentPage === 'index') {
            // On homepage - use anchor links
            elements.pe.href = '#private-equity';
            elements.advisory.href = '#advisory';
            elements.theses.href = '#theses';
            this.setupSmoothScroll([elements.pe, elements.advisory, elements.theses]);
        } else {
            // On other pages - link back to homepage sections
            elements.pe.href = this.getAbsolutePath('index.html#private-equity');
            elements.advisory.href = this.getAbsolutePath('index.html#advisory');
            elements.theses.href = this.getAbsolutePath('index.html#theses');
        }
        
        // Update page links
        elements.about.href = this.getAbsolutePath('pages/about.html');
        elements.portfolio.href = this.getAbsolutePath('pages/portfolio.html');
        elements.team.href = this.getAbsolutePath('pages/team.html');
        elements.contact.href = this.getAbsolutePath('pages/contact.html');
        
        // Update CTA buttons
        elements.ctaDeal.href = this.getAbsolutePath('pages/contact.html#deal');
        elements.ctaAdvisors.href = this.getAbsolutePath('pages/contact.html#advisory');
    }
    
    // Create and insert breadcrumb navigation
    setupBreadcrumbs() {
        if (this.config.depth === 0) return; // No breadcrumbs on homepage
        
        const breadcrumbHTML = this.generateBreadcrumbs();
        
        // Insert breadcrumbs after the main navigation
        const nav = document.querySelector('.nav');
        if (nav && breadcrumbHTML) {
            const breadcrumbContainer = document.createElement('div');
            breadcrumbContainer.className = 'breadcrumb-container';
            breadcrumbContainer.innerHTML = breadcrumbHTML;
            nav.insertAdjacentElement('afterend', breadcrumbContainer);
            
            // Add styles
            this.injectBreadcrumbStyles();
        }
    }
    
    // Generate breadcrumb HTML
    generateBreadcrumbs() {
        const path = window.location.pathname;
        const parts = path.split('/').filter(p => p);
        let breadcrumbs = [];
        
        // Always start with home
        breadcrumbs.push({
            title: 'Home',
            url: this.getAbsolutePath('index.html'),
            active: false
        });
        
        // Build breadcrumb trail
        if (path.includes('/pages/theses/')) {
            breadcrumbs.push({
                title: 'Investment Theses',
                url: this.getAbsolutePath('index.html#theses'),
                active: false
            });
            
            const currentThesis = this.getCurrentThesisTitle();
            breadcrumbs.push({
                title: currentThesis,
                url: '#',
                active: true
            });
        } else if (path.includes('/pages/')) {
            const currentPage = this.getCurrentPageTitle();
            breadcrumbs.push({
                title: currentPage,
                url: '#',
                active: true
            });
        }
        
        // Generate HTML
        const items = breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            if (isLast) {
                return `<span class="breadcrumb-current">${crumb.title}</span>`;
            }
            return `
                <a href="${crumb.url}" class="breadcrumb-link">${crumb.title}</a>
                <span class="breadcrumb-separator">/</span>
            `;
        }).join('');
        
        return `
            <div class="breadcrumb">
                <div class="breadcrumb-inner">
                    ${items}
                </div>
            </div>
        `;
    }
    
    // Get current page title
    getCurrentPageTitle() {
        const page = this.config.currentPage;
        const pageData = this.siteStructure.pages[page];
        return pageData ? pageData.title : 'Page';
    }
    
    // Get current thesis title
    getCurrentThesisTitle() {
        const page = this.config.currentPage;
        const thesisData = this.siteStructure.theses[page];
        return thesisData ? thesisData.title : 'Investment Thesis';
    }
    
    // Inject breadcrumb styles
    injectBreadcrumbStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .breadcrumb-container {
                position: fixed;
                top: 80px;
                width: 100%;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                border-bottom: 1px solid var(--border-light);
                z-index: 999;
                transition: all 0.3s ease;
            }
            
            .nav.scrolled + .breadcrumb-container {
                top: 68px;
            }
            
            .breadcrumb {
                max-width: var(--max-width, 1200px);
                margin: 0 auto;
                padding: 0 40px;
            }
            
            .breadcrumb-inner {
                padding: 12px 0;
                font-size: 14px;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .breadcrumb-link {
                color: var(--text-secondary);
                text-decoration: none;
                transition: color 0.2s ease;
                font-weight: 500;
            }
            
            .breadcrumb-link:hover {
                color: var(--accent-green);
            }
            
            .breadcrumb-separator {
                color: var(--text-light);
                font-size: 12px;
            }
            
            .breadcrumb-current {
                color: var(--text-primary);
                font-weight: 600;
            }
            
            /* Adjust main content for breadcrumb */
            body.has-breadcrumb {
                padding-top: 120px;
            }
            
            @media (max-width: 768px) {
                .breadcrumb-container {
                    top: 64px;
                }
                
                .nav.scrolled + .breadcrumb-container {
                    top: 56px;
                }
                
                .breadcrumb {
                    padding: 0 24px;
                }
                
                .breadcrumb-inner {
                    padding: 10px 0;
                    font-size: 13px;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Add class to body if breadcrumbs exist
        if (this.config.depth > 0) {
            document.body.classList.add('has-breadcrumb');
        }
    }
    
    // Enhanced mobile menu setup
    setupMobileMenu() {
        const toggle = document.querySelector('.nav-toggle');
        const navRight = document.querySelector('.nav-right');
        const navLinks = document.querySelector('.nav-links');
        
        if (!toggle || !navRight) return;
        
        // Create mobile menu overlay
        const overlay = document.createElement('div');
        overlay.className = 'mobile-overlay';
        document.body.appendChild(overlay);
        
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMobileMenu();
        });
        
        overlay.addEventListener('click', () => {
            this.closeMobileMenu();
        });
        
        // Close menu on link click
        const links = navLinks?.querySelectorAll('a');
        links?.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
        
        // Handle resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMobileMenu();
            }
        });
    }
    
    // Toggle mobile menu
    toggleMobileMenu() {
        const toggle = document.querySelector('.nav-toggle');
        const navRight = document.querySelector('.nav-right');
        const overlay = document.querySelector('.mobile-overlay');
        
        toggle?.classList.toggle('active');
        navRight?.classList.toggle('active');
        overlay?.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
    
    // Close mobile menu
    closeMobileMenu() {
        const toggle = document.querySelector('.nav-toggle');
        const navRight = document.querySelector('.nav-right');
        const overlay = document.querySelector('.mobile-overlay');
        
        toggle?.classList.remove('active');
        navRight?.classList.remove('active');
        overlay?.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
    
    // Setup dropdown behavior
    setupDropdownBehavior() {
        const dropdowns = document.querySelectorAll('.nav-dropdown');
        
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.nav-dropdown-toggle');
            const menu = dropdown.querySelector('.nav-dropdown-menu');
            
            if (!toggle || !menu) return;
            
            // Desktop hover
            if (!this.config.isMobile) {
                dropdown.addEventListener('mouseenter', () => {
                    dropdown.classList.add('active');
                });
                
                dropdown.addEventListener('mouseleave', () => {
                    dropdown.classList.remove('active');
                });
            }
            
            // Mobile click
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                if (this.config.isMobile) {
                    dropdown.classList.toggle('active');
                    
                    // Close other dropdowns
                    dropdowns.forEach(other => {
                        if (other !== dropdown) {
                            other.classList.remove('active');
                        }
                    });
                }
            });
        });
        
        // Close dropdowns on outside click
        document.addEventListener('click', () => {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        });
    }
    
    // Setup smooth scrolling for anchor links
    setupSmoothScroll(elements) {
        elements.forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = element.getAttribute('href').replace('#', '');
                const target = document.getElementById(targetId);
                
                if (target) {
                    const navHeight = document.querySelector('.nav').offsetHeight;
                    const breadcrumbHeight = document.querySelector('.breadcrumb-container')?.offsetHeight || 0;
                    const offset = navHeight + breadcrumbHeight + 20;
                    
                    const targetPosition = target.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without jumping
                    history.pushState(null, null, `#${targetId}`);
                }
            });
        });
    }
    
    // Setup active navigation states
    setupActiveStates() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#')) {
                const linkPath = href.split('#')[0];
                if (currentPath.includes(linkPath.replace('../', '').replace('./', ''))) {
                    link.classList.add('active');
                }
            }
        });
        
        // Handle scroll-based active states for sections
        if (this.config.currentPage === 'index') {
            this.setupScrollSpyForSections();
        }
    }
    
    // Setup scroll spy for homepage sections
    setupScrollSpyForSections() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-anchor');
        
        const observerOptions = {
            rootMargin: '-20% 0px -70% 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    // Handle navigation scroll behavior
    setupScrollBehavior() {
        let lastScroll = 0;
        const nav = document.querySelector('.nav');
        const breadcrumb = document.querySelector('.breadcrumb-container');
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add scrolled class
            if (currentScroll > 50) {
                nav?.classList.add('scrolled');
            } else {
                nav?.classList.remove('scrolled');
            }
            
            // Hide/show on scroll (optional)
            if (this.config.isMobile && currentScroll > lastScroll && currentScroll > 100) {
                nav?.classList.add('nav-hidden');
                breadcrumb?.classList.add('breadcrumb-hidden');
            } else {
                nav?.classList.remove('nav-hidden');
                breadcrumb?.classList.remove('breadcrumb-hidden');
            }
            
            lastScroll = currentScroll;
        });
    }
    
    // Handle deep linking (arriving at page with hash)
    handleDeepLinking() {
        if (window.location.hash) {
            setTimeout(() => {
                const targetId = window.location.hash.replace('#', '');
                const target = document.getElementById(targetId);
                
                if (target) {
                    const navHeight = document.querySelector('.nav').offsetHeight;
                    const breadcrumbHeight = document.querySelector('.breadcrumb-container')?.offsetHeight || 0;
                    const offset = navHeight + breadcrumbHeight + 20;
                    
                    window.scrollTo({
                        top: target.offsetTop - offset,
                        behavior: 'smooth'
                    });
                }
            }, 500);
        }
    }
}

// Additional mobile menu styles to inject
const mobileMenuStyles = `
    .mobile-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 998;
    }
    
    .mobile-overlay.active {
        opacity: 1;
        visibility: visible;
    }
    
    body.menu-open {
        overflow: hidden;
    }
    
    @media (max-width: 768px) {
        .nav-right {
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            max-width: 400px;
            height: 100vh;
            background: white;
            box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
            transition: right 0.3s ease;
            overflow-y: auto;
            z-index: 1001;
            padding: 80px 24px 24px;
        }
        
        .nav-right.active {
            right: 0;
        }
        
        .nav-links {
            flex-direction: column;
            gap: 0;
            width: 100%;
        }
        
        .nav-links li {
            width: 100%;
            border-bottom: 1px solid var(--border-light);
        }
        
        .nav-links a {
            display: block;
            padding: 16px 0;
            font-size: 16px;
        }
        
        .nav-dropdown-menu {
            position: static !important;
            display: none;
            padding-left: 24px;
            background: var(--background-light);
            margin: 0;
        }
        
        .nav-dropdown.active .nav-dropdown-menu {
            display: block;
        }
        
        .nav-cta {
            flex-direction: column;
            width: 100%;
            margin-top: 24px;
            gap: 12px;
        }
        
        .nav-cta .btn {
            width: 100%;
            justify-content: center;
        }
        
        .nav-toggle {
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding: 8px;
            cursor: pointer;
            z-index: 1002;
        }
        
        .nav-toggle span {
            width: 24px;
            height: 2px;
            background: var(--text-primary);
            transition: all 0.3s ease;
            border-radius: 2px;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
    
    /* Navigation hide on scroll (mobile) */
    .nav.nav-hidden {
        transform: translateY(-100%);
    }
    
    .breadcrumb-container.breadcrumb-hidden {
        transform: translateY(-100%);
    }
`;

// Initialize navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Inject mobile menu styles
    const style = document.createElement('style');
    style.textContent = mobileMenuStyles;
    document.head.appendChild(style);
    
    // Initialize navigation manager
    window.navigationManager = new NavigationManager();
    
    console.log('✅ Enhanced Navigation System initialized');
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavigationManager;
}