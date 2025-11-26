"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Mail,
  Calendar,
  Users,
  Phone,
  MapPin,
  DollarSign,
  MessageSquare,
  RefreshCw,
  AlertCircle
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Booking {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  residence?: string;
  departureDate?: string;
  returnDate?: string;
  travelers: number;
  budget?: string;
  comments?: string;
  products: any[];
  status: 'pending' | 'approved' | 'waiting' | 'rejected';
  statusUpdatedAt?: string;
  createdAt: string;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [error, setError] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log("Fetching bookings from /api/booking...")
      
      const response = await fetch("/api/booking")
      console.log("Response status:", response.status)
      console.log("Response ok:", response.ok)
      
      if (response.ok) {
        const data = await response.json()
        console.log("Bookings data received:", data)
        
        // Handle both array and paginated response formats
        let bookingsData: any[] = []
        
        if (Array.isArray(data)) {
          bookingsData = data
        } else if (data && data.data && Array.isArray(data.data)) {
          bookingsData = data.data
        } else if (data && Array.isArray(data.bookings)) {
          bookingsData = data.bookings
        }
        
        console.log("Processed bookings data:", bookingsData)
        
        // Ensure all bookings have required fields with defaults
        const validatedBookings = bookingsData.map((booking: any) => ({
          _id: booking._id || Math.random().toString(36).substr(2, 9),
          firstName: booking.firstName || 'Unknown',
          lastName: booking.lastName || 'Unknown',
          email: booking.email || 'No email',
          phone: booking.phone || 'No phone',
          residence: booking.residence,
          departureDate: booking.departureDate,
          returnDate: booking.returnDate,
          travelers: booking.travelers || 1,
          budget: booking.budget,
          comments: booking.comments,
          products: booking.products || [],
          status: booking.status || 'pending',
          statusUpdatedAt: booking.statusUpdatedAt,
          createdAt: booking.createdAt || new Date().toISOString()
        }))
        
        setBookings(validatedBookings)
        console.log("Bookings set successfully:", validatedBookings.length)
      } else {
        const errorText = await response.text()
        console.error("Failed to fetch bookings. Status:", response.status, "Response:", errorText)
        setError(`Failed to load bookings: ${response.status} ${response.statusText}`)
      }
    } catch (error) {
      console.error("Error fetching bookings:", error)
      setError(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const updateBookingStatus = async (bookingId: string, status: Booking['status'], adminComments?: string) => {
    try {
      setError(null)
      setUpdatingId(bookingId)
      
      console.log("Updating booking status:", { bookingId, status, adminComments })
      
      // Try both API endpoint formats
      const response = await fetch("/api/booking", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: bookingId,
          status,
          adminComments
        }),
      })

      console.log("Update response status:", response.status)
      console.log("Update response ok:", response.ok)

      if (response.ok) {
        const result = await response.json()
        console.log("Update successful:", result)
        
        // Update local state immediately for better UX
        setBookings(prev => prev.map(booking => 
          booking._id === bookingId 
            ? { ...booking, status, statusUpdatedAt: new Date().toISOString() }
            : booking
        ))
        
        // Refresh the bookings list to get latest data
        setTimeout(() => fetchBookings(), 500)
      } else {
        const errorText = await response.text()
        console.error("Failed to update booking status. Status:", response.status, "Response:", errorText)
        
        // Try alternative API endpoint
        console.log("Trying alternative API endpoint...")
        await tryAlternativeUpdate(bookingId, status, adminComments)
      }
    } catch (error) {
      console.error("Error updating booking:", error)
      setError(`Error updating booking: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setUpdatingId(null)
    }
  }

  const tryAlternativeUpdate = async (bookingId: string, status: Booking['status'], adminComments?: string) => {
    try {
      // Try the individual booking endpoint
      const response = await fetch(`/api/booking/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          adminComments
        }),
      })

      console.log("Alternative update response status:", response.status)

      if (response.ok) {
        const result = await response.json()
        console.log("Alternative update successful:", result)
        
        // Update local state
        setBookings(prev => prev.map(booking => 
          booking._id === bookingId 
            ? { ...booking, status, statusUpdatedAt: new Date().toISOString() }
            : booking
        ))
        
        setTimeout(() => fetchBookings(), 500)
      } else {
        const errorText = await response.text()
        console.error("Alternative update also failed:", errorText)
        setError(`Failed to update booking status. Please check the API endpoint.`)
      }
    } catch (error) {
      console.error("Error in alternative update:", error)
      setError(`Network error during update: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const deleteBooking = async (bookingId: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return

    try {
      setError(null)
      
      // Try both DELETE endpoint formats
      let response = await fetch(`/api/booking?id=${bookingId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        // Try alternative endpoint
        response = await fetch(`/api/booking/${bookingId}`, {
          method: "DELETE",
        })
      }

      if (response.ok) {
        // Remove from local state immediately
        setBookings(prev => prev.filter(booking => booking._id !== bookingId))
      } else {
        const errorText = await response.text()
        console.error("Failed to delete booking:", errorText)
        setError("Failed to delete booking")
      }
    } catch (error) {
      console.error("Error deleting booking:", error)
      setError(`Error deleting booking: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      (booking.firstName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (booking.lastName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (booking.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (booking.phone || '').includes(searchTerm)
    
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    const safeStatus = status || 'pending'
    switch (safeStatus) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'waiting': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusCount = (status: string) => {
    return bookings.filter(booking => booking.status === status).length
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not specified'
    try {
      return new Date(dateString).toLocaleDateString()
    } catch {
      return 'Invalid date'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center flex items-center justify-center gap-2">
            <RefreshCw className="w-5 h-5 animate-spin" />
            Loading bookings...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Booking Management</h1>
              <p className="text-gray-600 mt-2">Manage and review all booking requests</p>
            </div>
            <Button onClick={fetchBookings} variant="outline" className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-red-800">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setError(null)}
                  className="ml-auto"
                >
                  Dismiss
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
                </div>
                <div className="p-3 rounded-full bg-blue-50">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{getStatusCount('pending')}</p>
                </div>
                <div className="p-3 rounded-full bg-yellow-50">
                  <Users className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-gray-900">{getStatusCount('approved')}</p>
                </div>
                <div className="p-3 rounded-full bg-green-50">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Waiting List</p>
                  <p className="text-2xl font-bold text-gray-900">{getStatusCount('waiting')}</p>
                </div>
                <div className="p-3 rounded-full bg-blue-50">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search bookings by name, email, or phone..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="waiting">Waiting</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.map((booking) => (
            <Card key={booking._id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Booking Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {booking.firstName} {booking.lastName}
                        </h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {booking.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {booking.phone}
                          </div>
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(booking.status)} border`}>
                        {(booking.status || 'pending').toUpperCase()}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      {booking.residence && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{booking.residence}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>{booking.travelers} traveler{booking.travelers > 1 ? 's' : ''}</span>
                      </div>
                      {booking.budget && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          <span>Budget: {booking.budget}</span>
                        </div>
                      )}
                    </div>

                    {booking.departureDate && (
                      <div className="text-sm text-gray-600">
                        <strong>Travel Dates:</strong> {formatDate(booking.departureDate)}
                        {booking.returnDate && ` - ${formatDate(booking.returnDate)}`}
                      </div>
                    )}

                    {booking.comments && (
                      <div className="text-sm text-gray-600">
                        <div className="flex items-start gap-1">
                          <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5" />
                          <span>{booking.comments}</span>
                        </div>
                      </div>
                    )}

                    {booking.products && booking.products.length > 0 && (
                      <div className="text-sm text-gray-600">
                        <strong>Selected Products:</strong>{" "}
                        {booking.products.map((p: any) => p.name).join(", ")}
                      </div>
                    )}

                    <div className="text-xs text-gray-500">
                      Created: {formatDate(booking.createdAt)} at{" "}
                      {booking.createdAt ? new Date(booking.createdAt).toLocaleTimeString() : 'Unknown time'}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateBookingStatus(booking._id, 'approved', 'Your booking has been approved!')}
                        disabled={booking.status === 'approved' || updatingId === booking._id}
                      >
                        {updatingId === booking._id ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          'Approve'
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateBookingStatus(booking._id, 'waiting', 'Your booking has been placed on waiting list.')}
                        disabled={booking.status === 'waiting' || updatingId === booking._id}
                      >
                        {updatingId === booking._id ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          'Wait List'
                        )}
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateBookingStatus(booking._id, 'rejected', 'Unfortunately, your booking could not be approved at this time.')}
                        disabled={booking.status === 'rejected' || updatingId === booking._id}
                      >
                        {updatingId === booking._id ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          'Reject'
                        )}
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="outline" disabled={updatingId === booking._id}>
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => deleteBooking(booking._id)}>
                            Delete Booking
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredBookings.length === 0 && !loading && (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="text-gray-500">
                  {searchTerm || statusFilter !== "all" 
                    ? "No bookings match your search criteria." 
                    : "No bookings found. Create some bookings first."}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}