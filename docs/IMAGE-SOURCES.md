# Selected Work Image Sources

Web masters for the homepage lead, the Selected Work cards, the portfolio and the Michigan Central Station case study. Each master is a 2400 x 1350 (16:9) progressive JPEG in `public/images/work/`. Next/Image serves AVIF and WebP at each device size from these files. Originals are not stored in the repo and were not altered.

| Ref | Web master | Source | Source size | Approved crop (left, top, right, bottom) | Type |
|---|---|---|---|---|---|
| FA005 | `mcs-grand-hall-wide.jpg` | Drive `1TUNnhfyvSigMvRnPy4scYiOD_bVzMPhg` | 4000 x 2250 | Full frame | Render |
| FA001 | `mcs-south-concourse.jpg` | Drive `1ISRxmrncgV9kT2WwaJReouQznL-UDyFE` | 4000 x 2250 | Full frame | Render |
| FA006 | `mcs-grand-hall-stage.jpg` | Drive `1lfXQHxz8VaCoXxwT8KFeh0UjQGh6secs` | 4000 x 2250 | Full frame | Render |
| NH-17 | `northline-heritage-hall.jpg` | Drive `1ChSlKkSiB8ki2cHtDeV_PSU0LCe4RdXW` | 4400 x 3000 | 0, 60, 4400, 2535 | Render |
| IG1007 | `bsb-homecoming-arena.jpg` (1080 x 608) | Daniel's Instagram export, BSB-Homecoming-Dusseldorf-Arena | 1080 x 810 | 0, 60, 1080, 668 | Photo |
| BSB-1 | `bsb-homecoming-hoverboards.jpg` (1920 x 1080) | BSB-1.webp, sent by Daniel; photographer not known, no credit line | 1920 x 1280 | 0, 60, 1920, 1140 | Photo |
| BSB-5 | `bsb-homecoming-full-bowl.jpg` (1920 x 1080) | BSB-5.webp, sent by Daniel; photographer not known, no credit line | 1920 x 1280 | 0, 110, 1920, 1190 | Photo |
| DE3769 | `bsb-homecoming-red-light.jpg` | Drive `1G1yvz-EgZTjbArBiV2iAKGH8yDvTHt9Z` (IMG_3769, original of the Instagram red light post) | 4284 x 5712 | 0, 1800, 4284, 4210 | Photo |
| IG0906 | `bsb-homecoming-cardington.jpg` (1080 x 608) | Daniel's Instagram export, BSB-Homecoming-Cardington-Systems-Test | 1080 x 667 | 0, 30, 1080, 638 | Photo |
| TC001 | `bsb-sphere-platform.jpg` | `public/images/66a0205.jpg` (unchanged) | 4200 x 2801 | 0, 219, 4200, 2581 | Photo |

Social card: `public/og/mcs-grand-hall.jpg` (FA005, 1200 x 675, full frame).

## Rules

- Show every image at its own 16:9 ratio. No portrait crops, no text over the picture.
- Label renders `RENDER` (`components/v2/render-label.tsx`). The station event is upcoming, so no render may read as a photo of a finished event.
- Image data and alt text live in `lib/work.ts`.

## Regenerating

```js
// sharp, from the repo root
sharp(src).extract(crop /* if any */).resize(2400, 1350).jpeg({ quality: 82, mozjpeg: true, progressive: true })
```
