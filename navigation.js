// Navigation System - Wrapped to prevent multiple declarations
(function() {
    'use strict';
    
    // Check if navigation is already initialized
    if (window.navigationInitialized) {
        return;
    }
    window.navigationInitialized = true;

    // Navigation Configuration
    const navigationConfig = {
        logo: {
            text: 'MATTIS&CO',
            imageSrc: '/assets/mattisco - logo.webp',
            imageAlt: 'Mattis & Co',
            href: '/' // Will be adjusted based on current page location
        },
        mainMenu: [
            {
                text: 'Home',
                href: '/'
            },
            {
                text: 'Services',
                dropdown: [
                    { text: 'Private Equity', href: '/#private-equity' },
                    { text: 'Strategic Advisory', href: '/#advisory' },
                    { text: 'AI Operationalization', href: '/pages/theses/ai.html' },
                    { text: 'Adaptive Enterprise', href: '/pages/theses/adaptivity.html' }
                ]
            },
            {
                text: 'About',
                href: '/pages/about.html',
                dropdown: [
                    { text: 'About Us', href: '/pages/about.html' },
                    { text: 'Team', href: '/pages/team.html' },
                    { text: 'Partners', href: '/pages/partners.html' }
                ]
            },
            {
                text: 'Investment Theses',
                href: '/pages/theses.html',
                dropdown: [
                    { text: 'Service Consolidation', href: '/pages/theses/consolidation.html' },
                    { text: 'Essential Infrastructure', href: '/pages/theses/infrastructure.html' }
                ]
            },
            {
                text: 'Contact',
                href: '/pages/contact.html'
            }
        ],
        footer: {
            brand: {
                title: 'MATTIS&CO',
                tagline: 'The firm that doesn\'t feel like a firm.',
                subtitle: 'Capital for growth. Clarity for scale.'
            },
            columns: [
                {
                    title: 'COMPANY',
                    links: [
                        { text: 'Home', href: '/' },
                        { text: 'About', href: '/pages/about.html' },
                        { text: 'Team', href: '/pages/team.html' },
                        { text: 'Contact', href: '/pages/contact.html' }
                    ]
                },
                {
                    title: 'AREAS OF FOCUS',
                    links: [
                        { text: 'Private Equity', href: '/#private-equity' },
                        { text: 'Strategic Advisory', href: '/#advisory' },
                        { text: 'Investment Theses', href: '/pages/theses.html' }
                    ]
                },
                {
                    title: 'LEGAL',
                    links: [
                        { text: 'Privacy Policy', href: '/pages/privacy.html' },
                        { text: 'Terms of Service', href: '/pages/terms.html' }
                    ]
                }
            ],
            bottom: {
                copyright: '© 2025 Mattis & Co. All rights reserved.',
                tagline: '🚀 Building boring businesses into growth machines.'
            }
        }
    };

    // Utility function to get the correct path based on current page location
    function getCorrectPath(href, isImage = false) {
        const currentPath = window.location.pathname;
        
        // Handle local file system paths (file://) and local servers differently
        const isLocalFile = window.location.protocol === 'file:';
        const pathParts = currentPath.split('/').filter(p => p);
        
        // Determine depth level
        let isInTheses = currentPath.includes('/pages/theses/');
        let isInPages = !isInTheses && currentPath.includes('/pages/');
        let isRoot = !isInPages && !isInTheses;
        
        // Handle image paths specifically
        if (isImage) {
            if (href.startsWith('/assets/')) {
                const filename = href.replace('/assets/', '');
                if (isInTheses) return '../../assets/' + filename;
                if (isInPages) return '../assets/' + filename;
                return 'assets/' + filename;
            }
        }
        
        // For root references
        if (href === '/') {
            if (isInTheses) return '../../index.html';
            if (isInPages) return '../index.html';
            return 'index.html';
        }
        
        // For hash references (sections on homepage)
        if (href.startsWith('/#')) {
            if (isInTheses) return '../../index.html' + href.substring(1);
            if (isInPages) return '../index.html' + href.substring(1);
            return 'index.html' + href.substring(1);
        }
        
        // For pages in /pages/theses/
        if (href.startsWith('/pages/theses/')) {
            const filename = href.replace('/pages/theses/', '');
            if (isInTheses) return filename;
            if (isInPages) return 'theses/' + filename;
            return 'pages/theses/' + filename;
        }
        
        // For pages in /pages/
        if (href.startsWith('/pages/')) {
            const filename = href.replace('/pages/', '');
            if (isInTheses) return '../' + filename;
            if (isInPages) return filename;
            return 'pages/' + filename;
        }
        
        return href;
    }

    // Function to generate navigation HTML
    function generateNavigation() {
        const nav = navigationConfig.mainMenu;
        const logoImagePath = getCorrectPath(navigationConfig.logo.imageSrc, true);
        
        let navHTML = `
            <div class="nav-container">
                <div class="logo">
                    <a href="${getCorrectPath(navigationConfig.logo.href)}">
                        <img src="${logoImagePath}" alt="${navigationConfig.logo.imageAlt}" class="logo-image" />
                    </a>
                </div>
                <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Toggle navigation menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul class="nav-menu" id="navMenu">`;
        
        nav.forEach(item => {
            if (item.dropdown) {
                navHTML += `
                    <li class="dropdown">
                        <a href="${item.href ? getCorrectPath(item.href) : '#'}" class="dropdown-toggle">${item.text}</a>
                        <ul class="dropdown-menu">`;
                
                item.dropdown.forEach(dropItem => {
                    navHTML += `<li><a href="${getCorrectPath(dropItem.href)}">${dropItem.text}</a></li>`;
                });
                
                navHTML += `
                        </ul>
                    </li>`;
            } else {
                navHTML += `<li><a href="${getCorrectPath(item.href)}">${item.text}</a></li>`;
            }
        });
        
        navHTML += `
                </ul>
            </div>`;
        
        return navHTML;
    }

    // Function to generate footer HTML
    function generateFooter() {
        const footer = navigationConfig.footer;
        const footerLogoPath = getCorrectPath('/assets/logo.png', true);
        
        let footerHTML = `
            <div class="footer-container">
                <div class="footer-column footer-brand">
                    <div class="footer-logo">
                        <img src="${footerLogoPath}" alt="Mattis & Co" class="footer-logo-image" />
                    </div>
                    <p class="footer-tagline">${footer.brand.tagline}</p>
                    <p class="footer-subtitle">${footer.brand.subtitle}</p>
                </div>`;
        
        footer.columns.forEach(column => {
            footerHTML += `
                <div class="footer-column">
                    <h4>${column.title}</h4>
                    <ul>`;
            
            column.links.forEach(link => {
                footerHTML += `<li><a href="${getCorrectPath(link.href)}">${link.text}</a></li>`;
            });
            
            footerHTML += `
                    </ul>
                </div>`;
        });
        
        footerHTML += `
            </div>
            <div class="footer-bottom">
                <p>${footer.bottom.copyright}</p>
                <p>${footer.bottom.tagline}</p>
            </div>`;
        
        return footerHTML;
    }

    // Function to initialize navigation
    function initializeNavigation() {
        // Insert navigation
        const navElement = document.querySelector('.main-nav');
        if (navElement) {
            navElement.innerHTML = generateNavigation();
        }
        
        // Insert footer
        const footerElement = document.querySelector('footer');
        if (footerElement) {
            footerElement.innerHTML = generateFooter();
        }
        
        // Add scroll effect to header
        const header = document.querySelector('header');
        if (header) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }
        
        // Add mobile menu functionality
        const mobileToggle = document.getElementById('mobileMenuToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (mobileToggle && navMenu) {
            // Create mobile overlay
            const overlay = document.createElement('div');
            overlay.className = 'mobile-overlay';
            document.body.appendChild(overlay);
            
            mobileToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                navMenu.classList.toggle('active');
                mobileToggle.classList.toggle('active');
                overlay.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });
            
            // Close menu when clicking overlay
            overlay.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!event.target.closest('.nav-container')) {
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
            
            // Handle dropdown clicks on mobile
            const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
            dropdownToggles.forEach(toggle => {
                toggle.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        e.stopPropagation();
                        const dropdown = this.parentElement;
                        
                        // Close other dropdowns
                        document.querySelectorAll('.dropdown').forEach(d => {
                            if (d !== dropdown) {
                                d.classList.remove('active');
                            }
                        });
                        
                        dropdown.classList.toggle('active');
                    }
                });
            });
        }
        
        // Add active state to current page
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (linkPath && !linkPath.includes('#')) {
                // Check if this link matches current page
                if (linkPath.includes('index.html') && (currentPath === '/' || currentPath.endsWith('index.html'))) {
                    link.classList.add('active');
                } else if (currentPath.endsWith(linkPath) || currentPath.includes(linkPath.replace('.html', ''))) {
                    link.classList.add('active');
                }
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeNavigation);
    } else {
        initializeNavigation();
    }
})();