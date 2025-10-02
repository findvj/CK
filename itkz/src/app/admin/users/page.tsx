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
  Edit, 
  Trash2, 
  Users, 
  Mail,
  Phone,
  Calendar,
  Shield,
  MoreHorizontal,
  UserCheck,
  UserX
} from 'lucide-react'

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  // Mock users data
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 98765 43210',
      role: 'customer',
      status: 'active',
      joinDate: '2024-01-10',
      lastLogin: '2024-01-15',
      totalOrders: 5,
      totalSpent: 125000,
      avatar: null
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+91 98765 43211',
      role: 'customer',
      status: 'active',
      joinDate: '2024-01-08',
      lastLogin: '2024-01-14',
      totalOrders: 3,
      totalSpent: 89000,
      avatar: null
    },
    {
      id: 3,
      name: 'Admin User',
      email: 'admin@itkhzana.com',
      phone: '+91 98765 43212',
      role: 'admin',
      status: 'active',
      joinDate: '2024-01-01',
      lastLogin: '2024-01-15',
      totalOrders: 0,
      totalSpent: 0,
      avatar: null
    },
    {
      id: 4,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+91 98765 43213',
      role: 'customer',
      status: 'inactive',
      joinDate: '2024-01-05',
      lastLogin: '2024-01-12',
      totalOrders: 2,
      totalSpent: 45000,
      avatar: null
    },
    {
      id: 5,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      phone: '+91 98765 43214',
      role: 'moderator',
      status: 'active',
      joinDate: '2024-01-03',
      lastLogin: '2024-01-15',
      totalOrders: 1,
      totalSpent: 25000,
      avatar: null
    }
  ]

  const roleOptions = ['all', 'customer', 'admin', 'moderator']
  const statusOptions = ['all', 'active', 'inactive', 'suspended']

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm)
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800'
      case 'moderator': return 'bg-blue-100 text-blue-800'
      case 'customer': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-yellow-100 text-yellow-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <UserCheck className="h-4 w-4" />
      case 'inactive': return <UserX className="h-4 w-4" />
      case 'suspended': return <UserX className="h-4 w-4" />
      default: return <UserX className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600">Manage user accounts and permissions</p>
            </div>
            <div className="flex gap-2">
              <Button>
                <Users className="h-4 w-4 mr-2" />
                Add User
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
                    placeholder="Search users by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {roleOptions.map(role => (
                    <option key={role} value={role}>
                      {role === 'all' ? 'All Roles' : role.charAt(0).toUpperCase() + role.slice(1)}
                    </option>
                  ))}
                </select>
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

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Users ({filteredUsers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">User</th>
                    <th className="text-left p-4 font-medium">Contact</th>
                    <th className="text-left p-4 font-medium">Role</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Orders</th>
                    <th className="text-left p-4 font-medium">Total Spent</th>
                    <th className="text-left p-4 font-medium">Last Login</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-gray-400" />
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">ID: {user.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3 text-gray-400" />
                            {user.email}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Phone className="h-3 w-3 text-gray-400" />
                            {user.phone}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge className={getRoleColor(user.role)}>
                          {user.role === 'admin' && <Shield className="h-3 w-3 mr-1" />}
                          {user.role}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge className={getStatusColor(user.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(user.status)}
                            {user.status}
                          </span>
                        </Badge>
                      </td>
                      <td className="p-4">
                        <span className="font-medium">{user.totalOrders}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-medium">₹{user.totalSpent.toLocaleString()}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {user.lastLogin}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
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
