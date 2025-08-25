// ============================================
// MATTIS & CO - COMPONENT LOADER SYSTEM
// ============================================

class ComponentLoader {
    constructor() {
        this.components = new Map();
        this.loaded = new Set();
        this.fallbackAttempted = new Set();
    }

    // Register a component
    register(name, selector, path, fallback = null) {
        this.components.set(name, {
            selector,
            path,
            fallback,
            loaded: false
        });
    }

    // Load a single component
    async load(name) {
        const component = this.components.get(name);
        if (!component || component.loaded) return;

        const element = document.querySelector(component.selector);
        if (!element) {
            console.warn(`Element not found for ${name}: ${component.selector}`);
            return;
        }

        try {
            const response = await fetch(component.path);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const html = await response.text();
            element.innerHTML = html;
            component.loaded = true;
            this.loaded.add(name);
            
            // Dispatch custom event
            document.dispatchEvent(new CustomEvent('componentLoaded', {
                detail: { name, element }
            }));
            
            console.log(`✅ Loaded: ${name}`);
            
        } catch (error) {
            console.error(`❌ Failed to load ${name}:`, error);
            
            // Try fallback if available and not already attempted
            if (component.fallback && !this.fallbackAttempted.has(name)) {
                this.fallbackAttempted.add(name);
                console.log(`🔄 Attempting fallback for ${name}...`);
                element.innerHTML = component.fallback;
                component.loaded = true;
                this.loaded.add(name);
            } else if (!component.fallback && (name === 'header' || name === 'footer')) {
                // Generate dynamic fallback for header/footer
                this.fallbackAttempted.add(name);
                const fallbackHTML = name === 'header' ? generateNavigationHTML() : generateFooterHTML();
                element.innerHTML = fallbackHTML;
                component.loaded = true;
                this.loaded.add(name);
                console.log(`📦 Using generated fallback for ${name}`);
            }
        }
    }

    // Load all registered components
    async loadAll() {
        const loadPromises = Array.from(this.components.keys()).map(name => 
            this.load(name)
        );
        
        await Promise.all(loadPromises);
        
        // Dispatch event when all components are loaded
        document.dispatchEvent(new CustomEvent('allComponentsLoaded', {
            detail: { loaded: Array.from(this.loaded) }
        }));
    }

    // Check if a component is loaded
    isLoaded(name) {
        const component = this.components.get(name);
        return component?.loaded || false;
    }

    // Get component info
    getComponent(name) {
        return this.components.get(name);
    }

    // Update component path (for dynamic routing)
    updatePath(name, newPath) {
        const component = this.components.get(name);
        if (component) {
            component.path = newPath;
            component.loaded = false;
        }
    }

    // Reload a component
    async reload(name) {
        const component = this.components.get(name);
        if (component) {
            component.loaded = false;
            await this.load(name);
        }
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

// Function to detect base path
function getBasePath() {
    const path = window.location.pathname;
    const depth = path.split('/').filter(p => p).length - 1;
    return depth > 0 ? '../'.repeat(depth) : './';
}

// Legacy function - now handled by navigation-config.js
function setupNavigationPaths() {
    console.log('🔍 Legacy setupNavigationPaths called - handled by navigation-config.js');
}

// Legacy function - now handled by navigation-config.js  
function setupFooterPaths() {
    console.log('🔍 Legacy setupFooterPaths called - handled by navigation-config.js');
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
// COMPONENT INITIALIZATION
// ============================================

// Create global component loader instance
const componentLoader = new ComponentLoader();

// Register default components
function registerDefaultComponents() {
    const basePath = getBasePath();
    const componentPath = basePath + 'components/';
    
    // Register header and footer
    componentLoader.register('header', '#header', componentPath + 'header.html');
    componentLoader.register('footer', '#footer', componentPath + 'footer.html');
    
    console.log('📦 Components registered with base path:', basePath);
}

// Initialize components when DOM is ready
async function initializeComponents() {
    console.log('🚀 Initializing component system...');
    
    // Register components
    registerDefaultComponents();
    
    // Load all components
    await componentLoader.loadAll();
    
    console.log('✅ Component system initialized');
}

// ============================================
// EVENT LISTENERS
// ============================================

// Listen for component loaded events
document.addEventListener('componentLoaded', (e) => {
    console.log(`📢 Component loaded: ${e.detail.name}`);
    
    // Initialize lucide icons if they exist in the loaded component
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Navigation is handled by navigation-config.js
    if (e.detail.name === 'header' && window.navConfig) {
        console.log('✅ Navigation handled by navigation-config.js');
    }
});

document.addEventListener('allComponentsLoaded', (e) => {
    console.log('All components loaded:', e.detail.loaded);
    
    // Just log that we're using navigation-config.js
    if (window.navConfig) {
        console.log('✅ Using navigation-config.js for navigation management');
    }
});

// ============================================
// EXPORTS
// ============================================

// Export for external use
if (typeof window !== 'undefined') {
    window.ComponentLoader = ComponentLoader;
    window.componentLoader = componentLoader;
    window.initializeComponents = initializeComponents;
    window.getNavPath = getNavPath;
    window.setupNavigationPaths = setupNavigationPaths;
    window.setupFooterPaths = setupFooterPaths;
    // NOTE: NavigationManager removed - handled by navigation-config.js
}

// Auto-initialize if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeComponents);
} else {
    initializeComponents();
}