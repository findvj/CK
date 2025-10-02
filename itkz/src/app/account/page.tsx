'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Settings, 
  LogOut,
  Package,
  CreditCard,
  MapPin
} from 'lucide-react'

export default function AccountPage() {
  // Mock user data - in real app this would come from auth context
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    memberSince: '2024-01-15'
  }

  const handleLogout = () => {
    // TODO: Implement logout logic
    alert('Logged out successfully')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">My Account</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-medium">{new Date(user.memberSince).toLocaleDateString()}</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Orders Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    Orders
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">No orders yet</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    View Order History
                  </Button>
                </CardContent>
              </Card>

              {/* Wishlist Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Wishlist
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">No items in wishlist</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    View Wishlist
                  </Button>
                </CardContent>
              </Card>

              {/* Addresses Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Addresses
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">No saved addresses</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Manage Addresses
                  </Button>
                </CardContent>
              </Card>

              {/* Payment Methods Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">No saved payment methods</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Manage Payment Methods
                  </Button>
                </CardContent>
              </Card>

              {/* Settings Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" size="sm" className="w-full">
                    Account Settings
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    Notification Preferences
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="w-full"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
