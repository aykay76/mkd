'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Package,
  Settings,
  Home,
  ChevronRight
} from 'lucide-react'

interface Stats {
  totalBookings: number
  pendingBookings: number
  completedBookings: number
  totalRevenue: number
  monthlyRevenue: number
  totalCustomers: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    totalCustomers: 0
  })
  const [recentBookings, setRecentBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [statsRes, bookingsRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/bookings?limit=5')
      ])
      
      const statsData = await statsRes.json()
      const bookingsData = await bookingsRes.json()
      
      setStats(statsData)
      setRecentBookings(bookingsData.bookings || [])
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-primary-600">Elite Detailing Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-primary-600 flex items-center">
                <Home className="w-4 h-4 mr-2" />
                View Site
              </Link>
              <button className="bg-red-100 text-red-600 px-4 py-2 rounded hover:bg-red-200">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600">Welcome back! Here's your business overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Bookings"
            value={stats.totalBookings.toString()}
            icon={<Calendar className="w-6 h-6" />}
            color="blue"
          />
          <StatCard 
            title="Pending"
            value={stats.pendingBookings.toString()}
            icon={<Calendar className="w-6 h-6" />}
            color="yellow"
          />
          <StatCard 
            title="Total Revenue"
            value={`£${stats.totalRevenue.toFixed(0)}`}
            icon={<DollarSign className="w-6 h-6" />}
            color="green"
          />
          <StatCard 
            title="Customers"
            value={stats.totalCustomers.toString()}
            icon={<Users className="w-6 h-6" />}
            color="purple"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/admin/bookings" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-primary-600" />
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Manage Bookings</h3>
            <p className="text-gray-600 text-sm">View and manage all appointments</p>
          </Link>
          
          <Link href="/admin/customers" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-primary-600" />
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Customer Management</h3>
            <p className="text-gray-600 text-sm">View customer details and history</p>
          </Link>
          
          <Link href="/admin/services" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <Package className="w-8 h-8 text-primary-600" />
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Services & Pricing</h3>
            <p className="text-gray-600 text-sm">Manage service offerings</p>
          </Link>
          
          <Link href="/admin/expenses" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-primary-600" />
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Expenses</h3>
            <p className="text-gray-600 text-sm">Track business expenses</p>
          </Link>
          
          <Link href="/admin/reports" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-primary-600" />
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Reports</h3>
            <p className="text-gray-600 text-sm">View financial reports</p>
          </Link>
          
          <Link href="/admin/settings" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <Settings className="w-8 h-8 text-primary-600" />
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Settings</h3>
            <p className="text-gray-600 text-sm">Configure your website</p>
          </Link>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Recent Bookings</h3>
            <Link href="/admin/bookings" className="text-primary-600 hover:text-primary-700">
              View All
            </Link>
          </div>
          
          {loading ? (
            <p className="text-center text-gray-500 py-8">Loading...</p>
          ) : recentBookings.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No bookings yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentBookings.map((booking: any) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{booking.customer?.name || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{booking.service?.name || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(booking.scheduledDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-semibold">
                        £{booking.totalCost?.toFixed(2) || '0.00'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, color }: { 
  title: string
  value: string
  icon: React.ReactNode
  color: 'blue' | 'yellow' | 'green' | 'purple'
}) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600'
  }
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
      <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  )
}
