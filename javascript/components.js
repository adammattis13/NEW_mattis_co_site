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
            
            // Dispatch custom event
            element.dispatchEvent(new CustomEvent('componentLoaded', { 
                detail: { name, component } 
            }));
            
            console.log(`✅ Loaded component: ${name}`);
            
        } catch (error) {
            console.warn(`⚠️ Failed to load ${name} from ${component.path}:`, error);
            
            // Use fallback if provided
            if (component.fallback && element) {
                element.innerHTML = component.fallback;
                component.loaded = true;
                this.loadedComponents.add(name);
                console.log(`📦 Using fallback for: ${name}`);
                
                // Still dispatch event for fallback
                element.dispatchEvent(new CustomEvent('componentLoaded', { 
                    detail: { name, component, fallback: true } 
                }));
            }
        }
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

// Default component configurations
const DEFAULT_COMPONENTS = {
    header: {
        selector: '#header',
        path: 'components/header.html',
        fallback: `
            <nav class="nav">
                <div class="nav-container">
                    <a href="/" class="logo">MATTIS & CO</a>
                    <ul class="nav-links">
                        <li><a href="#what-we-do">What We Do</a></li>
                        <li><a href="#why-different">Why Different</a></li>
                        <li><a href="#theses">Theses</a></li>
                        <li><a href="#team">Team</a></li>
                        <li><a href="#playbook">Playbook</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                    <div class="nav-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>
        `
    },
    footer: {
        selector: '#footer',
        path: 'components/footer.html',
        fallback: `
            <footer class="footer">
                <div class="footer-content">
                    <div>
                        <div class="footer-logo">MATTIS & CO</div>
                        <div class="footer-tagline">The PE firm that doesn't feel like PE.</div>
                    </div>
                    <ul class="footer-links">
                        <li><a href="#what-we-do">What We Do</a></li>
                        <li><a href="#why-different">Why Different</a></li>
                        <li><a href="#theses">Theses</a></li>
                        <li><a href="#team">Team</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li><a href="pages/privacy.html">Privacy</a></li>
                        <li><a href="pages/terms.html">Terms</a></li>
                    </ul>
                </div>
                <div class="container" style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(212, 212, 212, 0.2); text-align: center;">
                    <p style="color: var(--light-grey); font-size: 0.9rem;">
                        © 2025 Mattis & Co. All rights reserved.
                    </p>
                </div>
            </footer>
        `
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
        // Smooth scrolling for dynamically loaded navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            if (!anchor.hasAttribute('data-scroll-initialized')) {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        const nav = document.querySelector('.nav');
                        const navHeight = nav?.offsetHeight || 80;
                        const targetPosition = target.offsetTop - navHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
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