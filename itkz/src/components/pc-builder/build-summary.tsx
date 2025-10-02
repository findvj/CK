'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Product, ProductCategory } from '@/types'
import { formatPrice } from '@/lib/utils'
import { Trash2, Save, AlertTriangle, CheckCircle } from 'lucide-react'

interface BuildSummaryProps {
  build: Partial<Record<ProductCategory, Product>>
  totalPrice: number
  compatibility: { compatible: boolean; warnings: string[] }
  onRemoveComponent: (category: ProductCategory) => void
  onSaveBuild?: () => void
}

export function BuildSummary({ build, totalPrice, compatibility, onRemoveComponent }: BuildSummaryProps) {
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [buildName, setBuildName] = useState('')

  const categories = [
    { key: 'cpu' as ProductCategory, name: 'Processor', icon: '⚡' },
    { key: 'gpu' as ProductCategory, name: 'Graphics Card', icon: '🎮' },
    { key: 'motherboard' as ProductCategory, name: 'Motherboard', icon: '🔌' },
    { key: 'ram' as ProductCategory, name: 'Memory', icon: '💾' },
    { key: 'storage' as ProductCategory, name: 'Storage', icon: '💿' },
    { key: 'psu' as ProductCategory, name: 'Power Supply', icon: '🔋' },
    { key: 'case' as ProductCategory, name: 'Case', icon: '📦' },
    { key: 'cooling' as ProductCategory, name: 'Cooling', icon: '❄️' }
  ]

  const handleSave = () => {
    if (buildName.trim()) {
      // Here you would typically save to a backend
      console.log('Saving build:', buildName, build)
      setShowSaveDialog(false)
      setBuildName('')
    }
  }

  return (
    <div className="space-y-4">
      {/* Compatibility Status */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-lg">
            {compatibility.compatible ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            )}
            <span>Compatibility</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {compatibility.compatible ? (
            <p className="text-green-600 font-medium text-sm">All components are compatible!</p>
          ) : (
            <div className="space-y-2">
              <p className="text-yellow-600 font-medium text-sm">Compatibility Issues:</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                {compatibility.warnings.map((warning, index) => (
                  <li key={index}>• {warning}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Selected Components */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Selected Components</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            {categories.map(({ key, name, icon }) => {
              const component = build[key]
              return (
                <div key={key} className="flex items-center justify-between p-1.5 border rounded-lg">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs">{icon}</span>
                    <div>
                      <p className="font-medium text-xs">{name}</p>
                      {component ? (
                        <p className="text-xs text-muted-foreground line-clamp-1">{component.name}</p>
                      ) : (
                        <p className="text-xs text-muted-foreground">Not selected</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    {component && (
                      <>
                        <span className="font-semibold text-primary text-xs">
                          {formatPrice(component.price)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onRemoveComponent(key)}
                          className="h-5 w-5"
                        >
                          <Trash2 className="h-2.5 w-2.5" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Total Price */}
      <Card>
        <CardContent className="pt-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-base font-medium">Total Price:</span>
              <span className="text-xl font-bold text-primary">
                {formatPrice(totalPrice)}
              </span>
            </div>
            
            <Button 
              onClick={() => setShowSaveDialog(true)}
              className="w-full"
              disabled={Object.keys(build).length === 0}
              size="sm"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Build
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Save Your Build</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Build Name</label>
                <input
                  type="text"
                  value={buildName}
                  onChange={(e) => setBuildName(e.target.value)}
                  placeholder="My Custom PC"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleSave} className="flex-1" disabled={!buildName.trim()}>
                  Save
                </Button>
                <Button variant="outline" onClick={() => setShowSaveDialog(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
