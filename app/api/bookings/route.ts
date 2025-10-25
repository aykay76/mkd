import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

// Force dynamic rendering - don't try to statically generate at build time
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

let prisma: PrismaClient

function getPrismaClient() {
  if (!prisma) {
    prisma = new PrismaClient()
  }
  return prisma
}

// Helper function to get coordinates from postcode
async function getCoordinatesFromPostcode(postcode: string): Promise<{ lat: number; lng: number } | null> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  
  if (!apiKey) {
    return { lat: 51.5074, lng: -0.1278 }
  }
  
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(postcode)}&region=uk&key=${apiKey}`
    )
    const data = await response.json()
    
    if (data.results && data.results.length > 0) {
      return {
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng
      }
    }
    return null
  } catch (error) {
    console.error('Geocoding error:', error)
    return null
  }
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export async function GET() {
  try {
    const bookings = await getPrismaClient().booking.findMany({
      include: {
        customer: true,
        service: true
      },
      orderBy: { scheduledDate: 'desc' }
    })
    
    return NextResponse.json(bookings)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Get or create customer
    let customer = await getPrismaClient().customer.findUnique({
      where: { email: data.email }
    })
    
    const coords = await getCoordinatesFromPostcode(data.postcode)
    
    if (!customer) {
      customer = await getPrismaClient().customer.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          postcode: data.postcode,
          latitude: coords?.lat,
          longitude: coords?.lng
        }
      })
    } else {
      // Update customer info if changed
      customer = await getPrismaClient().customer.update({
        where: { id: customer.id },
        data: {
          name: data.name,
          phone: data.phone,
          address: data.address,
          postcode: data.postcode,
          latitude: coords?.lat,
          longitude: coords?.lng
        }
      })
    }
    
    // Get service
    const service = await getPrismaClient().service.findUnique({
      where: { id: data.serviceId }
    })
    
    if (!service) {
      return NextResponse.json({ 
        success: false, 
        error: 'Service not found' 
      }, { status: 404 })
    }
    
    // Calculate pricing
    const businessLat = parseFloat(process.env.BUSINESS_LAT || '51.3148')
    const businessLng = parseFloat(process.env.BUSINESS_LNG || '-0.5600')
    
    const distanceMiles = coords 
      ? calculateDistance(businessLat, businessLng, coords.lat, coords.lng)
      : 0
    
    const mileageRate = parseFloat(process.env.MILEAGE_RATE || '0.45')
    const chargableMiles = Math.max(0, distanceMiles - 10)
    const mileageCost = chargableMiles * mileageRate
    const totalCost = service.basePrice + mileageCost
    
    // Create booking
    const booking = await getPrismaClient().booking.create({
      data: {
        customerId: customer.id,
        serviceId: service.id,
        scheduledDate: new Date(data.date),
        scheduledTime: data.time,
        status: 'pending',
        servicePrice: service.basePrice,
        distanceMiles,
        mileageCost,
        totalCost,
        customerAddress: data.address,
        customerLat: coords?.lat || 0,
        customerLng: coords?.lng || 0,
        notes: data.notes || ''
      },
      include: {
        customer: true,
        service: true
      }
    })
    
    return NextResponse.json({ success: true, booking })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create booking' 
    }, { status: 500 })
  }
}
