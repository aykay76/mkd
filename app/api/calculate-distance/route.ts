import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Helper function to calculate distance between two points using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8 // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Helper function to get coordinates from postcode using Google Geocoding API
async function getCoordinatesFromPostcode(postcode: string): Promise<{ lat: number; lng: number } | null> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  
  if (!apiKey) {
    // Fallback: use approximate UK postcode coordinates
    return { lat: 51.5074, lng: -0.1278 } // London default
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

export async function POST(request: NextRequest) {
  try {
    const { postcode, serviceId } = await request.json()
    
    if (!postcode || !serviceId) {
      return NextResponse.json({ 
        success: false, 
        error: 'Postcode and service ID are required' 
      }, { status: 400 })
    }
    
    // Get service details
    const service = await prisma.service.findUnique({
      where: { id: serviceId }
    })
    
    if (!service) {
      return NextResponse.json({ 
        success: false, 
        error: 'Service not found' 
      }, { status: 404 })
    }
    
    // Get customer coordinates
    const customerCoords = await getCoordinatesFromPostcode(postcode)
    
    if (!customerCoords) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid postcode' 
      }, { status: 400 })
    }
    
    // Business location (from environment variables)
    const businessLat = parseFloat(process.env.BUSINESS_LAT || '51.3148')
    const businessLng = parseFloat(process.env.BUSINESS_LNG || '-0.5600')
    
    // Calculate distance
    const distanceMiles = calculateDistance(
      businessLat,
      businessLng,
      customerCoords.lat,
      customerCoords.lng
    )
    
    // Calculate mileage cost (charge for distance over 10 miles)
    const mileageRate = parseFloat(process.env.MILEAGE_RATE || '0.45')
    const chargableMiles = Math.max(0, distanceMiles - 10)
    const mileageCost = chargableMiles * mileageRate
    
    // Calculate total cost
    const totalCost = service.basePrice + mileageCost
    
    return NextResponse.json({
      success: true,
      pricing: {
        servicePrice: service.basePrice,
        distanceMiles,
        mileageCost,
        totalCost
      },
      coordinates: customerCoords
    })
  } catch (error) {
    console.error('Distance calculation error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to calculate distance' 
    }, { status: 500 })
  }
}
