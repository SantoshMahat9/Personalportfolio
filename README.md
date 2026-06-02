# Santosh Mahato — Professional Portfolio

A clean, recruiter-friendly portfolio website built with semantic HTML5, CSS3, and Vanilla JavaScript.
No frameworks, no build step, no dependencies. Upload and it works.

---

## 📁 File Structure

```
santosh-portfolio/
├── index.html        ← Main HTML (all content lives here)
├── css/
│   └── style.css     ← All styles (CSS variables at top for easy theming)
├── js/
│   └── main.js       ← Navbar, scroll reveal, form validation
└── README.md
```

---

## 🚀 How to Deploy (GitHub Pages)

1. Create a new GitHub repository (or use your existing one: `SantoshMahat9/santos`)
2. Upload all files keeping the folder structure intact
3. Go to **Settings → Pages → Source → main branch → / (root)**
4. Your site will be live at `https://santoshmahat9.github.io/santos/`

---

## 🎨 Easy Customization

### Change Colors
Open `css/style.css` and edit the `:root` block at the very top:
```css
:root {
  --accent:    #2563eb;  /* Change to any color: e.g. #059669 for green */
  --navy:      #0f2044;  /* Dark heading / hero background */
  ...
}
```

### Change Fonts
Replace the Google Fonts `<link>` in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=YOUR+FONT..." rel="stylesheet" />
```
Then update `--font-body` and `--font-display` in `:root`.

### Add a Real Profile Photo
Replace the avatar initials block in `index.html`:
```html
<!-- Find this: -->
<div class="avatar-ring">
  <div class="avatar-initials">SM</div>
</div>

<!-- Replace with: -->
<div class="avatar-ring" style="padding:0; overflow:hidden;">
  <img src="photo.jpg" alt="Santosh Mahato" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />
</div>
```

### Add a Resume Download
Find the "Download Resume" button in the About section and update the href:
```html
<a href="resume.pdf" download class="btn btn-primary mt-24">Download Resume</a>
```
Upload your `resume.pdf` to the root folder.

### Add More Projects
Copy a `<article class="project-card">` block in `index.html` and edit the content.

### Update Contact Form to Use a Backend
Replace the mailto JS logic in `js/main.js` with a fetch() call to:
- **Formspree**: https://formspree.io (free, easy)
- **EmailJS**: https://www.emailjs.com (no backend needed)
- Your own Node.js/Express endpoint

---

## ✅ Features

- **Fully responsive** — desktop, tablet, mobile
- **Smooth scroll** with navbar offset compensation
- **Active nav link** highlighting on scroll
- **Scroll reveal** animations (CSS transition, no library)
- **Mobile hamburger** menu with close-on-link-click
- **Form validation** — inline field errors + live blur validation
- **Mailto fallback** — opens mail client with pre-filled message
- **Semantic HTML** — proper heading hierarchy, aria labels
- **High contrast** — WCAG AA compliant color ratios
- **No external JS libraries** — pure vanilla, fast load

---

## 📞 Contact

Santosh Kumar Mahato  
📧 santoshkumarmahato284@gmail.com  
🔗 linkedin.com/in/santoshmah  
💻 github.com/SantoshMahat9
