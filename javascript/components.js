// Mattis & Co - Component Loader with Enhanced Navigation System
// javascript/components.js

class ComponentLoader {
    constructor() {
        this.components = new Map();
        this.loadedComponents = new Set();
    }

    // Register a component for loading
    register(name, selector, path, fallback = null) {
        this.components.set(name, {
            selector,
            path,
            fallback,
            loaded: false
        });
    }

    // Load a single component
    async loadComponent(name) {
        const component = this.components.get(name);
        if (!component || component.loaded) return;

        const element = document.querySelector(component.selector);
        if (!element) {
            console.warn(`Element not found for component ${name}: ${component.selector}`);
            return;
        }

        try {
            const response = await fetch(component.path);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const html = await response.text();
            element.innerHTML = html;
            component.loaded = true;
            this.loadedComponents.add(name);
            
            // Setup navigation paths after component loads
            this.setupComponentPaths(name);
            
            // Dispatch custom event
            element.dispatchEvent(new CustomEvent('componentLoaded', { 
                detail: { name, component } 
            }));
            
            console.log(`✅ Loaded component: ${name}`);
            
        } catch (error) {
            console.warn(`⚠️ Failed to load ${name} from ${component.path}:`, error);
            
            // Use fallback if provided or generate dynamically
            if (element) {
                let fallbackHTML = component.fallback;
                
                // Generate dynamic fallback for specific components
                if (!fallbackHTML) {
                    if (name === 'header') {
                        fallbackHTML = generateNavigationHTML();
                    } else if (name === 'footer') {
                        fallbackHTML = generateFooterHTML();
                    }
                }
                
                if (fallbackHTML) {
                    element.innerHTML = fallbackHTML;
                    component.loaded = true;
                    this.loadedComponents.add(name);
                    
                    // Setup navigation paths after fallback loads
                    this.setupComponentPaths(name);
                    
                    console.log(`📦 Using ${component.fallback ? 'static' : 'dynamic'} fallback for: ${name}`);
                    
                    // Still dispatch event for fallback
                    element.dispatchEvent(new CustomEvent('componentLoaded', { 
                        detail: { name, component, fallback: true } 
                    }));
                }
            }
        }
    }

    // Setup component-specific functionality after loading
    setupComponentPaths(componentName) {
        setTimeout(() => {
            if (componentName === 'header') {
                setupNavigationPaths();
            } else if (componentName === 'footer') {
                setupFooterPaths();
            }
        }, 50); // Small delay to ensure DOM is updated
    }

    // Load all registered components
    async loadAll() {
        const loadPromises = Array.from(this.components.keys())
            .map(name => this.loadComponent(name));
        
        await Promise.all(loadPromises);
        
        console.log('All components loaded:', Array.from(this.loadedComponents));
        
        // Dispatch event when all components are loaded
        document.dispatchEvent(new CustomEvent('allComponentsLoaded', {
            detail: { loaded: Array.from(this.loadedComponents) }
        }));
    }

    // Get component status
    getStatus(name) {
        const component = this.components.get(name);
        return component ? component.loaded : false;
    }

    // List all registered components
    list() {
        return Array.from(this.components.entries()).map(([name, component]) => ({
            name,
            loaded: component.loaded,
            selector: component.selector,
            path: component.path
        }));
    }
}

// ============================================
// ENHANCED NAVIGATION SYSTEM
// ============================================

class NavigationManager {
    constructor() {
        console.log('🚀 NavigationManager: Starting initialization...');
        
        this.config = {
            rootPath: this.detectRootPath(),
            currentPath: window.location.pathname,
            currentPage: this.getCurrentPage(),
            depth: this.getPathDepth(),
            isMobile: window.innerWidth <= 768
        };
        
        console.log('📍 NavigationManager config:', this.config);
        
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
    
    // Initialize all navigation features
    init() {
        console.log('🎯 NavigationManager: Initializing features...');
        this.setupNavigation();
        this.setupFooterNavigation();
        this.setupBreadcrumbs();
        this.setupMobileMenu();
        this.setupActiveStates();
        this.setupScrollBehavior();
        this.handleDeepLinking();
        console.log('✅ NavigationManager: All features initialized');
    }
    
    // Main navigation setup
    setupNavigation() {
        console.log('🔧 Setting up navigation paths...');
        
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
                console.log('✅ Navigation paths updated');
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
        if (elements.about) elements.about.href = this.getAbsolutePath('pages/about.html');
        if (elements.portfolio) elements.portfolio.href = this.getAbsolutePath('pages/portfolio.html');
        if (elements.team) elements.team.href = this.getAbsolutePath('pages/team.html');
        if (elements.contact) elements.contact.href = this.getAbsolutePath('pages/contact.html');
        
        // Update CTA buttons
        if (elements.ctaDeal) elements.ctaDeal.href = this.getAbsolutePath('pages/contact.html#deal');
        if (elements.ctaAdvisors) elements.ctaAdvisors.href = this.getAbsolutePath('pages/contact.html#advisory');
    }
    
    // Footer navigation setup
    setupFooterNavigation() {
        console.log('🔧 Setting up footer navigation paths...');
        
        // Wait for footer to be loaded
        const checkFooter = setInterval(() => {
            const footerElements = {
                home: document.getElementById('footer-home'),
                about: document.getElementById('footer-about'),
                portfolio: document.getElementById('footer-portfolio'),
                team: document.getElementById('footer-team'),
                contact: document.getElementById('footer-contact'),
                privacy: document.getElementById('footer-privacy'),
                terms: document.getElementById('footer-terms')
            };
            
            if (footerElements.home || footerElements.privacy) {
                clearInterval(checkFooter);
                
                // Update all footer links if they exist
                if (footerElements.home) {
                    footerElements.home.href = this.getAbsolutePath('index.html');
                    
                    // Add special home link behavior
                    footerElements.home.addEventListener('click', (e) => {
                        const currentPath = window.location.pathname;
                        
                        // If we're already on home page, scroll to top instead
                        if (currentPath.endsWith('index.html') || currentPath === '/' || currentPath === '') {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                    });
                }
                
                if (footerElements.about) {
                    footerElements.about.href = this.getAbsolutePath('pages/about.html');
                }
                if (footerElements.portfolio) {
                    footerElements.portfolio.href = this.getAbsolutePath('pages/portfolio.html');
                }
                if (footerElements.team) {
                    footerElements.team.href = this.getAbsolutePath('pages/team.html');
                }
                if (footerElements.contact) {
                    footerElements.contact.href = this.getAbsolutePath('pages/contact.html');
                }
                if (footerElements.privacy) {
                    footerElements.privacy.href = this.getAbsolutePath('pages/privacy.html');
                }
                if (footerElements.terms) {
                    footerElements.terms.href = this.getAbsolutePath('pages/terms.html');
                }
                
                console.log('✅ Footer navigation paths updated');
            }
        }, 100);
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
            console.log('✅ Breadcrumbs created');
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
        // Check if styles already exist
        if (document.getElementById('navigation-manager-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'navigation-manager-styles';
        style.textContent = `
            .breadcrumb-container {
                position: fixed;
                top: 80px;
                width: 100%;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                border-bottom: 1px solid var(--border-light, #e9ecef);
                z-index: 999;
                transition: all 0.3s ease;
            }
            
            .nav.scrolled + .breadcrumb-container {
                top: 68px;
            }
            
            .breadcrumb {
                max-width: 1400px;
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
                color: #6c757d;
                text-decoration: none;
                transition: color 0.2s ease;
                font-weight: 500;
            }
            
            .breadcrumb-link:hover {
                color: #bada55;
            }
            
            .breadcrumb-separator {
                color: #adb5bd;
                font-size: 12px;
            }
            
            .breadcrumb-current {
                color: #1a1a1a;
                font-weight: 600;
            }
            
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
    const navToggle = document.querySelector('.nav-toggle');
    const navRight = document.querySelector('.nav-right'); // FIXED: Changed from '.nav-links' to '.nav-right'
    const nav = document.querySelector('.nav');
    
    if (!navToggle || !navRight) {
        console.warn('⚠️ Mobile menu elements not found');
        return;
    }
    
    // Toggle menu
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navRight.classList.toggle('active'); // FIXED: Toggle nav-right, not nav-links
        navToggle.classList.toggle('active');
        document.body.style.overflow = navRight.classList.contains('active') ? 'hidden' : '';
        console.log('📱 Mobile menu toggled - nav-right active:', navRight.classList.contains('active'));
    });
    
    // Close menu when clicking a link
    const navLinks = navRight.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navRight.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navRight.classList.contains('active')) {
            navRight.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    console.log('✅ Mobile menu setup complete');
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

// ============================================
// HELPER FUNCTIONS
// ============================================

// Helper function to get correct path based on current location
function getComponentPath(filename) {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(part => part.length > 0);
    
    // Remove filename if present
    if (pathParts.length > 0 && pathParts[pathParts.length - 1].includes('.')) {
        pathParts.pop();
    }
    
    // Calculate how many levels to go up
    const levelsUp = pathParts.length;
    const prefix = '../'.repeat(levelsUp);
    
    return levelsUp === 0 ? `components/${filename}` : `${prefix}components/${filename}`;
}

// Helper function to get correct navigation paths (LEGACY - kept for compatibility)
function getNavPath(targetPath) {
    const currentPath = window.location.pathname;
    
    // Determine current directory level
    let currentLevel = 'root';
    if (currentPath.includes('/pages/theses/')) {
        currentLevel = 'theses';
    } else if (currentPath.includes('/pages/')) {
        currentLevel = 'pages';
    }
    
    // Define path mappings for each level
    const pathMappings = {
        'root': {
            '': 'index.html',
            'index.html': 'index.html',
            'pages/about.html': 'pages/about.html',
            'pages/portfolio.html': 'pages/portfolio.html',
            'pages/team.html': 'pages/team.html',
            'pages/contact.html': 'pages/contact.html',
            'pages/privacy.html': 'pages/privacy.html',
            'pages/terms.html': 'pages/terms.html'
        },
        'pages': {
            '': '../index.html',
            'index.html': '../index.html',
            'pages/about.html': 'about.html',
            'pages/portfolio.html': 'portfolio.html',
            'pages/team.html': 'team.html',
            'pages/contact.html': 'contact.html',
            'pages/privacy.html': 'privacy.html',
            'pages/terms.html': 'terms.html'
        },
        'theses': {
            '': '../../index.html',
            'index.html': '../../index.html',
            'pages/about.html': '../about.html',
            'pages/portfolio.html': '../portfolio.html',
            'pages/team.html': '../team.html',
            'pages/contact.html': '../contact.html',
            'pages/privacy.html': '../privacy.html',
            'pages/terms.html': '../terms.html'
        }
    };
    
    return pathMappings[currentLevel][targetPath] || targetPath;
}

// Legacy function - now handled by NavigationManager
function setupNavigationPaths() {
    console.log('🔍 Legacy setupNavigationPaths called - handled by NavigationManager');
}

// Legacy function - now handled by NavigationManager
function setupFooterPaths() {
    console.log('🔍 Legacy setupFooterPaths called - handled by NavigationManager');
}

// Function to generate navigation HTML dynamically (fallback only)
function generateNavigationHTML() {
    return `
        <nav class="nav">
            <div class="nav-container">
                <a href="${getNavPath('')}" class="logo">
                    <span class="logo-primary">MATTIS</span><span class="logo-secondary">&CO</span>
                </a>
                
                <div class="nav-right">
                    <ul class="nav-links">
                        <li><a href="${getNavPath('index.html')}#private-equity" class="nav-anchor">Private Equity</a></li>
                        <li><a href="${getNavPath('index.html')}#advisory" class="nav-anchor">Advisory</a></li>
                        <li class="nav-dropdown">
                            <a href="#" class="nav-dropdown-toggle">
                                About
                                <i data-lucide="chevron-down" class="dropdown-icon"></i>
                            </a>
                            <ul class="nav-dropdown-menu">
                                <li><a href="${getNavPath('pages/about.html')}">Our Story</a></li>
                                <li><a href="${getNavPath('pages/portfolio.html')}">Portfolio</a></li>
                                <li><a href="${getNavPath('pages/team.html')}">Team</a></li>
                                <li><a href="${getNavPath('index.html')}#theses" class="nav-anchor">Investment Theses</a></li>
                            </ul>
                        </li>
                        <li><a href="${getNavPath('pages/contact.html')}">Contact</a></li>
                    </ul>
                    
                    <div class="nav-cta">
                        <a href="${getNavPath('pages/contact.html')}" class="btn btn-secondary btn-nav">Send Us a Deal</a>
                        <a href="${getNavPath('pages/contact.html')}" class="btn btn-primary btn-nav">Engage Advisors</a>
                    </div>
                </div>
                
                <!-- Mobile Navigation Toggle -->
                <div class="nav-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    `;
}

// Function to generate footer HTML dynamically (fallback only)
function generateFooterHTML() {
    return `
        <footer class="footer">
            <div class="footer-container">
                <div class="footer-content">
                    <div class="footer-logo">
                        <span class="logo-primary">MATTIS</span><span class="logo-secondary">&CO</span>
                    </div>
                    <div class="footer-links">
                        <a href="${getNavPath('pages/about.html')}">About</a>
                        <a href="${getNavPath('pages/portfolio.html')}">Portfolio</a>
                        <a href="${getNavPath('pages/contact.html')}">Contact</a>
                    </div>
                    <div class="footer-copy">
                        &copy; 2025 Mattis & Co. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    `;
}

// ============================================
// INITIALIZATION
// ============================================

// Create instance of ComponentLoader
const componentLoader = new ComponentLoader();

// Register components to load
function initializeComponents() {
    console.log('Initializing components...');
    
    // Get the correct path based on current location
    const headerPath = getComponentPath('header.html');
    const footerPath = getComponentPath('footer.html');
    
    console.log('Component paths:', { headerPath, footerPath });
    
    // Register components
    componentLoader.register('header', '#header', headerPath);
    componentLoader.register('footer', '#footer', footerPath);
    
    // Load all components
    componentLoader.loadAll().then(() => {
        console.log('Components loaded successfully');
        
        // Initialize any component-dependent functionality
        initializeComponentDependentFeatures();
    }).catch(error => {
        console.error('Error loading components:', error);
    });
}

// Features that depend on components being loaded
function initializeComponentDependentFeatures() {
    // Wait a bit to ensure DOM is fully updated
    setTimeout(() => {
        // Smooth scrolling for dynamically loaded navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            if (!anchor.hasAttribute('data-scroll-initialized')) {
                anchor.addEventListener('click', function (e) {
                    const href = this.getAttribute('href');
                    
                    // Skip empty hashes, javascript:void(0), and invalid selectors
                    if (!href || href === '#' || href.startsWith('javascript:') || href.length <= 1) {
                        return;
                    }
                    
                    e.preventDefault();
                    
                    try {
                        const target = document.querySelector(href);
                        if (target) {
                            const nav = document.querySelector('.nav');
                            const navHeight = nav?.offsetHeight || 80;
                            const targetPosition = target.offsetTop - navHeight - 20;
                            
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    } catch (error) {
                        console.warn('Invalid selector for smooth scrolling:', href, error);
                    }
                });
                anchor.setAttribute('data-scroll-initialized', 'true');
            }
        });
        
        console.log('Component-dependent features initialized');
    }, 100);
}

// ============================================
// EVENT LISTENERS
// ============================================

// Event listeners for component loading
document.addEventListener('componentLoaded', (e) => {
    console.log(`Component loaded: ${e.detail.name}${e.detail.fallback ? ' (using fallback)' : ''}`);
    
    // Initialize NavigationManager when header loads
    if (e.detail.name === 'header' && !window.navigationManager) {
        console.log('🚀 Initializing NavigationManager after header load...');
        
        // Small delay to ensure DOM is ready
        setTimeout(() => {
            if (typeof NavigationManager !== 'undefined') {
                window.navigationManager = new NavigationManager();
                console.log('✅ NavigationManager initialized successfully');
            } else {
                console.error('❌ NavigationManager class not found');
            }
        }, 100);
    }
});

document.addEventListener('allComponentsLoaded', (e) => {
    console.log('All components loaded:', e.detail.loaded);
    
    // DISABLED - Using navigation-config.js instead of NavigationManager
    /*
    if (!window.navigationManager) {
        console.log('🚀 Initializing NavigationManager (backup)...');
        
        setTimeout(() => {
            if (typeof NavigationManager !== 'undefined') {
                window.navigationManager = new NavigationManager();
                console.log('✅ NavigationManager initialized successfully (backup)');
            } else {
                console.error('❌ NavigationManager class not found');
            }
        }, 100);
    }
    */
    
    // Just log that we're using navigation-config.js instead
    if (window.navConfig) {
        console.log('✅ Using navigation-config.js for navigation management');
    }
});

// ALSO: Optionally add this check at the beginning of NavigationManager constructor (line ~124):
class NavigationManager {
    constructor() {
        // Skip if navigation-config.js is handling navigation
        if (window.navConfig) {
            console.log('✅ NavigationConfig detected, skipping NavigationManager initialization');
            return; // Exit early, don't initialize NavigationManager
        }
        
        console.log('🚀 NavigationManager: Starting initialization...');
        // ... rest of the constructor code ...
    }
}

// ============================================
// EXPORTS
// ============================================

// Export for external use
if (typeof window !== 'undefined') {
    window.ComponentLoader = ComponentLoader;
    window.componentLoader = componentLoader;
    window.initializeComponents = initializeComponents;
    window.NavigationManager = NavigationManager;
}

// Auto-initialize if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeComponents);
} else {
    initializeComponents();
}