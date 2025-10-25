# Elite Mobile Car Detailing Website

A comprehensive full-stack website for a mobile car detailing business in Surrey, UK. Built with Next.js 14, TypeScript, Prisma, and Tailwind CSS.

## Features

### Customer-Facing Features
- **Homepage** with service showcase and business information
- **Service Catalog** with detailed pricing and descriptions
- **Online Booking System** with:
  - Customer information form
  - Address input with postcode
  - Automatic distance calculation from business location
  - Dynamic pricing based on distance (mileage charges)
  - Date and time selection
  - Service selection
- **Social Media Integration** - Links to Instagram and TikTok
- **Amazon Affiliate Product Recommendations**
- **SEO Optimization** with meta tags and structured data
- **Responsive Design** - Works on all devices

### Admin Dashboard Features
- **Dashboard Overview** with key business metrics:
  - Total bookings
  - Pending/completed bookings
  - Revenue tracking
  - Customer count
- **Booking Management**
  - View all bookings
  - Update booking status
  - Add internal notes
  - Track completion
- **Customer Management**
  - Customer database
  - Booking history per customer
  - Contact information
- **Service Management**
  - Add/edit/delete services
  - Set pricing and duration
  - Organize by categories
- **Expense Tracking**
  - Record business expenses
  - Categorize expenses
  - Date tracking
- **Financial Reports**
  - Income vs expenses
  - Monthly revenue
  - Profit analysis
- **Settings**
  - Manage social media links
  - Update Amazon affiliate products
  - Configure business details

## Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** SQLite (via Prisma ORM)
- **Authentication:** NextAuth.js (for admin)
- **Maps/Geocoding:** Google Maps API
- **Icons:** Lucide React
- **Charts:** Recharts

## Installation & Setup

### Prerequisites
- Node.js 18+ installed
- A Google Maps API key (for geocoding and distance calculation)

### Step 1: Install Dependencies

```bash
cd /Users/vanilla/git/aykay76/mkd
npm install
```

### Step 2: Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and update the following:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-secure-random-string-here"

# Google Maps API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-google-maps-api-key"

# Business Location (update with your actual location)
BUSINESS_ADDRESS="Your Business Address, Surrey, UK"
BUSINESS_LAT="51.3148"
BUSINESS_LNG="-0.5600"

# Mileage Rate (per mile in GBP)
MILEAGE_RATE="0.45"

# Social Media
NEXT_PUBLIC_INSTAGRAM_URL="https://instagram.com/yourhandle"
NEXT_PUBLIC_TIKTOK_URL="https://tiktok.com/@yourhandle"

# Amazon Affiliate
NEXT_PUBLIC_AMAZON_AFFILIATE_TAG="your-amazon-affiliate-tag"
```

### Step 3: Set Up Database

Initialize the database with Prisma:

```bash
npx prisma db push
```

### Step 4: Seed Initial Data (Optional)

Create a seed script to add initial services:

```bash
npx prisma db seed
```

Or manually add services through the admin panel after setup.

### Step 5: Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your website!

## Getting Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Geocoding API"
4. Create credentials (API Key)
5. Restrict the key to your domain for security
6. Add the key to your `.env` file

## Amazon Affiliate Setup

1. Sign up for [Amazon Associates](https://affiliate-program.amazon.co.uk/)
2. Get your affiliate tag/ID
3. Add products to your database via admin panel
4. Include affiliate tag in product URLs

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean
- AWS

**Note:** For production, consider upgrading from SQLite to PostgreSQL for better performance and scalability.

## Project Structure

```
mkd/
├── app/
│   ├── api/              # API routes
│   │   ├── bookings/     # Booking endpoints
│   │   ├── services/     # Service endpoints
│   │   ├── calculate-distance/
│   │   └── admin/        # Admin endpoints
│   ├── admin/            # Admin dashboard pages
│   ├── book/             # Booking page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── prisma/
│   └── schema.prisma     # Database schema
├── public/               # Static assets
├── .env                  # Environment variables
├── package.json
└── README.md
```

## Key Features Explained

### Distance Calculation
The system calculates the distance between your business location and the customer's address using:
1. Google Geocoding API to convert postcode to coordinates
2. Haversine formula to calculate distance
3. Mileage charges applied for distances over 10 miles

### Booking Flow
1. Customer fills out booking form
2. System geocodes customer address
3. Calculates distance and mileage cost
4. Shows pricing breakdown
5. Creates customer record (or updates existing)
6. Creates booking with all details
7. Sends confirmation (email integration can be added)

### Admin Capabilities
- Real-time dashboard with business metrics
- Manage all bookings (confirm, complete, cancel)
- Track customers and their booking history
- Add/edit services and pricing
- Record and categorize expenses
- View financial reports
- Configure website settings

## Customization

### Branding
- Update colors in `tailwind.config.js`
- Replace "Elite Detailing" with your business name
- Add your logo in `public/` folder

### Services
Add your services through admin panel or directly in database

### Pricing
- Adjust `MILEAGE_RATE` in `.env`
- Change free mileage threshold in API routes (currently 10 miles)

## TODO / Future Enhancements

- [ ] Email notifications (booking confirmations, reminders)
- [ ] SMS notifications via Twilio
- [ ] Payment integration (Stripe)
- [ ] Customer portal (view bookings, rebook)
- [ ] Photo gallery of completed work
- [ ] Customer reviews and ratings
- [ ] Mobile app
- [ ] Calendar view for admin
- [ ] Automated booking confirmations
- [ ] WhatsApp integration

## Support

For issues or questions:
1. Check the documentation
2. Review error logs
3. Ensure all environment variables are set
4. Verify Google Maps API is enabled and has credits

## License

This project is private and proprietary. All rights reserved.

## Credits

Built with:
- Next.js
- Tailwind CSS
- Prisma
- Lucide Icons
- Google Maps API
