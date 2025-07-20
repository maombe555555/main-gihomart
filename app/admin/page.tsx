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
  Eye
} from "lucide-react"

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminEmail, setAdminEmail] = useState("")
  const [stats, setStats] = useState({
    users: null,
    docs: null,
    products: null,
    programs: null,
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
        const [usersRes, docsRes, productsRes, programsRes] = await Promise.all([
          fetch("/api/users"),
          fetch("/api/docs"),
          fetch("/api/products"),
          fetch("/api/programs"),
        ])
        if (!usersRes.ok || !docsRes.ok || !productsRes.ok || !programsRes.ok) {
          throw new Error("Failed to fetch one or more resources.")
        }
        const users = await usersRes.json()
        const docs = await docsRes.json()
        const products = await productsRes.json()
        const programs = await programsRes.json()
        setStats({
          users: Array.isArray(users) ? users.length : 0,
          docs: Array.isArray(docs) ? docs.length : 0,
          products: Array.isArray(products) ? products.length : 0,
          programs: Array.isArray(programs) ? programs.length : 0,
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
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <Badge className="ml-3 bg-green-100 text-green-800">Tourism Website</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {adminEmail}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="mb-4">
          {loading && <div className="text-center text-gray-500">Loading statistics...</div>}
          {error && <div className="text-center text-red-600">{error}</div>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        </div>
      </div>
    </div>
  )
} 