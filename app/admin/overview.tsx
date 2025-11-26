import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Booking {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: 'pending' | 'approved' | 'waiting' | 'rejected';
  travelers: number;
  createdAt: string;
}

interface User {
  _id: string;
  email: string;
  role: string;
  name?: string;
}

interface Product {
  _id: string;
  name: string;
  price?: number;
  category?: string;
}

interface Program {
  _id: string;
  name: string;
  description?: string;
}

interface Document {
  _id: string;
  title: string;
  name?: string;
}

interface Advertisement {
  _id: string;
  title: string;
  status?: string;
}

interface Contact {
  _id: string;
  name: string;
  email: string;
  subject?: string;
}

export default function AdminOverview() {
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [docs, setDocs] = useState<Document[]>([]);
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          usersRes,
          productsRes,
          programsRes,
          docsRes,
          adsRes,
          contactRes,
          bookingsRes
        ] = await Promise.all([
          fetch("/api/users"),
          fetch("/api/products"),
          fetch("/api/programs"),
          fetch("/api/docs"),
          fetch("/api/ads"),
          fetch("/api/contact"),
          fetch("/api/bookings")
        ]);

        if (usersRes.ok) {
          const usersData = await usersRes.json();
          setUsers(Array.isArray(usersData) ? usersData : []);
        }

        if (productsRes.ok) {
          const productsData = await productsRes.json();
          setProducts(Array.isArray(productsData) ? productsData : []);
        }

        if (programsRes.ok) {
          const programsData = await programsRes.json();
          setPrograms(Array.isArray(programsData) ? programsData : []);
        }

        if (docsRes.ok) {
          const docsData = await docsRes.json();
          setDocs(Array.isArray(docsData) ? docsData : []);
        }

        if (adsRes.ok) {
          const adsData = await adsRes.json();
          setAds(Array.isArray(adsData) ? adsData : []);
        }

        if (contactRes.ok) {
          const contactData = await contactRes.json();
          setContacts(Array.isArray(contactData) ? contactData : []);
        }

        if (bookingsRes.ok) {
          const bookingsData = await bookingsRes.json();
          // Handle both array response and paginated response
          if (Array.isArray(bookingsData)) {
            setBookings(bookingsData);
          } else if (bookingsData.data && Array.isArray(bookingsData.data)) {
            setBookings(bookingsData.data);
          } else {
            setBookings([]);
          }
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'waiting': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-12">
        <div className="text-center">Loading overview data...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 grid gap-8">
      {/* Users Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Users
            <Badge variant="secondary">Total: {users.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {users.slice(0, 5).map((user) => (
              <div key={user._id} className="flex justify-between items-center py-2 border-b">
                <div>
                  <div className="font-medium">{user.email}</div>
                  {user.name && <div className="text-sm text-gray-600">{user.name}</div>}
                </div>
                <Badge variant="outline">{user.role}</Badge>
              </div>
            ))}
            {users.length > 5 && (
              <div className="text-sm text-gray-500 text-center">
                +{users.length - 5} more users
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Products Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Products
            <Badge variant="secondary">Total: {products.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {products.slice(0, 5).map((product) => (
              <div key={product._id} className="flex justify-between items-center py-2 border-b">
                <div className="font-medium">{product.name}</div>
                {product.price && (
                  <div className="text-sm text-gray-600">${product.price}</div>
                )}
              </div>
            ))}
            {products.length > 5 && (
              <div className="text-sm text-gray-500 text-center">
                +{products.length - 5} more products
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Programs Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Programs
            <Badge variant="secondary">Total: {programs.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {programs.slice(0, 5).map((program) => (
              <div key={program._id} className="py-2 border-b">
                <div className="font-medium">{program.name}</div>
                {program.description && (
                  <div className="text-sm text-gray-600 truncate">
                    {program.description}
                  </div>
                )}
              </div>
            ))}
            {programs.length > 5 && (
              <div className="text-sm text-gray-500 text-center">
                +{programs.length - 5} more programs
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Documentation Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Documentation
            <Badge variant="secondary">Total: {docs.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {docs.slice(0, 5).map((doc) => (
              <div key={doc._id} className="py-2 border-b">
                <div className="font-medium">{doc.title || doc.name}</div>
              </div>
            ))}
            {docs.length > 5 && (
              <div className="text-sm text-gray-500 text-center">
                +{docs.length - 5} more documents
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Advertisements Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Advertisements
            <Badge variant="secondary">Total: {ads.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {ads.slice(0, 5).map((ad) => (
              <div key={ad._id} className="flex justify-between items-center py-2 border-b">
                <div className="font-medium">{ad.title}</div>
                {ad.status && (
                  <Badge variant="outline">{ad.status}</Badge>
                )}
              </div>
            ))}
            {ads.length > 5 && (
              <div className="text-sm text-gray-500 text-center">
                +{ads.length - 5} more ads
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Contact Messages Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Contact Messages
            <Badge variant="secondary">Total: {contacts.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {contacts.slice(0, 5).map((contact) => (
              <div key={contact._id} className="py-2 border-b">
                <div className="font-medium">{contact.name}</div>
                <div className="text-sm text-gray-600">{contact.email}</div>
                {contact.subject && (
                  <div className="text-sm text-gray-500 truncate">
                    {contact.subject}
                  </div>
                )}
              </div>
            ))}
            {contacts.length > 5 && (
              <div className="text-sm text-gray-500 text-center">
                +{contacts.length - 5} more messages
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Bookings Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Bookings
            <Badge variant="secondary">Total: {bookings.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {bookings.slice(0, 5).map((booking) => (
              <div key={booking._id} className="py-2 border-b">
                <div className="flex justify-between items-start mb-1">
                  <div className="font-medium">
                    {booking.firstName} {booking.lastName}
                  </div>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">{booking.email}</div>
                <div className="text-sm text-gray-500">
                  {booking.travelers} traveler{booking.travelers > 1 ? 's' : ''} • 
                  {new Date(booking.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
            {bookings.length > 5 && (
              <div className="text-sm text-gray-500 text-center">
                +{bookings.length - 5} more bookings
              </div>
            )}
            {bookings.length === 0 && (
              <div className="text-center text-gray-500 py-4">
                No bookings found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}