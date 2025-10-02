'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  Calendar,
  Download,
  Filter
} from 'lucide-react'

export default function AnalyticsPage() {
  // Mock analytics data
  const overviewStats = {
    totalRevenue: 1254300,
    totalOrders: 1247,
    totalCustomers: 2341,
    averageOrderValue: 1005,
    revenueChange: 12.5,
    ordersChange: -3.2,
    customersChange: 15.3,
    aovChange: 8.7
  }

  const monthlyRevenue = [
    { month: 'Jan', revenue: 85000, orders: 95 },
    { month: 'Feb', revenue: 92000, orders: 102 },
    { month: 'Mar', revenue: 88000, orders: 98 },
    { month: 'Apr', revenue: 105000, orders: 115 },
    { month: 'May', revenue: 118000, orders: 128 },
    { month: 'Jun', revenue: 125000, orders: 135 }
  ]

  const topProducts = [
    { name: 'RTX 4080 Graphics Card', sales: 45, revenue: 225000, growth: 15.2 },
    { name: 'Intel i7-13700K Processor', sales: 38, revenue: 152000, growth: 8.7 },
    { name: '32GB DDR5 RAM Kit', sales: 52, revenue: 104000, growth: 22.1 },
    { name: '1TB NVMe SSD', sales: 67, revenue: 67000, growth: 5.3 },
    { name: '850W Power Supply', sales: 29, revenue: 58000, growth: -2.1 }
  ]

  const customerSegments = [
    { segment: 'New Customers', count: 156, percentage: 45, revenue: 78000 },
    { segment: 'Returning Customers', count: 89, percentage: 25, revenue: 125000 },
    { segment: 'VIP Customers', count: 67, percentage: 20, revenue: 200000 },
    { segment: 'Inactive Customers', count: 35, percentage: 10, revenue: 15000 }
  ]

  const recentActivity = [
    { action: 'New order placed', details: 'ORD-001 by John Doe', time: '2 minutes ago', type: 'order' },
    { action: 'Product added', details: 'RTX 4090 Graphics Card', time: '15 minutes ago', type: 'product' },
    { action: 'Customer registered', details: 'jane@example.com', time: '1 hour ago', type: 'customer' },
    { action: 'Order shipped', details: 'ORD-002 to Mumbai', time: '2 hours ago', type: 'shipping' },
    { action: 'Payment received', details: '₹45,000 for ORD-003', time: '3 hours ago', type: 'payment' }
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order': return <ShoppingCart className="h-4 w-4 text-blue-500" />
      case 'product': return <Package className="h-4 w-4 text-green-500" />
      case 'customer': return <Users className="h-4 w-4 text-purple-500" />
      case 'shipping': return <Package className="h-4 w-4 text-orange-500" />
      case 'payment': return <DollarSign className="h-4 w-4 text-green-500" />
      default: return <BarChart3 className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600">Track your store's performance and insights</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{overviewStats.totalRevenue.toLocaleString()}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                +{overviewStats.revenueChange}% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overviewStats.totalOrders.toLocaleString()}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                {overviewStats.ordersChange}% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overviewStats.totalCustomers.toLocaleString()}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                +{overviewStats.customersChange}% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{overviewStats.averageOrderValue}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                +{overviewStats.aovChange}% from last month
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyRevenue.map((month, index) => (
                  <div key={month.month} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 text-sm font-medium">{month.month}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(month.revenue / 125000) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₹{month.revenue.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{month.orders} orders</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.sales} sales</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{product.revenue.toLocaleString()}</p>
                      <div className={`flex items-center text-xs ${product.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.growth > 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(product.growth)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Customer Segments */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Segments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerSegments.map((segment, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{segment.segment}</span>
                      <span className="text-sm text-gray-600">{segment.count} customers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${segment.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{segment.percentage}%</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Revenue: ₹{segment.revenue.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-xs text-gray-600">{activity.details}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
