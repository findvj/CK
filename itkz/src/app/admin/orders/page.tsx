'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Filter, 
  Eye, 
  Package, 
  Truck, 
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  MoreHorizontal
} from 'lucide-react'

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Mock orders data
  const orders = [
    {
      id: 'ORD-001',
      customer: 'John Doe',
      email: 'john@example.com',
      phone: '+91 98765 43210',
      total: 125000,
      status: 'completed',
      paymentStatus: 'paid',
      shippingStatus: 'delivered',
      items: 3,
      date: '2024-01-15',
      shippingAddress: '123 Main St, Mumbai, Maharashtra 400001'
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+91 98765 43211',
      total: 89000,
      status: 'processing',
      paymentStatus: 'paid',
      shippingStatus: 'preparing',
      items: 2,
      date: '2024-01-15',
      shippingAddress: '456 Park Ave, Delhi, Delhi 110001'
    },
    {
      id: 'ORD-003',
      customer: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+91 98765 43212',
      total: 210000,
      status: 'shipped',
      paymentStatus: 'paid',
      shippingStatus: 'in_transit',
      items: 5,
      date: '2024-01-14',
      shippingAddress: '789 Tech Park, Bangalore, Karnataka 560001'
    },
    {
      id: 'ORD-004',
      customer: 'Sarah Wilson',
      email: 'sarah@example.com',
      phone: '+91 98765 43213',
      total: 45000,
      status: 'pending',
      paymentStatus: 'pending',
      shippingStatus: 'not_shipped',
      items: 1,
      date: '2024-01-14',
      shippingAddress: '321 Garden St, Chennai, Tamil Nadu 600001'
    },
    {
      id: 'ORD-005',
      customer: 'David Brown',
      email: 'david@example.com',
      phone: '+91 98765 43214',
      total: 178000,
      status: 'cancelled',
      paymentStatus: 'refunded',
      shippingStatus: 'cancelled',
      items: 4,
      date: '2024-01-13',
      shippingAddress: '654 Business Dist, Pune, Maharashtra 411001'
    }
  ]

  const statusOptions = ['all', 'pending', 'processing', 'shipped', 'completed', 'cancelled']

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'refunded': return 'bg-blue-100 text-blue-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getShippingStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'in_transit': return 'bg-blue-100 text-blue-800'
      case 'preparing': return 'bg-yellow-100 text-yellow-800'
      case 'not_shipped': return 'bg-gray-100 text-gray-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'processing': return <Package className="h-4 w-4" />
      case 'shipped': return <Truck className="h-4 w-4" />
      case 'pending': return <Clock className="h-4 w-4" />
      case 'cancelled': return <AlertCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
              <p className="text-gray-600">Track and manage customer orders</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Orders
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search orders by ID, customer name, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>
                      {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Orders ({filteredOrders.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Order ID</th>
                    <th className="text-left p-4 font-medium">Customer</th>
                    <th className="text-left p-4 font-medium">Total</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Payment</th>
                    <th className="text-left p-4 font-medium">Shipping</th>
                    <th className="text-left p-4 font-medium">Date</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-gray-500">{order.items} items</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{order.customer}</p>
                          <p className="text-sm text-gray-500">{order.email}</p>
                          <p className="text-xs text-gray-400">{order.phone}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-medium">₹{order.total.toLocaleString()}</span>
                      </td>
                      <td className="p-4">
                        <Badge className={getStatusColor(order.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            {order.status}
                          </span>
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                          {order.paymentStatus}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge className={getShippingStatusColor(order.shippingStatus)}>
                          {order.shippingStatus.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <span className="text-sm">{order.date}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
