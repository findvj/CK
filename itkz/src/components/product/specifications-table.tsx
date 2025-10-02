'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Info } from 'lucide-react'

interface Specification {
  category: string
  specifications: {
    name: string
    value: string
    highlight?: boolean
    status?: 'good' | 'warning' | 'error'
  }[]
}

interface SpecificationsTableProps {
  specifications: Specification[] | Record<string, string>
  title?: string
}

export function SpecificationsTable({ specifications, title = "Specifications" }: SpecificationsTableProps) {
  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'warning': return <Info className="h-4 w-4 text-yellow-500" />
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />
      default: return null
    }
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'good': return 'text-green-600'
      case 'warning': return 'text-yellow-600'
      case 'error': return 'text-red-600'
      default: return 'text-foreground'
    }
  }

  // Handle both array format and Record format
  const renderSpecifications = () => {
    if (Array.isArray(specifications)) {
      // Handle array format (Specification[])
      return specifications.map((category, categoryIndex) => (
        <div key={categoryIndex} className="space-y-3">
          <h3 className="text-lg font-semibold text-primary border-b pb-2">
            {category.category}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {category.specifications.map((spec, specIndex) => (
              <div 
                key={specIndex} 
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  spec.highlight ? 'bg-primary/5 border-primary/20' : 'bg-muted/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  {getStatusIcon(spec.status)}
                  <span className={`font-medium ${spec.highlight ? 'text-primary' : ''}`}>
                    {spec.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${getStatusColor(spec.status)}`}>
                    {spec.value}
                  </span>
                  {spec.highlight && (
                    <Badge variant="secondary" className="text-xs">
                      Featured
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))
    } else {
      // Handle Record format (Record<string, string>)
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(specifications || {}).map(([key, value]) => (
            <div 
              key={key} 
              className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
            >
              <span className="font-medium">{key}</span>
              <span className="text-sm text-foreground">{value}</span>
            </div>
          ))}
        </div>
      )
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="space-y-6">
        {renderSpecifications()}
      </div>
    </div>
  )
}
