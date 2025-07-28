// Mattis & Co - Component Loader
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

// Helper function to get correct path based on current location
function getComponentPath(filename) {
    const currentPath = window.location.pathname;
    
    // Count directory depth by counting slashes (excluding leading slash)
    const pathParts = currentPath.split('/').filter(part => part.length > 0);
    
    // Remove filename if present (if last part has extension)
    if (pathParts.length > 0 && pathParts[pathParts.length - 1].includes('.')) {
        pathParts.pop();
    }
    
    // Calculate how many levels to go up
    const levelsUp = pathParts.length;
    const prefix = '../'.repeat(levelsUp);
    
    return levelsUp === 0 ? `components/${filename}` : `${prefix}components/${filename}`;
}

// Helper function to get correct navigation paths based on current location
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

// Function to setup navigation paths after header loads
function setupNavigationPaths() {
    console.log('🔍 Setting up navigation paths');
    
    // Get all navigation elements
    const elements = {
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
    
    // Set dynamic paths
    if (elements.logo) elements.logo.href = getNavPath('');
    if (elements.pe) elements.pe.href = getNavPath('index.html') + '#private-equity';
    if (elements.advisory) elements.advisory.href = getNavPath('index.html') + '#advisory';
    if (elements.about) elements.about.href = getNavPath('pages/about.html');
    if (elements.portfolio) elements.portfolio.href = getNavPath('pages/portfolio.html');
    if (elements.team) elements.team.href = getNavPath('pages/team.html');
    if (elements.theses) elements.theses.href = getNavPath('index.html') + '#theses';
    if (elements.contact) elements.contact.href = getNavPath('pages/contact.html');
    if (elements.ctaDeal) elements.ctaDeal.href = getNavPath('pages/contact.html');
    if (elements.ctaAdvisors) elements.ctaAdvisors.href = getNavPath('pages/contact.html');
    
    console.log('✅ Navigation paths set up successfully');
}

// Function to setup footer paths after footer loads
function setupFooterPaths() {
    const homeLink = document.getElementById('footer-home');
    const privacyLink = document.getElementById('footer-privacy');
    const termsLink = document.getElementById('footer-terms');
    
    if (homeLink) {
        homeLink.href = getNavPath('');
        
        // Add special home link behavior
        homeLink.addEventListener('click', function(e) {
            const currentPath = window.location.pathname;
            
            // If we're already on home page, scroll to top instead
            if (currentPath.endsWith('index.html') || currentPath === '/' || currentPath === '') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
    
    if (privacyLink) privacyLink.href = getNavPath('pages/privacy.html');
    if (termsLink) termsLink.href = getNavPath('pages/terms.html');
    
    console.log('✅ Footer paths set up successfully');
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
            <div class="container">
                <div class="footer-content">
                    <ul class="footer-links">
                        <li><a href="${getNavPath('')}" class="footer-home">Home</a></li>
                        <li><a href="${getNavPath('pages/privacy.html')}">Privacy Policy</a></li>
                        <li><a href="${getNavPath('pages/terms.html')}">Terms of Service</a></li>
                    </ul>
                </div>
                
                <div class="footer-bottom">
                    <p>© 2025 Mattis & Co. All rights reserved.</p>
                </div>
            </div>
        </footer>
    `;
}

// Default component configurations
const DEFAULT_COMPONENTS = {
    header: {
        selector: '#header',
        path: getComponentPath('header.html'),
        fallback: null // Will be generated dynamically if needed
    },
    footer: {
        selector: '#footer',
        path: getComponentPath('footer.html'),
        fallback: null // Will be generated dynamically if needed
    }
};

// Initialize component loader
const componentLoader = new ComponentLoader();

// Auto-setup for common components
function setupDefaultComponents() {
    Object.entries(DEFAULT_COMPONENTS).forEach(([name, config]) => {
        componentLoader.register(name, config.selector, config.path, config.fallback);
    });
}

// Initialize when DOM is ready
function initializeComponents() {
    setupDefaultComponents();
    
    // Load components
    componentLoader.loadAll().then(() => {
        // Re-initialize navigation after components load
        if (window.MattisApp && typeof window.MattisApp.setupNavigation === 'function') {
            try {
                window.MattisApp.setupNavigation();
                console.log('Navigation re-initialized via MattisApp');
            } catch (error) {
                console.error('Error initializing navigation:', error);
            }
        }
        
        // Initialize any other component-dependent functionality
        initializeComponentDependentFeatures();
    }).catch(error => {
        console.error('Error loading components:', error);
    });
}

// Features that depend on components being loaded
function initializeComponentDependentFeatures() {
    // Wait a bit to ensure DOM is fully updated
    setTimeout(() => {
        // Setup navigation paths (backup call)
        setupNavigationPaths();
        setupFooterPaths();
        
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

// Event listeners for component loading
document.addEventListener('componentLoaded', (e) => {
    console.log(`Component loaded: ${e.detail.name}${e.detail.fallback ? ' (using fallback)' : ''}`);
});

document.addEventListener('allComponentsLoaded', (e) => {
    console.log('All components loaded:', e.detail.loaded);
});

// Export for external use
if (typeof window !== 'undefined') {
    window.ComponentLoader = ComponentLoader;
    window.componentLoader = componentLoader;
    window.initializeComponents = initializeComponents;
}

// Auto-initialize if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeComponents);
} else {
    initializeComponents();
}