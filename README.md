# TC Technical Direction - Boutique Powerhouse Website

A modern, premium website for executive-level technical direction, production management, and design services.

## Features

- 🎨 **Minimal Black/White Aesthetic** with electric blue accent color
- 🎬 **Full-Screen Hero** with video background and bold headline
- 📊 **Interactive Slide Deck** overlay with 10 professional slides
- 🛠️ **Services Grid** showcasing 8 core service offerings
- 🏆 **Case Studies** with client logos and featured project
- 🎯 **Bold Footer** with oversized typography and unique layout
- 🍪 **Cookie Banner** for compliance
- ✨ **Smooth Animations** powered by Framer Motion
- 📱 **Fully Responsive** mobile-first design
- ♿ **Accessible** WCAG compliant with high contrast
- 📈 **Analytics Ready** Google Analytics & Tag Manager integration

## Tech Stack

- **React 18** - Modern UI library
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Icons** - Professional icon set

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The site will be available at `http://localhost:5173`

## Customization

### 1. Accent Color

Change the accent color in `tailwind.config.js`:

```js
accent: {
  DEFAULT: '#00D9FF', // Electric blue (default)
  orange: '#FF6B35', // Neon orange (alternative)
}
```

To use orange instead of blue, update the Tailwind classes from `text-accent` to `text-accent-orange`.

### 2. Content

Update content in the following files:
- `src/components/Hero.jsx` - Hero headline and CTAs
- `src/components/DeckOverlay.jsx` - Slide deck content
- `src/components/Services.jsx` - Services descriptions
- `src/components/CaseStudies.jsx` - Client logos and case study
- `src/components/Footer.jsx` - Contact info and social links

### 3. Video Background

Add your hero video to `/public/hero-video.mp4` and uncomment the video tag in `src/components/Hero.jsx` (line 23-28).

### 4. Client Logos

Add logo images to `/public/clients/` and update the client array in `src/components/CaseStudies.jsx`.

### 5. Google Analytics

Add your GA4 measurement ID in `index.html` (line 18):

```js
gtag('config', 'G-XXXXXXXXXX');
```

### 6. Deck PDF

Add your presentation deck PDF to `/public/deck.pdf` and update the download handler in `src/components/Hero.jsx`.

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Drag and drop the 'dist' folder to Netlify
```

### Other Platforms

Build the site and deploy the `dist` folder:

```bash
npm run build
```

## Performance Optimization

The site is optimized for performance:
- ✅ Code splitting with Vite
- ✅ Lazy loading for images
- ✅ Minimal bundle size
- ✅ Tree-shaking enabled
- ✅ Font preloading

## Accessibility

- High contrast colors (black/white/accent)
- Semantic HTML throughout
- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader friendly

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome)

## License

© 2025 TC Technical Direction. All rights reserved.

## Support

For issues or questions, contact: hello@tctech.com
