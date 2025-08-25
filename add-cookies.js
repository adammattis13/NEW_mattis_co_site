// add-cookies.js
// Automatically adds cookie consent to all HTML files
// Usage: node add-cookies.js

const fs = require('fs');
const path = require('path');

// Your Google Analytics ID (leave empty if not using)
const GA_ID = 'G-XXXXXXXXXX'; // Replace with your actual ID or leave as is

// Cookie consent snippet to add
function getCookieSnippet(scriptPath) {
    const gaLine = GA_ID && GA_ID !== 'G-XXXXXXXXXX' 
        ? `    window.GA_MEASUREMENT_ID = '${GA_ID}';\n` 
        : '';
    
    return `
<!-- Cookie Consent -->
<script>
${gaLine}</script>
<script src="${scriptPath}"></script>
`;
}

// Process a single file
function processFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if cookie consent already added
        if (content.includes('cookie-consent.js')) {
            console.log(`✓  Already has cookie consent: ${filePath}`);
            return;
        }
        
        // Determine the correct path based on file location
        let scriptPath = 'cookie-consent.js';
        if (filePath.includes('pages/theses/')) {
            scriptPath = '../../cookie-consent.js';
        } else if (filePath.includes('pages/')) {
            scriptPath = '../cookie-consent.js';
        } else if (filePath === '404.html') {
            scriptPath = '/cookie-consent.js'; // 404 uses absolute path
        }
        
        // Add cookie consent before </body>
        const snippet = getCookieSnippet(scriptPath);
        content = content.replace('</body>', snippet + '</body>');
        
        // Write the updated content
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Added cookie consent to: ${filePath}`);
        
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
    }
}

// Main function
function addCookiesToAll() {
    console.log('=== Adding Cookie Consent to All Pages ===\n');
    
    if (GA_ID === 'G-XXXXXXXXXX') {
        console.log('ℹ️  No Google Analytics ID configured (that\'s OK!)\n');
    } else {
        console.log(`📊 Using Google Analytics ID: ${GA_ID}\n`);
    }
    
    // List of all HTML files
    const files = [
        'index.html',
        '404.html',
        'pages/about.html',
        'pages/contact.html',
        'pages/portfolio.html',
        'pages/privacy.html',
        'pages/team.html',
        'pages/terms.html',
        'pages/partners.html',
        'pages/theses.html',
        'pages/theses/ai.html',
        'pages/theses/adaptivity.html',
        'pages/theses/consolidation.html',
        'pages/theses/infrastructure.html'
    ];
    
    console.log('Processing files...\n');
    
    files.forEach(file => {
        if (fs.existsSync(file)) {
            processFile(file);
        } else {
            console.log(`⚠️  File not found: ${file}`);
        }
    });
    
    console.log('\n✅ Cookie consent added to all pages!');
    console.log('📝 Remember to:');
    console.log('   1. Add cookie-consent.js to your root directory');
    console.log('   2. Update GA_ID if you want analytics');
    console.log('   3. Test in an incognito window');
}

// Check if cookie-consent.js exists
if (!fs.existsSync('cookie-consent.js')) {
    console.log('⚠️  Warning: cookie-consent.js not found in root directory');
    console.log('   Make sure to add it before testing!\n');
}

// Run the script
addCookiesToAll();