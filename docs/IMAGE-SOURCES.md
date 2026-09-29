# Selected Work Image Sources

Web masters for the homepage lead, the Selected Work cards, the portfolio and the Michigan Central Station case study. Each master is a 2400 x 1350 (16:9) progressive JPEG in `public/images/work/`. Next/Image serves AVIF and WebP at each device size from these files. Originals are not stored in the repo and were not altered.

| Ref | Web master | Source | Source size | Approved crop (left, top, right, bottom) | Type |
|---|---|---|---|---|---|
| FA005 | `mcs-grand-hall-wide.jpg` | Drive `1TUNnhfyvSigMvRnPy4scYiOD_bVzMPhg` | 4000 x 2250 | Full frame | Render |
| FA001 | `mcs-south-concourse.jpg` | Drive `1ISRxmrncgV9kT2WwaJReouQznL-UDyFE` | 4000 x 2250 | Full frame | Render |
| FA006 | `mcs-grand-hall-stage.jpg` | Drive `1lfXQHxz8VaCoXxwT8KFeh0UjQGh6secs` | 4000 x 2250 | Full frame | Render |
| NH-17 | `northline-heritage-hall.jpg` | Drive `1ChSlKkSiB8ki2cHtDeV_PSU0LCe4RdXW` | 4400 x 3000 | 0, 60, 4400, 2535 | Render |
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
