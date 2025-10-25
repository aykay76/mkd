import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create initial services
  const services = [
    {
      name: 'Express Wash',
      description: 'Quick exterior hand wash and dry. Perfect for regular maintenance.',
      basePrice: 25,
      duration: 30,
      category: 'Exterior',
      order: 1
    },
    {
      name: 'Standard Exterior Detail',
      description: 'Complete exterior detail including hand wash, clay bar treatment, polish, and wax.',
      basePrice: 80,
      duration: 120,
      category: 'Exterior',
      order: 2
    },
    {
      name: 'Premium Exterior Detail',
      description: 'Our most comprehensive exterior service with paint correction and ceramic coating.',
      basePrice: 150,
      duration: 240,
      category: 'Exterior',
      order: 3
    },
    {
      name: 'Interior Detail',
      description: 'Deep clean of entire interior including vacuum, steam clean, leather treatment.',
      basePrice: 70,
      duration: 120,
      category: 'Interior',
      order: 4
    },
    {
      name: 'Full Detail',
      description: 'Complete interior and exterior detail. The ultimate car care package.',
      basePrice: 140,
      duration: 240,
      category: 'Full Detail',
      order: 5
    },
    {
      name: 'Paint Correction',
      description: 'Multi-stage machine polish to remove swirl marks and scratches.',
      basePrice: 200,
      duration: 360,
      category: 'Specialist',
      order: 6
    }
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { name: service.name },
      update: service,
      create: service
    })
  }

  console.log('✅ Services created')

  // Create sample social links
  const socialLinks = [
    {
      platform: 'instagram',
      url: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/yourhandle',
      order: 1
    },
    {
      platform: 'tiktok',
      url: process.env.NEXT_PUBLIC_TIKTOK_URL || 'https://tiktok.com/@yourhandle',
      order: 2
    }
  ]

  for (const link of socialLinks) {
    await prisma.socialLink.upsert({
      where: { 
        platform: link.platform
      },
      update: link,
      create: link
    })
  }

  console.log('✅ Social links created')

  // Create sample products (Amazon affiliate)
  const products = [
    {
      name: "Meguiar's Ultimate Wash & Wax",
      description: 'Professional car wash with wax protection in one step',
      amazonUrl: 'https://www.amazon.co.uk/dp/B001O7PNNM',
      category: 'Washing',
      order: 1
    },
    {
      name: 'Chemical Guys Leather Conditioner',
      description: 'Premium leather cleaner and conditioner',
      amazonUrl: 'https://www.amazon.co.uk/dp/B001TJ3Z9M',
      category: 'Interior',
      order: 2
    },
    {
      name: 'Turtle Wax Ceramic Spray Coating',
      description: 'Easy-apply ceramic coating for long-lasting shine',
      amazonUrl: 'https://www.amazon.co.uk/dp/B07VFNW2R8',
      category: 'Protection',
      order: 3
    },
    {
      name: 'Microfiber Cleaning Cloths Pack',
      description: 'Premium microfiber towels for detailing',
      amazonUrl: 'https://www.amazon.co.uk/dp/B07BFXX6VR',
      category: 'Accessories',
      order: 4
    }
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { name: product.name },
      update: product,
      create: product
    })
  }

  console.log('✅ Products created')
  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
