"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  FileText, 
  Package, 
  Calendar, 
  LogOut, 
  Settings, 
  BarChart3,
  Plus,
  Eye,
  BookOpen,
  Mail
} from "lucide-react"

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminEmail, setAdminEmail] = useState("")
  const [stats, setStats] = useState<{
    users: number | null,
    docs: number | null,
    products: number | null,
    programs: number | null,
    ads: number | null,
    contact: number | null,
    bookings: number | null, // Added bookings property
  }>({
    users: null,
    docs: null,
    products: null,
    programs: null,
    ads: null,
    contact: null,
    bookings: null, // Initialize bookings
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const adminStatus = localStorage.getItem("isAdmin")
      const email = localStorage.getItem("adminEmail")
      if (adminStatus !== "true") {
        router.push("/admin/login")
        return
      }
      setIsAdmin(true)
      setAdminEmail(email || "Admin")
    }
  }, [router])

  useEffect(() => {
    async function fetchStats() {
      setLoading(true)
      setError("")
      try {
        const [usersRes, docsRes, productsRes, programsRes, adsRes, contactRes, bookingsRes] = await Promise.all([
          fetch("/api/users"),
          fetch("/api/docs"),
          fetch("/api/products"),
          fetch("/api/programs"),
          fetch("/api/ads"),
          fetch("/api/contact"),
          fetch("/api/booking") // Fetch bookings data
        ])
        
        if (!usersRes.ok || !docsRes.ok || !productsRes.ok || !programsRes.ok || !adsRes.ok || !contactRes.ok || !bookingsRes.ok) {
          throw new Error("Failed to fetch one or more resources.")
        }
        
        const users = await usersRes.json();
        const docs = await docsRes.json();
        const products = await productsRes.json();
        const programs = await programsRes.json();
        const ads = await adsRes.json();
        const contact = await contactRes.json();
        const bookings = await bookingsRes.json();
        
        setStats({
          users: Array.isArray(users) ? users.length : 0,
          docs: Array.isArray(docs) ? docs.length : 0,
          products: Array.isArray(products) ? products.length : 0,
          programs: Array.isArray(programs) ? programs.length : 0,
          ads: Array.isArray(ads) ? ads.length : 0,
          contact: Array.isArray(contact) ? contact.length : 0,
          bookings: Array.isArray(bookings) ? bookings.length : (bookings.data && Array.isArray(bookings.data) ? bookings.data.length : 0),
        })
      } catch (err) {
        setError("Failed to load statistics.")
      } finally {
        setLoading(false)
      }
    }
    if (isAdmin) fetchStats()
  }, [isAdmin])

  const handleLogout = () => {
    localStorage.removeItem("isAdmin")
    localStorage.removeItem("adminEmail")
    localStorage.removeItem("loginTime")
    router.push("/admin/login")
  }

  if (!isAdmin) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const statsConfig = [
    {
      title: "Total Users",
      value: stats.users !== null ? stats.users : "-",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Documents",
      value: stats.docs !== null ? stats.docs : "-",
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Products",
      value: stats.products !== null ? stats.products : "-",
      icon: Package,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Programs",
      value: stats.programs !== null ? stats.programs : "-",
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Bookings",
      value: stats.bookings !== null ? stats.bookings : "-",
      icon: BookOpen,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Contact Messages",
      value: stats.contact !== null ? stats.contact : "-",
      icon: Mail,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ]

  const quickActions = [
    {
      title: "Add Document",
      description: "Create new cultural documentation",
      icon: Plus,
      href: "/admin/docs",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Manage Users",
      description: "View and edit user accounts",
      icon: Users,
      href: "/admin/users",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "View Analytics",
      description: "Check website statistics",
      icon: BarChart3,
      href: "/admin/analytics",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Manage Advertisements",
      description: "Create and edit ads",
      icon: Settings,
      href: "/admin/ads",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Contact Management",
      description: "View and respond to contact inquiries",
      icon: Mail,
      href: "/admin/contact",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Booking Management",
      description: "Manage and approve booking requests",
      icon: BookOpen,
      href: "/admin/bookings",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Well-arranged Header Navigation Bar */}
      <header className="w-full fixed top-0 left-0 z-50 bg-white shadow border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
          {/* Logo and Brand Block */}
          <div className="flex items-center gap-4">
            <img src="/images/logooo.jpg" alt="GiHomArts & Cultours Ltd Logo" className="h-12 w-12 rounded-full border border-gray-300" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl text-black leading-tight">GiHomArts &amp; Cultours Ltd</span>
              <span className="text-base text-gray-500 font-normal -mt-1">My Heritage Today &amp; Tomorrow</span>
            </div>
          </div>
          {/* Navigation Links (no Admin link) */}
          <nav className="flex gap-6 items-center">
            <a href="/" className="text-gray-700 hover:text-blue-600 font-medium transition">Home</a>
            <a href="/products" className="text-gray-700 hover:text-blue-600 font-medium transition">Products</a>
            <a href="/programs" className="text-gray-700 hover:text-blue-600 font-medium transition">Programs</a>
            <a href="/booking" className="text-gray-700 hover:text-blue-600 font-medium transition">Booking</a>
            <a href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition">Contact</a>
          </nav>
          {/* Welcome and Logout */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {adminEmail}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      {/* Spacer for fixed nav */}
      <div className="h-16" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Stats Grid */}
        <div className="mb-4">
          {loading && <div className="text-center text-gray-500">Loading statistics...</div>}
          {error && <div className="text-center text-red-600">{error}</div>}
        </div>
        
        {/* Stats Grid - Updated to 3 columns for better layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statsConfig.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <Link href={action.href}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full ${action.bgColor}`}>
                        <action.icon className={`w-6 h-6 ${action.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{action.title}</h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <Link href="/admin/docs">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg">Documents</CardTitle>
                </div>
                <CardDescription>Manage cultural documentation and articles</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  View Documents
                </Button>
              </CardContent>
            </Link>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <Link href="/admin/products">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-green-600" />
                  <CardTitle className="text-lg">Products</CardTitle>
                </div>
                <CardDescription>Manage tourism products and services</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  View Products
                </Button>
              </CardContent>
            </Link>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <Link href="/admin/programs">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <CardTitle className="text-lg">Programs</CardTitle>
                </div>
                <CardDescription>Manage tourism programs and events</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  View Programs
                </Button>
              </CardContent>
            </Link>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <Link href="/admin/users">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-orange-600" />
                  <CardTitle className="text-lg">Users</CardTitle>
                </div>
                <CardDescription>Manage user accounts and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  View Users
                </Button>
              </CardContent>
            </Link>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <Link href="/admin/contact">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-red-600" />
                  <CardTitle className="text-lg">Contact</CardTitle>
                </div>
                <CardDescription>Manage contact inquiries and messages</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  View Messages
                </Button>
              </CardContent>
            </Link>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <Link href="/admin/ads">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-indigo-600" />
                  <CardTitle className="text-lg">Advertisements</CardTitle>
                </div>
                <CardDescription>Manage ads and promotions</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  View Ads
                </Button>
              </CardContent>
            </Link>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <Link href="/admin/bookings">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  <CardTitle className="text-lg">Bookings</CardTitle>
                </div>
                <CardDescription>Manage and approve booking requests</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  View Bookings
                </Button>
              </CardContent>
            </Link>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <Link href="/admin/analytics">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg">Analytics</CardTitle>
                </div>
                <CardDescription>View website statistics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}