# Content Guide

This guide helps you customize all the content on your TC Technical Direction website.

## Hero Section

**Location:** `src/components/Hero.jsx`

### Main Headline
Current: "We deliver A++ technical direction at executive level"

Customize lines 41-43:
```jsx
<h1>
  Your custom headline with <span className="text-accent">highlighted</span> text
</h1>
```

### Subheadline
Current: "Production management, design, and technical excellence..."

Customize lines 49-52.

### Call-to-Action Buttons
- "Explore our services" - links to #services
- "Download deck" - triggers download event

## Slide Deck Content

**Location:** `src/components/DeckOverlay.jsx`

The deck has 10 slides. Each slide has:
- `title` - Main headline
- `subtitle` - Supporting text
- `content` - Body paragraph
- `icon` - Emoji (optional)

**Current Slides:**
1. Strategic Excellence
2. Production Management
3. Design & Innovation
4. Aerial Surveying
5. 3D Scanning & Modeling
6. Unreal Engine Visualizations
7. Equipment Rentals
8. Training & IP
9. Proven Track Record
10. Let's Build Together

**To customize:** Edit the `slides` array (lines 6-60)

**Slide Template:**
```jsx
{
  title: 'Your Title',
  subtitle: 'Your Subtitle',
  content: 'Your detailed description goes here.',
  icon: '🎯' // Any emoji
}
```

## Services Section

**Location:** `src/components/Services.jsx`

8 service cards with:
- Icon (React Icons)
- Title
- Tagline (appears in accent color)
- Description

**Current Services:**
1. Technical Direction
2. Production Management
3. Design
4. Aerial Surveying
5. 3D Scanning & Modeling
6. Unreal Visualizations
7. Equipment Rentals
8. Training & IP

**To customize:** Edit the `services` array (lines 14-63)

**Available Icons:** Browse [React Icons](https://react-icons.github.io/react-icons/) and import from `'react-icons/fi'`

## Client Logos

**Location:** `src/components/CaseStudies.jsx`

**Current Clients:**
- Backstreet Boys (Entertainment)
- Gwen Stefani (Entertainment)
- Jelly Roll (Entertainment)
- Ford (Automotive)
- Google (Technology)
- OpenAI (Technology)

**To add logo images:**
1. Add logo files to `/public/clients/` (PNG/SVG recommended)
2. Update the `clients` array (lines 5-12)
3. Replace text with image:

```jsx
{
  name: 'Client Name',
  category: 'Industry',
  logo: '/clients/client-logo.png' // Add this
}
```

Then update the render to use `<img src={client.logo} />` instead of text.

## Featured Case Study

**Location:** `src/components/CaseStudies.jsx`

**Current Case Study:** Major Touring Production

Customize lines 14-26:
```jsx
const featuredCase = {
  client: 'Your Client Name',
  title: 'Project Title',
  challenge: 'What was the problem?',
  solution: 'How did you solve it?',
  result: 'What was the outcome?',
  stats: [
    { value: '50+', label: 'Metric 1' },
    { value: '100%', label: 'Metric 2' },
    // Add 2-4 stats
  ]
}
```

**To add case study image:**
1. Add image to `/public/case-studies/`
2. Add to component:
```jsx
<img src="/case-studies/featured.jpg" alt="Project name" />
```

## Footer

**Location:** `src/components/Footer.jsx`

### Contact Information
Lines 22-38 - Update email and phone:
```jsx
<a href="mailto:your@email.com">your@email.com</a>
<a href="tel:+1234567890">+1 (234) 567-890</a>
```

### Social Media Links
Lines 79-84 - Update social URLs:
```jsx
{ icon: FiLinkedin, href: 'https://linkedin.com/company/yourcompany' }
{ icon: FiInstagram, href: 'https://instagram.com/yourhandle' }
{ icon: FiTwitter, href: 'https://twitter.com/yourhandle' }
```

### Quick Links
Lines 56-66 - Add/remove navigation links

### Newsletter Form
Lines 48-58 - Currently a placeholder. To make functional:
1. Add form handler
2. Connect to email service (Mailchimp, ConvertKit, etc.)
3. Update submit action

## Color Scheme

**Location:** `tailwind.config.js`

### Choose Your Accent Color

**Option 1: Electric Blue (Default)**
```js
accent: {
  DEFAULT: '#00D9FF', // Current
}
```

**Option 2: Neon Orange**
```js
accent: {
  DEFAULT: '#FF6B35', // Alternative
}
```

**Custom Color:**
```js
accent: {
  DEFAULT: '#YOUR_HEX_CODE',
}
```

## Meta Information

**Location:** `index.html`

Update SEO metadata (lines 6-8):
```html
<meta name="description" content="Your custom description" />
<title>Your Company Name | Tagline</title>
```

## Analytics

**Location:** `index.html` (line 18)

Add your Google Analytics 4 ID:
```js
gtag('config', 'G-XXXXXXXXXX'); // Replace with your ID
```

## Legal Pages

Create these files in `/public/`:

### Privacy Policy
`/public/privacy.html` - Template:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Privacy Policy</title>
</head>
<body>
  <h1>Privacy Policy</h1>
  <!-- Add your privacy policy content -->
</body>
</html>
```

### Terms of Service
`/public/terms.html`

### Accessibility Statement
`/public/accessibility.html`

## Media Assets Needed

### Critical
- [ ] Hero background video: `/public/hero-video.mp4` (< 5MB, MP4 format, 1920x1080)
- [ ] Presentation deck PDF: `/public/deck.pdf`
- [ ] Favicon: Already provided at `/public/favicon.svg`

### Optional
- [ ] Client logos: `/public/clients/*.png`
- [ ] Case study images: `/public/case-studies/*.jpg`
- [ ] Service images: `/public/services/*.jpg`
- [ ] Video poster image: `/public/hero-poster.jpg` (fallback)

## Best Practices

1. **Keep text concise** - Short, punchy headlines work best
2. **High contrast** - Ensure readability on black/white
3. **Optimize images** - Compress before uploading
4. **Test on mobile** - Check responsive behavior after changes
5. **Maintain brand voice** - Confident, professional, lean

## Need Help?

- Check component comments for inline guidance
- Refer to `README.md` for technical setup
- See `DEPLOYMENT.md` for deployment steps
