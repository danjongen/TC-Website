# Deployment Guide

## Quick Start Checklist

Before deploying, ensure you've completed these steps:

### Content
- [ ] Replace hero video (`/public/hero-video.mp4`)
- [ ] Update headlines in `src/components/Hero.jsx`
- [ ] Customize slide deck content in `src/components/DeckOverlay.jsx`
- [ ] Add client logos to `/public/clients/`
- [ ] Update case study in `src/components/CaseStudies.jsx`
- [ ] Add presentation deck PDF to `/public/deck.pdf`
- [ ] Update contact info in `src/components/Footer.jsx`

### Branding
- [ ] Choose accent color (electric blue or neon orange) in `tailwind.config.js`
- [ ] Update favicon in `/public/favicon.svg`
- [ ] Update meta description in `index.html`

### Analytics & Tracking
- [ ] Add Google Analytics 4 measurement ID in `index.html`
- [ ] Configure Google Tag Manager (optional)
- [ ] Set up conversion tracking for "Download deck" event
- [ ] Test analytics in preview mode

### Legal & Compliance
- [ ] Create Privacy Policy page (`/public/privacy.html`)
- [ ] Create Terms of Service page (`/public/terms.html`)
- [ ] Create Accessibility Statement (`/public/accessibility.html`)
- [ ] Test cookie banner functionality

### Testing
- [ ] Test on mobile devices (iOS/Android)
- [ ] Test on desktop browsers (Chrome, Firefox, Safari)
- [ ] Verify all links work
- [ ] Test slide deck navigation (keyboard + mouse)
- [ ] Verify smooth scroll behavior
- [ ] Test form submissions
- [ ] Check page load performance (Lighthouse)

## Platform-Specific Instructions

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow prompts to link to your Vercel account

4. For production:
```bash
vercel --prod
```

**Environment Variables (if needed):**
- Add in Vercel dashboard under Project Settings > Environment Variables

### Netlify

1. Build locally:
```bash
npm run build
```

2. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

3. Deploy:
```bash
netlify deploy
```

4. For production:
```bash
netlify deploy --prod
```

**Build Settings:**
- Build command: `npm run build`
- Publish directory: `dist`

### Custom Server / VPS

1. Build the site:
```bash
npm run build
```

2. Upload `dist` folder to your server

3. Configure web server (Nginx example):
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/tc-website/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

4. Set up SSL with Let's Encrypt:
```bash
sudo certbot --nginx -d yourdomain.com
```

## Performance Optimization

### Image Optimization
- Use WebP format for images when possible
- Compress images before uploading
- Add `loading="lazy"` to images below the fold

### Video Optimization
- Compress hero video (target: < 5MB)
- Use H.264 codec for best compatibility
- Add poster image for video element

### CDN Configuration
- Enable CDN caching for static assets
- Set appropriate cache headers
- Use edge caching for global performance

## Post-Deployment

1. **Test Live Site:**
   - Check all pages load correctly
   - Verify analytics are tracking
   - Test form submissions
   - Check mobile responsiveness

2. **Monitor Performance:**
   - Run Google PageSpeed Insights
   - Check Core Web Vitals
   - Monitor analytics dashboard

3. **SEO Setup:**
   - Submit sitemap to Google Search Console
   - Verify meta tags are correct
   - Set up Google Business Profile (if applicable)

## Troubleshooting

### Issue: White screen on deployment
- Check browser console for errors
- Verify all assets are loading correctly
- Check build logs for errors

### Issue: Video not playing
- Verify video file exists in `/public`
- Check video codec compatibility
- Test with poster image fallback

### Issue: Analytics not tracking
- Verify GA4 measurement ID is correct
- Check cookie consent is accepted
- Use Google Analytics DebugView to test

## Support

For deployment issues, contact your development team or refer to:
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Deployment Docs](https://react.dev/learn/start-a-new-react-project#deploying-to-production)
