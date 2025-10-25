import Link from 'next/link'
import { Instagram, Music2, MapPin, Phone, Mail } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">Elite Detailing</h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="text-gray-700 hover:text-primary-600">Services</a>
              <a href="#about" className="text-gray-700 hover:text-primary-600">About</a>
              <a href="#products" className="text-gray-700 hover:text-primary-600">Products</a>
              <a href="#contact" className="text-gray-700 hover:text-primary-600">Contact</a>
              <Link href="/book" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-4">Professional Mobile Car Detailing</h2>
            <p className="text-xl mb-8">We bring premium car care directly to your doorstep in Surrey</p>
            <div className="flex justify-center gap-4">
              <Link href="/book" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Book Appointment
              </Link>
              <a href="#services" className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition">
                View Services
              </a>
            </div>
            <div className="mt-8 flex justify-center gap-6">
              <a href={process.env.NEXT_PUBLIC_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <Instagram className="w-8 h-8" />
              </a>
              <a href={process.env.NEXT_PUBLIC_TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <Music2 className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Service Cards will be loaded from database */}
            <ServiceCard 
              title="Exterior Detail"
              price="£80"
              duration="2 hours"
              features={[
                "Hand wash & dry",
                "Clay bar treatment",
                "Polish & wax",
                "Wheel & tire cleaning",
                "Glass cleaning"
              ]}
            />
            <ServiceCard 
              title="Interior Detail"
              price="£70"
              duration="2 hours"
              features={[
                "Vacuum all surfaces",
                "Steam clean carpets",
                "Leather conditioning",
                "Dashboard & console clean",
                "Glass cleaning"
              ]}
            />
            <ServiceCard 
              title="Full Detail"
              price="£140"
              duration="4 hours"
              features={[
                "Complete exterior detail",
                "Complete interior detail",
                "Engine bay clean",
                "Headlight restoration",
                "Paint sealant protection"
              ]}
            />
          </div>
          <div className="text-center mt-12">
            <Link href="/book" className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 inline-block">
              View All Services & Book
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Why Choose Elite Detailing?</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-3">✓</span>
                  <span>Professional mobile service - we come to you</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-3">✓</span>
                  <span>Premium products and equipment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-3">✓</span>
                  <span>Experienced and insured technicians</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-3">✓</span>
                  <span>Eco-friendly waterless options available</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-3">✓</span>
                  <span>Satisfaction guaranteed</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Service Area</h3>
              <div className="flex items-center mb-4">
                <MapPin className="text-primary-600 mr-2" />
                <span className="text-lg">Surrey & Surrounding Areas</span>
              </div>
              <p className="text-gray-600 mb-4">
                We proudly serve all of Surrey and within 20 miles. Mileage charges apply for distances over 10 miles.
              </p>
              <p className="text-sm text-gray-500">
                Not sure if we cover your area? Get in touch and we'll let you know!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">Recommended Products</h2>
          <p className="text-center text-gray-600 mb-12">Professional-grade products we use and recommend</p>
          <div className="grid md:grid-cols-4 gap-6">
            <ProductCard 
              name="Meguiar's Ultimate Wash & Wax"
              image="/api/placeholder/300/300"
              amazonUrl="#"
            />
            <ProductCard 
              name="Chemical Guys Leather Conditioner"
              image="/api/placeholder/300/300"
              amazonUrl="#"
            />
            <ProductCard 
              name="Turtle Wax Ceramic Spray Coating"
              image="/api/placeholder/300/300"
              amazonUrl="#"
            />
            <ProductCard 
              name="Microfiber Cleaning Cloths"
              image="/api/placeholder/300/300"
              amazonUrl="#"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center">
                <Phone className="text-primary-600 mr-4" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <a href="tel:+447123456789" className="text-primary-600 hover:underline">07123 456789</a>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="text-primary-600 mr-4" />
                <div>
                  <p className="font-semibold">Email</p>
                  <a href="mailto:info@elitedetailing.co.uk" className="text-primary-600 hover:underline">info@elitedetailing.co.uk</a>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="text-primary-600 mr-4" />
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-gray-600">Surrey, United Kingdom</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Quick Booking</h3>
              <p className="mb-4 text-gray-600">Ready to give your car the treatment it deserves?</p>
              <Link href="/book" className="block w-full bg-primary-600 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-primary-700">
                Book Your Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Elite Detailing</h3>
              <p className="text-gray-400">Professional mobile car detailing services in Surrey</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#services" className="hover:text-white">Services</a></li>
                <li><Link href="/book" className="hover:text-white">Book Now</Link></li>
                <li><a href="#about" className="hover:text-white">About Us</a></li>
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href={process.env.NEXT_PUBLIC_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary-400">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href={process.env.NEXT_PUBLIC_TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary-400">
                  <Music2 className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Elite Detailing. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ServiceCard({ title, price, duration, features }: { 
  title: string
  price: string
  duration: string
  features: string[] 
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <div className="flex justify-between items-center mb-4">
        <span className="text-3xl font-bold text-primary-600">{price}</span>
        <span className="text-gray-500">{duration}</span>
      </div>
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="text-primary-600 mr-2">✓</span>
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      <Link href="/book" className="block w-full text-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition">
        Book This Service
      </Link>
    </div>
  )
}

function ProductCard({ name, image, amazonUrl }: { name: string, image: string, amazonUrl: string }) {
  const affiliateTag = process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG
  const fullUrl = `${amazonUrl}?tag=${affiliateTag}`
  
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
      <div className="aspect-square mb-4 bg-gray-200 rounded"></div>
      <h4 className="font-semibold mb-2">{name}</h4>
      <a 
        href={fullUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block text-center bg-yellow-400 text-gray-900 px-4 py-2 rounded hover:bg-yellow-500 transition text-sm font-semibold"
      >
        View on Amazon
      </a>
    </div>
  )
}
