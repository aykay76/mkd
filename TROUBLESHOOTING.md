# 🔧 Troubleshooting Guide

Common issues and their solutions.

## Installation Issues

### ❌ `npm install` fails

**Problem**: Dependency installation errors

**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install

# If still fails, try:
npm install --legacy-peer-deps
```

### ❌ TypeScript errors everywhere

**Problem**: Red squiggly lines in VSCode

**Solution**: This is normal! TypeScript errors appear before installing dependencies.
```bash
npm install
```
After installation, errors will resolve.

## Database Issues

### ❌ Prisma Client errors

**Problem**: `@prisma/client` not found

**Solution**:
```bash
npx prisma generate
npx prisma db push
```

### ❌ Database file not found

**Problem**: `Error: SQLITE_CANTOPEN: unable to open database file`

**Solution**:
```bash
# Create database
npx prisma db push

# Seed data
npm run db:seed
```

### ❌ Seeding fails

**Problem**: Error running seed script

**Solution**:
```bash
# Make sure ts-node is installed
npm install -D ts-node

# Try running seed directly
npx ts-node prisma/seed.ts
```

## Google Maps Issues

### ❌ Distance calculation not working

**Problem**: Always returns default distance or error

**Checklist**:
1. ✅ API key set in `.env`?
2. ✅ Geocoding API enabled in Google Cloud?
3. ✅ Billing enabled on Google Cloud?
4. ✅ API key restrictions not too tight?

**Solution**:
```bash
# Check .env file
cat .env | grep GOOGLE

# Should see:
# NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="AIza..."
```

**Enable API**:
1. Go to https://console.cloud.google.com/
2. Select your project
3. Go to "APIs & Services" > "Library"
4. Search "Geocoding API"
5. Click "Enable"
6. Check billing is set up

### ❌ "This API key is not authorized"

**Problem**: API key restrictions too strict

**Solution**:
1. Go to Google Cloud Console
2. APIs & Services > Credentials
3. Click your API key
4. Under "Application restrictions":
   - For dev: Select "None"
   - For production: Add your domain
5. Save

## Booking Issues

### ❌ Booking form submits but nothing happens

**Problem**: API route not working

**Checklist**:
1. Check browser console for errors (F12)
2. Check Network tab for failed requests
3. Verify database is set up

**Solution**:
```bash
# Check database
npx prisma studio

# Check if services exist
# Should see services table with data
```

### ❌ Pricing shows £0.00

**Problem**: Service or distance calculation failed

**Solutions**:
1. Check if services are seeded:
```bash
npm run db:seed
```

2. Check if postcode is valid UK postcode
3. Check Google Maps API is working

### ❌ Customer already exists error

**Problem**: Duplicate email

**Solution**: This is normal! The system updates the existing customer. If it's an error, check your email spelling.

## Development Server Issues

### ❌ Port 3000 already in use

**Problem**: Another process using port 3000

**Solutions**:
```bash
# Kill process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### ❌ Changes not reflecting

**Problem**: Browser cache or dev server not updating

**Solutions**:
1. Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
2. Clear browser cache
3. Restart dev server:
```bash
# Press Ctrl+C to stop
npm run dev
```

### ❌ Page not found (404)

**Problem**: Routing issue

**Check**:
- File is in correct location (`app/page.tsx` for homepage)
- No typos in folder names
- Restart dev server

## Environment Variable Issues

### ❌ `process.env.X` is undefined

**Problem**: Environment variables not loading

**Solutions**:
```bash
# 1. Check .env file exists
ls -la .env

# 2. Restart dev server (MUST restart after changing .env)
npm run dev

# 3. For client-side variables, must start with NEXT_PUBLIC_
# ✅ NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
# ❌ GOOGLE_MAPS_API_KEY
```

### ❌ NEXTAUTH_SECRET not set

**Problem**: Need to generate secret

**Solution**:
```bash
# Generate random secret
openssl rand -base64 32

# Copy output to .env
# NEXTAUTH_SECRET="paste-output-here"
```

## Build Issues

### ❌ `npm run build` fails

**Problem**: Build errors

**Common causes**:
1. TypeScript errors - fix them first
2. Missing environment variables
3. Database connection issues

**Solution**:
```bash
# Check for TS errors
npm run lint

# Fix errors, then:
npm run build
```

### ❌ Out of memory error

**Problem**: Not enough memory during build

**Solution**:
```bash
# Increase Node memory
NODE_OPTIONS="--max_old_space_size=4096" npm run build
```

## Admin Dashboard Issues

### ❌ Stats showing 0 for everything

**Problem**: No data in database

**Solutions**:
```bash
# 1. Seed the database
npm run db:seed

# 2. Create a test booking through the form

# 3. Check database
npx prisma studio
```

### ❌ Recent bookings not showing

**Problem**: API endpoint issue

**Check**:
1. Browser console for errors
2. Network tab for failed API calls
3. Server terminal for error messages

## Deployment Issues

### ❌ Build succeeds locally but fails on Vercel

**Problem**: Environment differences

**Solutions**:
1. Check all env variables set in Vercel
2. Make sure `DATABASE_URL` points to production DB
3. Check Node version matches:
```json
// In package.json, add:
"engines": {
  "node": "18.x"
}
```

### ❌ Database connection fails in production

**Problem**: Wrong connection string or database not accessible

**Checklist**:
1. ✅ Production database created?
2. ✅ Connection string updated in hosting env vars?
3. ✅ Database accessible from hosting platform?
4. ✅ Ran `prisma db push` on production DB?

**Solution**:
```bash
# Connect to production DB locally and push schema
DATABASE_URL="your-production-url" npx prisma db push
DATABASE_URL="your-production-url" npm run db:seed
```

### ❌ Images not loading

**Problem**: Image paths incorrect

**Solution**:
- Use Next.js Image component
- Put images in `public/` folder
- Reference as `/image.png` not `./image.png`

### ❌ API routes return 404 in production

**Problem**: Routes not being detected

**Solution**:
- Ensure files are in `app/api/` directory
- Named `route.ts` not `route.tsx`
- Export `GET`, `POST`, etc. properly

## Performance Issues

### ❌ Site loading slowly

**Optimization**:
1. Use Next.js Image component for images
2. Enable caching for API routes
3. Consider database indexing
4. Use CDN for static assets

### ❌ Distance calculation taking too long

**Solutions**:
1. Add loading indicator (already included)
2. Cache results for same postcode
3. Consider batch geocoding for frequent addresses

## Email/Notification Issues

**Note**: Email functionality is not yet implemented. To add:

```bash
npm install resend  # Or your preferred email service
```

Then create email templates and API routes.

## Mobile Issues

### ❌ Form not working on mobile

**Check**:
1. Input types correct (`type="tel"` for phone, etc.)
2. Viewport meta tag present (already in layout)
3. Touch targets large enough (buttons 44x44px minimum)

### ❌ Layout broken on mobile

**Solution**:
- Use browser dev tools mobile view to debug
- Check Tailwind responsive classes (`md:`, `lg:`)
- Test on real devices

## Getting Help

### Still stuck?

1. **Check error messages carefully** - They usually tell you what's wrong

2. **Check browser console** (F12) - Look for red errors

3. **Check server terminal** - Errors might be server-side

4. **Search the error** - Copy exact error message to Google

5. **Check documentation**:
   - Next.js: https://nextjs.org/docs
   - Prisma: https://prisma.io/docs
   - Tailwind: https://tailwindcss.com/docs

6. **Verify basics**:
   ```bash
   # Dependencies installed?
   ls node_modules
   
   # Database exists?
   ls prisma/*.db
   
   # Environment variables set?
   cat .env
   ```

## Quick Fixes

Most problems can be solved by:

```bash
# 1. Clean restart
rm -rf node_modules package-lock.json .next
npm install
npx prisma generate
npm run dev

# 2. Reset database
rm prisma/*.db
npx prisma db push
npm run db:seed

# 3. Clear browser
# Hard refresh or open incognito mode
```

## Common Error Messages Explained

### "Cannot find module 'X'"
- **Cause**: Package not installed
- **Fix**: `npm install X`

### "Prisma Client did not initialize"
- **Cause**: Need to generate Prisma Client
- **Fix**: `npx prisma generate`

### "Invalid hook call"
- **Cause**: Using hooks incorrectly or version mismatch
- **Fix**: Ensure `'use client'` at top of file for client components

### "Hydration failed"
- **Cause**: Server and client rendering mismatch
- **Fix**: Check for dynamic content (dates, random numbers) without proper handling

### "ECONNREFUSED" or "ETIMEDOUT"
- **Cause**: Cannot connect to database or API
- **Fix**: Check connection strings, network, firewall

## Prevention Tips

✅ **Always restart dev server after changing `.env`**
✅ **Run `npx prisma generate` after schema changes**
✅ **Test in incognito mode to avoid cache issues**
✅ **Check browser console regularly during development**
✅ **Commit often to git so you can revert if needed**

---

**Still having issues?** Create a GitHub issue or check the documentation files included in this project.
