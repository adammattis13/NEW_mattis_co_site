# Mattis&Co Website

**Capital. Clarity. Full Send.**

Battle-tested operators deploying capital and strategy with military precision.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Deployment**: Vercel (recommended)
- **Forms**: Ready for Resend integration

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to see your site.

## Project Structure

```
mattisco-web/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── about/          # About page
│   │   ├── approach/       # PE & Advisory approach
│   │   ├── board/          # Board & advisors
│   │   ├── careers/        # Careers page
│   │   ├── contact/        # Contact form
│   │   ├── insights/       # Blog/thought leadership
│   │   ├── media/          # Press & media
│   │   ├── memorial/       # Kevin J. Smith memorial
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   └── components/         # Reusable components
│       ├── Navigation.tsx  # Header navigation
│       └── Footer.tsx      # Footer
├── public/
│   └── assets/            # Static assets (logos, images)
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## Design System

### Colors
- **Primary Black**: `#000000` (mattis-black)
- **Primary White**: `#FFFFFF` (mattis-white)
- **Accent Lime**: `#BADA55` (mattis-lime)
- **Lime Dark**: `#A5C54A` (mattis-lime-dark)
- **Charcoal**: `#1C1C1C` (mattis-charcoal)
- **Gray**: `#808080` (mattis-gray)

### Typography
- **Display**: Bebas Neue (headlines, large text)
- **Body**: Inter (body text)
- **Mono**: Inter (monospace elements)

### Key Components
- Speed slash accents (`slash-accent` class)
- Speed lines background effect
- Diagonal cut motifs (inspired by logo)
- Military-inspired precision layouts

## Key Pages

### Home (`/`)
- Hero with tagline
- Value propositions
- Quick stats
- CTA sections

### Memorial (`/memorial`)
- Dedicated page for 1st Lt. Kevin J. Smith
- Minimal navigation
- Link to scholarship fund

### Contact (`/contact`)
- Contact form (ready for email integration)
- Contact information
- Area of interest selection

### About (`/about`)
- Mission statement
- Core beliefs
- Team/leadership bios

### Approach (`/approach`)
- PE strategy details
- Advisory services
- Investment themes

## Next Steps

### Immediate
1. **Replace placeholder content**:
   - Add Kevin's photo to `/public/assets/kevin-smith.jpg`
   - Update team photos in `/public/assets/`
   - Add real bios to board page

2. **Email integration**:
   - Set up Resend account
   - Add API key to `.env.local`
   - Implement email handler in `/contact/page.tsx`

3. **SEO optimization**:
   - Add meta descriptions
   - Create sitemap
   - Set up analytics

### Future Enhancements
- Blog/CMS integration for Insights
- Case studies section
- Investment thesis deep-dives
- Portfolio company showcase

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repo in Vercel
3. Vercel auto-detects Next.js
4. Deploy!

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Environment Variables

Create `.env.local`:

```bash
# Email (Resend)
RESEND_API_KEY=your_key_here

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_ga_id
```

## Brand Guidelines

- **Tagline**: "Capital. Clarity. Full Send."
- **Alt tagline** (if preferred): "Throttle Up. Capital. Clarity. Edge."
- **Tone**: F1/Supercross aggression meets military precision
- **Core values**: Mission-first, long-term hold, operational excellence, full transparency

## Support

Contact: info@mattisco.com
Phone: 814.232.7404
Location: Raleigh, NC

---

**In memory of 1st Lt. Kevin J. Smith**  
West Point '02 • 1-76 FA, 3rd Infantry Division • KIA 8 Dec 2005, Baghdad

*Rest easy, KJ. We have the watch.*
