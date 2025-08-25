// cookie-consent.js
// Simple cookie consent management for Mattis&Co

(function() {
    'use strict';
    
    // Cookie utility functions
    const CookieUtil = {
        set: function(name, value, days) {
            const expires = new Date(Date.now() + days * 864e5).toUTCString();
            document.cookie = name + '=' + encodeURIComponent(value) + 
                            '; expires=' + expires + 
                            '; path=/; SameSite=Lax; Secure';
        },
        
        get: function(name) {
            return document.cookie.split('; ').reduce((r, v) => {
                const parts = v.split('=');
                return parts[0] === name ? decodeURIComponent(parts[1]) : r;
            }, '');
        }
    };
    
    // Check if consent was already given
    function hasConsent() {
        return CookieUtil.get('cookieConsent') !== '';
    }
    
    // Create and inject cookie banner HTML
    function createBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookieConsent';
        banner.className = 'cookie-consent';
        banner.innerHTML = `
            <div class="cookie-content">
                <p>We use cookies to enhance your experience and analyze site traffic.</p>
                <div class="cookie-buttons">
                    <button id="acceptCookies" class="btn btn-primary btn-sm">Accept</button>
                    <button id="rejectCookies" class="btn btn-secondary btn-sm">Reject</button>
                    <a href="/pages/privacy.html" class="cookie-link">Privacy Policy</a>
                </div>
            </div>
        `;
        document.body.appendChild(banner);
        
        // Add styles
        addStyles();
        
        // Show banner with animation
        setTimeout(() => banner.classList.add('show'), 100);
        
        // Attach event listeners
        document.getElementById('acceptCookies').addEventListener('click', acceptCookies);
        document.getElementById('rejectCookies').addEventListener('click', rejectCookies);
    }
    
    // Add CSS styles
    function addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .cookie-consent {
                position: fixed;
                bottom: 20px;
                left: 20px;
                right: 20px;
                max-width: 400px;
                background: rgba(26, 26, 26, 0.95);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                color: white;
                padding: 1.5rem;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                z-index: 9999;
                transform: translateY(150%);
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .cookie-consent.show {
                transform: translateY(0);
            }
            
            .cookie-content p {
                margin: 0 0 1rem 0;
                font-size: 0.95rem;
                line-height: 1.5;
                color: rgba(255, 255, 255, 0.9);
            }
            
            .cookie-buttons {
                display: flex;
                gap: 0.75rem;
                align-items: center;
                flex-wrap: wrap;
            }
            
            .cookie-buttons .btn-sm {
                padding: 0.5rem 1rem;
                font-size: 0.9rem;
            }
            
            .cookie-link {
                color: rgba(255, 255, 255, 0.6);
                font-size: 0.85rem;
                text-decoration: underline;
                transition: color 0.3s ease;
                margin-left: auto;
            }
            
            .cookie-link:hover {
                color: var(--accent-green);
            }
            
            @media (max-width: 480px) {
                .cookie-consent {
                    left: 10px;
                    right: 10px;
                    bottom: 10px;
                    padding: 1.25rem;
                }
                
                .cookie-buttons {
                    width: 100%;
                }
                
                .cookie-buttons .btn-sm {
                    flex: 1;
                }
                
                .cookie-link {
                    width: 100%;
                    text-align: center;
                    margin: 0.5rem 0 0 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Hide banner
    function hideBanner() {
        const banner = document.getElementById('cookieConsent');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => banner.remove(), 300);
        }
    }
    
    // Accept cookies
    function acceptCookies() {
        CookieUtil.set('cookieConsent', 'accepted', 365);
        hideBanner();
        loadAnalytics();
    }
    
    // Reject cookies
    function rejectCookies() {
        CookieUtil.set('cookieConsent', 'rejected', 365);
        hideBanner();
    }
    
    // Load analytics (only if accepted)
    function loadAnalytics() {
        // Google Analytics 4 - Replace GA_MEASUREMENT_ID with your actual ID
        if (typeof window.GA_MEASUREMENT_ID !== 'undefined' && window.GA_MEASUREMENT_ID) {
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${window.GA_MEASUREMENT_ID}`;
            document.head.appendChild(script);
            
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', window.GA_MEASUREMENT_ID, {
                'anonymize_ip': true,
                'cookie_flags': 'SameSite=None;Secure'
            });
        }
    }
    
    // Initialize
    function init() {
        if (!hasConsent()) {
            createBanner();
        } else if (CookieUtil.get('cookieConsent') === 'accepted') {
            loadAnalytics();
        }
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Export for external use
    window.CookieConsent = {
        reset: function() {
            CookieUtil.set('cookieConsent', '', -1);
            window.location.reload();
        },
        status: function() {
            return CookieUtil.get('cookieConsent') || 'not set';
        }
    };
})();