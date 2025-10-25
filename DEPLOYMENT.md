# Deployment Guide - Elite Mobile Car Detailing

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database schema finalized
- [ ] Test booking flow thoroughly
- [ ] Verify Google Maps API working
- [ ] Social media links updated
- [ ] Services and pricing finalized
- [ ] Business information accurate
- [ ] SEO metadata reviewed
- [ ] Mobile responsiveness tested

## Option 1: Deploy to Vercel (Recommended)

### Why Vercel?
- Built for Next.js
- Automatic deployments
- Free SSL
- Global CDN
- Serverless functions
- Easy environment variables

### Steps:

1. **Push Code to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

2. **Connect to Vercel**
- Go to [vercel.com](https://vercel.com)
- Sign up/Login with GitHub
- Click "New Project"
- Import your repository
- Vercel will auto-detect Next.js

3. **Configure Environment Variables**
In Vercel dashboard, add all variables from `.env`:
```
DATABASE_URL
NEXTAUTH_URL
NEXTAUTH_SECRET
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
BUSINESS_ADDRESS
BUSINESS_LAT
BUSINESS_LNG
MILEAGE_RATE
NEXT_PUBLIC_INSTAGRAM_URL
NEXT_PUBLIC_TIKTOK_URL
NEXT_PUBLIC_AMAZON_AFFILIATE_TAG
```

4. **Update Database**
For production, you'll need a hosted database:

**Option A: Vercel Postgres (Recommended)**
- In Vercel dashboard, go to Storage
- Create Postgres database
- Copy connection string
- Update `DATABASE_URL` in environment variables
- Redeploy

**Option B: Neon (Free Tier Available)**
- Go to [neon.tech](https://neon.tech)
- Create new project
- Copy connection string
- Update `DATABASE_URL` in Vercel
- Redeploy

**Option C: PlanetScale**
- Go to [planetscale.com](https://planetscale.com)
- Create database
- Get connection string
- Update in Vercel

5. **Initialize Database**
After adding DATABASE_URL, in your local terminal:
```bash
# Connect to production database
DATABASE_URL="your-production-db-url" npx prisma db push
DATABASE_URL="your-production-db-url" npm run db:seed
```

6. **Deploy**
- Click "Deploy" in Vercel
- Wait for build to complete
- Visit your live site!

7. **Custom Domain** (Optional)
- In Vercel, go to Settings > Domains
- Add your custom domain
- Follow DNS configuration instructions
- Update `NEXTAUTH_URL` to your domain

## Option 2: Deploy to Netlify

1. **Build Settings**
- Build command: `npm run build`
- Publish directory: `.next`

2. **Environment Variables**
Add all variables from `.env` in Netlify dashboard

3. **Database**
Use Neon, PlanetScale, or Supabase (SQLite not supported)

## Option 3: Deploy to Railway

1. **Create Account**
- Go to [railway.app](https://railway.app)
- Connect GitHub

2. **New Project**
- Deploy from GitHub repo
- Add environment variables
- Railway will auto-detect Next.js

3. **Add Database**
- Railway offers PostgreSQL
- Click "New" > "Database" > "PostgreSQL"
- Connection string automatically added

## Option 4: Deploy to DigitalOcean App Platform

1. **Create App**
- Choose GitHub repository
- Detect Next.js

2. **Configure**
- Environment variables
- Choose plan ($5-12/month)

3. **Add Database**
- Managed PostgreSQL available
- Or connect external database

## Post-Deployment Tasks

### 1. Update URLs
Update hardcoded URLs in:
- `app/sitemap.ts`
- `app/robots.ts`
- `lib/schema.ts`
- `.env` (`NEXTAUTH_URL`)

### 2. Test Everything
- [ ] Homepage loads
- [ ] Booking form works
- [ ] Distance calculation works
- [ ] Admin dashboard accessible
- [ ] Database operations work
- [ ] Mobile view works
- [ ] Social links work

### 3. Set Up Monitoring
Consider adding:
- [Sentry](https://sentry.io) for error tracking
- [LogRocket](https://logrocket.com) for session replay
- Google Analytics for traffic
- [Uptime Robot](https://uptimerobot.com) for uptime monitoring

### 4. Email Notifications (Optional)
Integrate email service for booking confirmations:
- [Resend](https://resend.com) (Recommended for Next.js)
- [SendGrid](https://sendgrid.com)
- [Mailgun](https://mailgun.com)
- [AWS SES](https://aws.amazon.com/ses/)

### 5. Backup Strategy
- Automatic database backups (most providers offer this)
- Regular exports via Prisma Studio
- GitHub as code backup

### 6. Security
- [ ] HTTPS enabled (automatic with Vercel/Netlify)
- [ ] Environment variables secured
- [ ] API routes protected
- [ ] Admin routes protected (add auth)
- [ ] Database credentials secured
- [ ] Google Maps API restricted to domain

### 7. SEO Setup
- [ ] Google Search Console
  - Submit sitemap
  - Verify ownership
- [ ] Google My Business
  - Claim business
  - Add website link
- [ ] Bing Webmaster Tools
- [ ] Local directory listings

### 8. Performance Optimization
- [ ] Images optimized
- [ ] Next.js Image component used
- [ ] Lighthouse score checked
- [ ] Core Web Vitals optimized

## Troubleshooting

### Build Fails
- Check all dependencies installed
- Verify TypeScript errors resolved
- Check environment variables set

### Database Connection Fails
- Verify DATABASE_URL correct
- Check database is accessible
- Ensure Prisma schema pushed

### API Routes Don't Work
- Check serverless function limits
- Verify environment variables
- Check logs in deployment platform

### Google Maps Not Working
- Verify API key correct
- Check API enabled in Google Cloud
- Verify billing enabled
- Check domain restrictions

## Cost Estimates

### Vercel
- Hobby (Free): Perfect for starting
  - 100GB bandwidth
  - Serverless functions
  - Free SSL
- Pro ($20/month): For business
  - More resources
  - Team features

### Database
- **Vercel Postgres**: $20/month
- **Neon**: Free tier available, ~$20/month for production
- **PlanetScale**: Free tier, scales up
- **Supabase**: Free tier available

### Total Estimated Monthly Cost
- Starting: $0 (Free tiers)
- Small business: $20-40/month
- Growing: $50-100/month

## Scaling Considerations

As you grow:
1. Upgrade database plan for more storage/connections
2. Add caching (Redis) for better performance
3. Implement CDN for images
4. Add email queue for notifications
5. Consider separate API server if needed

## Support & Maintenance

### Regular Tasks
- Weekly: Check error logs
- Monthly: Review analytics
- Quarterly: Update dependencies
- As needed: Add new services/features

### Updates
```bash
# Update dependencies
npm update

# Update Prisma
npm install @prisma/client@latest prisma@latest
npx prisma generate

# Update Next.js
npm install next@latest react@latest react-dom@latest
```

## Emergency Contacts

Keep these handy:
- Hosting provider support
- Database provider support
- Domain registrar
- Google Maps API support

## Backup and Recovery

### Manual Backup
```bash
# Export database
npx prisma db pull
npx prisma studio # Export data manually

# Or use your database provider's backup tools
```

### Restore
```bash
# Push schema
npx prisma db push

# Import data via Prisma Studio or SQL
```

---

Need help? Check the main README.md for more information!
