# Elite Mobile Car Detailing - Quick Start Guide

## 🚀 Quick Setup (5 Minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Environment File
```bash
cp .env.example .env
```

### 3. Update Your .env File
At minimum, update these:
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Your Google Maps API key
- `BUSINESS_LAT` and `BUSINESS_LNG` - Your business coordinates
- Social media URLs

### 4. Initialize Database
```bash
npx prisma db push
npm run db:seed
```

### 5. Run Development Server
```bash
npm run dev
```

Visit http://localhost:3000 🎉

## 📋 Next Steps

### 1. Customize Your Branding
- Update business name in `app/page.tsx` and `app/layout.tsx`
- Change colors in `tailwind.config.js`
- Add your logo to `public/` folder

### 2. Configure Services
- Services are seeded automatically
- Edit via admin dashboard at `/admin`
- Or modify `prisma/seed.ts` and re-run

### 3. Set Up Google Maps
1. Go to https://console.cloud.google.com/
2. Create project
3. Enable "Geocoding API" and "Maps JavaScript API"
4. Create API key
5. Add to `.env`

### 4. Get Your Business Coordinates
Use https://www.latlong.net/ to find your exact location

### 5. Amazon Affiliate
1. Sign up at https://affiliate-program.amazon.co.uk/
2. Get your affiliate tag
3. Add to `.env`
4. Add products via admin panel

## 🎯 Key Features to Test

1. **Homepage** - http://localhost:3000
2. **Book Appointment** - http://localhost:3000/book
3. **Admin Dashboard** - http://localhost:3000/admin

## 📱 Social Media Setup

Update these in your `.env`:
```env
NEXT_PUBLIC_INSTAGRAM_URL="https://instagram.com/yourhandle"
NEXT_PUBLIC_TIKTOK_URL="https://tiktok.com/@yourhandle"
```

## 💰 Pricing Configuration

- **Base service prices** - Set in admin panel or seed file
- **Mileage rate** - Set in `.env` (default: £0.45/mile)
- **Free mileage** - First 10 miles free (change in API routes)

## 🔧 Common Commands

```bash
# Development
npm run dev

# Database
npm run db:push      # Apply schema changes
npm run db:seed      # Seed initial data
npm run db:studio    # Open Prisma Studio

# Production
npm run build
npm start
```

## 📊 Database Management

Use Prisma Studio for visual database management:
```bash
npm run db:studio
```

Opens at http://localhost:5555

## 🐛 Troubleshooting

### Distance calculation not working?
- Check Google Maps API key is valid
- Ensure Geocoding API is enabled
- Check API has credits/billing enabled

### Can't access admin?
- Admin auth will be added in production
- For now, `/admin` is accessible directly

### Services not showing?
- Run `npm run db:seed` to add sample services
- Or add via admin panel

## 📦 Deployment

### Deploy to Vercel (Easiest)
1. Push code to GitHub
2. Connect repository in Vercel
3. Add environment variables
4. Deploy!

### Database for Production
- Vercel: Use Vercel Postgres or Neon
- Update `DATABASE_URL` in production env
- Run `npx prisma db push` after connecting

## 🎨 Customization Tips

### Change Color Scheme
Edit `tailwind.config.js` - the `primary` color:
```js
primary: {
  500: '#0ea5e9',  // Main brand color
  600: '#0284c7',  // Darker shade
  // ... etc
}
```

### Add More Services
Via admin panel or edit `prisma/seed.ts`

### Change Free Mileage
Edit in `app/api/calculate-distance/route.ts` and `app/api/bookings/route.ts`:
```ts
const chargableMiles = Math.max(0, distanceMiles - 10) // Change 10 to your value
```

## 📞 Support Resources

- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs
- Tailwind Docs: https://tailwindcss.com/docs
- Google Maps API: https://developers.google.com/maps

## ✅ Launch Checklist

Before going live:
- [ ] Add real business details
- [ ] Update all placeholder content
- [ ] Set up Google Maps API properly
- [ ] Configure social media links
- [ ] Add real services and pricing
- [ ] Test booking flow end-to-end
- [ ] Set up admin authentication
- [ ] Add email notifications
- [ ] Set up analytics (Google Analytics)
- [ ] Test on mobile devices
- [ ] Update domain in sitemap.ts and robots.ts
- [ ] Add SSL certificate
- [ ] Set up backups

Enjoy your new website! 🚗✨
