export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://yourdomain.com',
    name: 'Elite Mobile Car Detailing',
    image: 'https://yourdomain.com/logo.png',
    description: 'Professional mobile car detailing and valeting services in Surrey, UK. We come to you!',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Surrey',
      addressLocality: 'Surrey',
      addressRegion: 'England',
      postalCode: 'XXXXX',
      addressCountry: 'GB'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.3148,
      longitude: -0.5600
    },
    url: 'https://yourdomain.com',
    telephone: '+447123456789',
    priceRange: '££',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '09:00',
        closes: '16:00'
      }
    ],
    sameAs: [
      process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
      process.env.NEXT_PUBLIC_TIKTOK_URL || ''
    ].filter(Boolean)
  }
}

export function generateServiceSchema(service: {
  name: string
  description: string
  price: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Elite Mobile Car Detailing'
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 51.3148,
        longitude: -0.5600
      },
      geoRadius: '20000' // 20km
    },
    offers: {
      '@type': 'Offer',
      price: service.price,
      priceCurrency: 'GBP'
    }
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}
