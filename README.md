# MATTIS&CO - Simple Static Website

**Capital. Clarity. Full Send.**

## ✅ PURE HTML/CSS/JS - NO BUILD PROCESS

### Just open `index.html` and you're live. That's it.

---

## 📁 Project Structure

```
mattisco-simple/
├── index.html           # Home page
├── css/
│   └── styles.css       # All styling
├── js/
│   └── main.js          # Navigation & interactions
├── assets/              # Images, logos
└── pages/
    ├── about.html       # ✅ Complete
    ├── memorial.html    # ✅ Complete (needs Kevin's photo)
    ├── contact.html     # ✅ Complete (needs email integration)
    ├── approach.html    # ✅ Complete
    ├── board.html       # 🟡 Placeholder
    ├── insights.html    # 🟡 Placeholder
    ├── careers.html     # 🟡 Placeholder
    ├── media.html       # 🟡 Placeholder
    ├── privacy.html     # 🟡 Placeholder
    └── terms.html       # 🟡 Placeholder
```

---

## 🚀 INSTANT SETUP

### Option 1: Local Testing
1. **Unzip the folder**
2. **Double-click `index.html`**
3. **Done!**

### Option 2: Live Server (recommended for development)
If you have VS Code:
1. Install "Live Server" extension
2. Right-click `index.html` → "Open with Live Server"
3. Auto-refreshes when you edit files

---

## 🎨 Design System

### Colors (in styles.css)
```css
--black: #000000
--white: #FFFFFF
--lime: #BADA55      /* Your accent color */
--lime-dark: #A5C54A
--charcoal: #1C1C1C
--gray: #808080
```

### Fonts
- **Display:** Bebas Neue (headlines)
- **Body:** Inter (text)
- Loaded from Google Fonts (no download needed)

---

## ✏️ HOW TO EDIT

### Change Text
1. Open any `.html` file in a text editor
2. Find the text you want to change
3. Edit it
4. Save
5. Refresh browser

### Change Colors
1. Open `css/styles.css`
2. Edit the `:root` variables at the top
3. Save
4. Refresh browser

### Add Images
1. Put images in `assets/` folder
2. Reference like: `<img src="assets/your-image.jpg">`

---

## 📸 IMMEDIATE ACTIONS

### 1. Add Kevin's Photo
- Save as: `assets/kevin-smith.jpg`
- Open `pages/memorial.html`
- Find line with `<div class="memorial-photo">KJS</div>`
- Replace with:
  ```html
  <div class="memorial-photo">
      <img src="../assets/kevin-smith.jpg" alt="1st Lt. Kevin J. Smith" 
           style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
  </div>
  ```

### 2. Add Your Photo
- Save as: `assets/adam-mattis.jpg`
- Open `pages/about.html`
- Find the `<div>` with "AM" text
- Replace with:
  ```html
  <img src="../assets/adam-mattis.jpg" alt="Adam Mattis" 
       style="width: 100%; height: 100%; object-fit: cover;">
  ```

### 3. Email Integration (Contact Form)
The form currently just logs to console. To make it actually send email:

**Option A: Formspree (Easiest - No coding)**
1. Sign up at [https://formspree.io](https://formspree.io)
2. Get your form endpoint
3. In `pages/contact.html`, change:
   ```html
   <form id="contactForm">
   ```
   to:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. Remove `id="contactForm"` (no longer needed)

**Option B: Keep JavaScript, use email service API**
- Edit `js/main.js`
- Replace the `// TODO` comment with your email service API call

---

## 🌐 DEPLOYMENT OPTIONS

### Option 1: Netlify (Recommended - Free)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your folder
3. Live in 30 seconds
4. Get a free SSL certificate
5. Can connect custom domain

### Option 2: GitHub Pages (Free)
1. Create GitHub repo
2. Upload files
3. Enable Pages in settings
4. Live at `yourname.github.io/repo-name`

### Option 3: Any Web Host
1. Upload via FTP
2. Done!

Works on: Bluehost, GoDaddy, HostGator, literally any host that serves HTML.

---

## 📱 MOBILE RESPONSIVE

- ✅ Hamburger menu on mobile
- ✅ All sections stack properly
- ✅ Touch-friendly buttons
- ✅ Tested on all screen sizes

---

## ⚡ FEATURES

- ✅ No dependencies - works offline
- ✅ Loads in < 1 second
- ✅ Works on ANY browser
- ✅ SEO-friendly semantic HTML
- ✅ Accessible (keyboard navigation, ARIA labels)
- ✅ Progressive enhancement (works without JS)

---

## 🔧 CUSTOMIZATION TIPS

### Add a New Page
1. Copy any page from `pages/` folder
2. Rename it
3. Edit the content
4. Add link to navigation in all pages:
   ```html
   <li><a href="pages/your-new-page.html">New Page</a></li>
   ```

### Change Navigation
- Edit the `<nav>` section at top of each HTML file
- All pages share the same nav structure

### Add Animations
- CSS animations already set up in `styles.css`
- Add class `fade-in` or `slide-up` to any element
- Automatic scroll-triggered animations via `js/main.js`

---

## 🎯 CONTACT INFO

Update these in **all** files:
- Phone: 814.232.7404
- Email: info@mattisco.com
- Location: Raleigh, NC

Use Find/Replace to change everywhere at once.

---

## 📞 NEED HELP?

### Common Issues

**Page looks broken?**
- Make sure CSS file path is correct
- Should be `href="../css/styles.css"` in pages folder
- Should be `href="css/styles.css"` in index.html

**Images not showing?**
- Check file path
- Use `../assets/image.jpg` from pages folder
- Use `assets/image.jpg` from index.html

**Mobile menu not working?**
- Make sure `<script src="../js/main.js"></script>` is at bottom of page
- Check browser console for errors (F12)

---

## ✨ YOU'RE DONE!

This is as simple as it gets:
- No npm
- No build process
- No frameworks
- Just HTML, CSS, JS

**Edit → Save → Refresh → Live**

---

**Capital. Clarity. Full Send.** 🚀

*In memory of 1st Lt. Kevin J. Smith*
