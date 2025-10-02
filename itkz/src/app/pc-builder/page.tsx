'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, ArrowRight, ArrowLeft, ShoppingCart, Monitor, Cpu, HardDrive, MemoryStick, Zap, Gamepad2, Headphones, Keyboard, Mouse, Wifi, Fan, Thermometer } from 'lucide-react'
import { Loading, PageLoading } from '@/components/ui/loading'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

interface Component {
  id: string
  name: string
  price: number
  image: string
  category: string
  specifications: Record<string, string>
  compatibility?: string[]
  rating: number
  inStock: boolean
}

interface SelectedComponents {
  cpu?: Component
  gpu?: Component
  motherboard?: Component
  ram?: Component
  storage?: Component
  psu?: Component
  case?: Component
  cooler?: Component
  monitor?: Component
  keyboard?: Component
  mouse?: Component
  headset?: Component
  wifi?: Component
  fans?: Component
}

const componentCategories = [
  { id: 'cpu', name: 'Processor (CPU)', icon: Cpu, required: true },
  { id: 'motherboard', name: 'Motherboard', icon: Monitor, required: true },
  { id: 'ram', name: 'Memory (RAM)', icon: MemoryStick, required: true },
  { id: 'gpu', name: 'Graphics Card (GPU)', icon: Gamepad2, required: true },
  { id: 'storage', name: 'Storage', icon: HardDrive, required: true },
  { id: 'psu', name: 'Power Supply', icon: Zap, required: true },
  { id: 'case', name: 'PC Case', icon: Monitor, required: true },
  { id: 'cooler', name: 'CPU Cooler', icon: Thermometer, required: false },
  { id: 'monitor', name: 'Monitor', icon: Monitor, required: false },
  { id: 'keyboard', name: 'Keyboard', icon: Keyboard, required: false },
  { id: 'mouse', name: 'Mouse', icon: Mouse, required: false },
  { id: 'headset', name: 'Headset', icon: Headphones, required: false },
  { id: 'wifi', name: 'WiFi Card', icon: Wifi, required: false },
  { id: 'fans', name: 'Case Fans', icon: Fan, required: false }
]

// Mock components data
const components: Component[] = [
  // CPUs
  {
    id: 'cpu-1',
    name: 'Intel Core i7-13700K',
    price: 35000,
    image: '/placeholder-cpu.jpg',
    category: 'cpu',
    specifications: {
      'Cores': '16 (8P + 8E)',
      'Threads': '24',
      'Base Clock': '3.4 GHz',
      'Boost Clock': '5.4 GHz',
      'Socket': 'LGA 1700',
      'TDP': '125W'
    },
    compatibility: ['motherboard-1', 'motherboard-2'],
    rating: 4.8,
    inStock: true
  },
  {
    id: 'cpu-2',
    name: 'AMD Ryzen 7 7700X',
    price: 32000,
    image: '/placeholder-cpu.jpg',
    category: 'cpu',
    specifications: {
      'Cores': '8',
      'Threads': '16',
      'Base Clock': '4.5 GHz',
      'Boost Clock': '5.4 GHz',
      'Socket': 'AM5',
      'TDP': '105W'
    },
    compatibility: ['motherboard-3', 'motherboard-4'],
    rating: 4.7,
    inStock: true
  },
  // Motherboards
  {
    id: 'motherboard-1',
    name: 'ASUS ROG Strix Z790-E',
    price: 25000,
    image: '/placeholder-motherboard.jpg',
    category: 'motherboard',
    specifications: {
      'Socket': 'LGA 1700',
      'Chipset': 'Intel Z790',
      'Form Factor': 'ATX',
      'Memory Slots': '4x DDR5',
      'PCIe Slots': '3x PCIe 5.0 x16'
    },
    compatibility: ['cpu-1'],
    rating: 4.6,
    inStock: true
  },
  {
    id: 'motherboard-3',
    name: 'MSI MPG X670E Carbon',
    price: 28000,
    image: '/placeholder-motherboard.jpg',
    category: 'motherboard',
    specifications: {
      'Socket': 'AM5',
      'Chipset': 'AMD X670E',
      'Form Factor': 'ATX',
      'Memory Slots': '4x DDR5',
      'PCIe Slots': '2x PCIe 5.0 x16'
    },
    compatibility: ['cpu-2'],
    rating: 4.5,
    inStock: true
  },
  // RAM
  {
    id: 'ram-1',
    name: 'Corsair Vengeance LPX 32GB (2x16GB) DDR5-5600',
    price: 12000,
    image: '/placeholder-ram.jpg',
    category: 'ram',
    specifications: {
      'Capacity': '32GB',
      'Type': 'DDR5',
      'Speed': '5600 MHz',
      'Latency': 'CL36',
      'Voltage': '1.25V',
      'Form Factor': 'DIMM'
    },
    rating: 4.4,
    inStock: true
  },
  // GPUs
  {
    id: 'gpu-1',
    name: 'NVIDIA RTX 4070 Ti',
    price: 65000,
    image: '/placeholder-gpu.jpg',
    category: 'gpu',
    specifications: {
      'VRAM': '12GB GDDR6X',
      'Memory Bus': '192-bit',
      'Base Clock': '2310 MHz',
      'Boost Clock': '2610 MHz',
      'Power Connector': '12VHPWR',
      'TDP': '285W'
    },
    rating: 4.7,
    inStock: true
  },
  // Storage
  {
    id: 'storage-1',
    name: 'Samsung 980 PRO 1TB NVMe SSD',
    price: 8000,
    image: '/placeholder-storage.jpg',
    category: 'storage',
    specifications: {
      'Capacity': '1TB',
      'Interface': 'PCIe 4.0 x4',
      'Form Factor': 'M.2 2280',
      'Read Speed': '7000 MB/s',
      'Write Speed': '5000 MB/s',
      'Endurance': '600 TBW'
    },
    rating: 4.8,
    inStock: true
  },
  // PSUs
  {
    id: 'psu-1',
    name: 'Corsair RM850x 850W 80+ Gold',
    price: 12000,
    image: '/placeholder-psu.jpg',
    category: 'psu',
    specifications: {
      'Wattage': '850W',
      'Efficiency': '80+ Gold',
      'Modular': 'Fully Modular',
      'PCIe Connectors': '4x 8-pin',
      'SATA Connectors': '8',
      'Warranty': '10 years'
    },
    rating: 4.6,
    inStock: true
  },
  // Cases
  {
    id: 'case-1',
    name: 'Fractal Design Define 7',
    price: 15000,
    image: '/placeholder-case.jpg',
    category: 'case',
    specifications: {
      'Form Factor': 'ATX',
      'Material': 'Steel',
      'Side Panel': 'Tempered Glass',
      'Drive Bays': '2x 3.5", 2x 2.5"',
      'Fan Support': '7x 120mm',
      'Radiator Support': '360mm'
    },
    rating: 4.5,
    inStock: true
  },
  // CPU Coolers
  {
    id: 'cooler-1',
    name: 'Noctua NH-D15',
    price: 8000,
    image: '/placeholder-cooler.jpg',
    category: 'cooler',
    specifications: {
      'Type': 'Air Cooler',
      'Socket': 'LGA 1700, AM5',
      'Height': '165mm',
      'Fans': '2x 140mm',
      'Noise': '24.6 dB(A)',
      'TDP': '220W'
    },
    rating: 4.8,
    inStock: true
  },
  // Monitors
  {
    id: 'monitor-1',
    name: 'ASUS ROG Swift PG27UQ 27" 4K',
    price: 45000,
    image: '/placeholder-monitor.jpg',
    category: 'monitor',
    specifications: {
      'Resolution': '3840x2160',
      'Refresh Rate': '144Hz',
      'Panel': 'IPS',
      'Response Time': '4ms',
      'HDR': 'HDR10',
      'Connectivity': 'DisplayPort, HDMI'
    },
    rating: 4.6,
    inStock: true
  },
  // Keyboards
  {
    id: 'keyboard-1',
    name: 'Corsair K95 RGB Platinum XT',
    price: 15000,
    image: '/placeholder-keyboard.jpg',
    category: 'keyboard',
    specifications: {
      'Type': 'Mechanical',
      'Switches': 'Cherry MX Speed',
      'Layout': 'Full Size',
      'Backlight': 'RGB',
      'Connectivity': 'USB',
      'Macro Keys': '6'
    },
    rating: 4.5,
    inStock: true
  },
  // Mice
  {
    id: 'mouse-1',
    name: 'Logitech G Pro X Superlight',
    price: 8000,
    image: '/placeholder-mouse.jpg',
    category: 'mouse',
    specifications: {
      'Sensor': 'HERO 25K',
      'DPI': '25,600',
      'Weight': '63g',
      'Connectivity': 'Wireless',
      'Battery': '70 hours',
      'Buttons': '5'
    },
    rating: 4.7,
    inStock: true
  },
  // Headsets
  {
    id: 'headset-1',
    name: 'SteelSeries Arctis Pro Wireless',
    price: 20000,
    image: '/placeholder-headset.jpg',
    category: 'headset',
    specifications: {
      'Type': 'Wireless',
      'Driver': '40mm',
      'Frequency': '10-40,000 Hz',
      'Battery': '20 hours',
      'Connectivity': '2.4GHz, Bluetooth',
      'Microphone': 'Retractable'
    },
    rating: 4.6,
    inStock: true
  },
  // WiFi Cards
  {
    id: 'wifi-1',
    name: 'ASUS PCE-AX58BT WiFi 6',
    price: 5000,
    image: '/placeholder-wifi.jpg',
    category: 'wifi',
    specifications: {
      'Standard': 'WiFi 6 (802.11ax)',
      'Speed': '2.4Gbps',
      'Interface': 'PCIe x1',
      'Antennas': '2x External',
      'Bluetooth': '5.0',
      'OS Support': 'Windows 10/11'
    },
    rating: 4.4,
    inStock: true
  },
  // Case Fans
  {
    id: 'fans-1',
    name: 'Corsair LL120 RGB 3-Pack',
    price: 6000,
    image: '/placeholder-fans.jpg',
    category: 'fans',
    specifications: {
      'Size': '120mm',
      'Speed': '600-1500 RPM',
      'Airflow': '43.25 CFM',
      'Noise': '24.8 dB(A)',
      'LEDs': '16 RGB LEDs',
      'Connector': '4-pin PWM'
    },
    rating: 4.3,
    inStock: true
  }
]

// Accessories suggestions
const accessories = [
  {
    id: 'monitor-1',
    name: 'ASUS ROG Swift PG27UQ 27" 4K 144Hz',
    price: 45000,
    image: '/placeholder-monitor.jpg',
    category: 'monitor',
    description: 'Perfect for gaming with your RTX 4070 Ti'
  },
  {
    id: 'keyboard-1',
    name: 'Corsair K95 RGB Platinum XT',
    price: 15000,
    image: '/placeholder-keyboard.jpg',
    category: 'keyboard',
    description: 'Mechanical keyboard with Cherry MX switches'
  },
  {
    id: 'mouse-1',
    name: 'Logitech G Pro X Superlight',
    price: 8000,
    image: '/placeholder-mouse.jpg',
    category: 'mouse',
    description: 'Ultra-lightweight gaming mouse'
  }
]

export default function PCBuilderPage() {
  const [selectedComponents, setSelectedComponents] = useState<SelectedComponents>({})
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [showAccessories, setShowAccessories] = useState(false)
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([])

  const getTotalPrice = () => {
    const componentPrice = Object.values(selectedComponents).reduce((total, component) => {
      return total + (component?.price || 0)
    }, 0)
    
    const accessoryPrice = selectedAccessories.reduce((total, accessoryId) => {
      const accessory = accessories.find(a => a.id === accessoryId)
      return total + (accessory?.price || 0)
    }, 0)
    
    return componentPrice + accessoryPrice
  }

  const getSelectedComponent = (categoryId: string) => {
    return selectedComponents[categoryId as keyof SelectedComponents]
  }

  const handleComponentSelect = async (component: Component) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setSelectedComponents(prev => ({
        ...prev,
        [component.category]: component
      }))
      
      // Move to next step if not the last required component
      const currentCategoryIndex = componentCategories.findIndex(cat => cat.id === component.category)
      const nextRequiredCategory = componentCategories.find((cat, index) => 
        index > currentCategoryIndex && cat.required && !selectedComponents[cat.id as keyof SelectedComponents]
      )
      
      if (nextRequiredCategory) {
        setCurrentStep(componentCategories.findIndex(cat => cat.id === nextRequiredCategory.id))
      } else if (Object.keys(selectedComponents).length >= componentCategories.filter(cat => cat.required).length - 1) {
        // All required components selected, show accessories
        setShowAccessories(true)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleAccessoryToggle = (accessoryId: string) => {
    setSelectedAccessories(prev => 
      prev.includes(accessoryId) 
        ? prev.filter(id => id !== accessoryId)
        : [...prev, accessoryId]
    )
  }

  const handleProceedToCheckout = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Redirect to checkout with selected components and accessories
      window.location.href = '/checkout?type=pc-builder'
    } finally {
      setIsLoading(false)
    }
  }

  const getSuggestedComponents = (categoryId: string) => {
    // Always show all components for the current category
    return components.filter(c => c.category === categoryId)
  }

  if (showAccessories) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        {isLoading && <PageLoading text="Processing your build..." />}
        
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Complete Your Setup</h1>
                <p className="text-muted-foreground">Add accessories to complete your PC build</p>
              </div>

              {/* Selected Components Summary */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Your PC Build</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(selectedComponents).map(([category, component]) => (
                      component && (
                        <div key={category} className="text-center">
                          <div className="text-sm font-medium">{componentCategories.find(c => c.id === category)?.name}</div>
                          <div className="text-xs text-muted-foreground">{component.name}</div>
                          <div className="text-sm font-bold text-primary">{formatPrice(component.price)}</div>
                        </div>
                      )
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Components Total:</span>
                      <span className="font-bold text-lg">{formatPrice(Object.values(selectedComponents).reduce((total, c) => total + (c?.price || 0), 0))}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Accessories */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mb-8">
                {accessories.map((accessory) => {
                  const isSelected = selectedAccessories.includes(accessory.id)
                  return (
                    <Card 
                      key={accessory.id} 
                      className={`hover:shadow-md transition-all cursor-pointer ${
                        isSelected 
                          ? 'ring-2 ring-primary bg-primary/5 border-primary' 
                          : 'hover:border-primary/50'
                      }`}
                      onClick={() => handleAccessoryToggle(accessory.id)}
                    >
                      <CardContent className="p-2">
                      <div className="aspect-square bg-muted rounded-md mb-2 flex items-center justify-center">
                        <span className="text-muted-foreground text-xs">IMG</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <input
                          type="checkbox"
                          checked={selectedAccessories.includes(accessory.id)}
                          onChange={() => handleAccessoryToggle(accessory.id)}
                          className="w-3 h-3 text-primary"
                        />
                        <h3 className="font-medium text-xs line-clamp-2 flex-1">{accessory.name}</h3>
                      </div>
                      
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{accessory.description}</p>
                      
                      <div className="text-center">
                        <span className="font-bold text-primary text-sm">{formatPrice(accessory.price)}</span>
                      </div>
                    </CardContent>
                  </Card>
                  )
                })}
              </div>

              {/* Total and Checkout */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-medium">Total Price:</span>
                    <span className="text-2xl font-bold text-primary">{formatPrice(getTotalPrice())}</span>
                  </div>
                  <Button 
                    onClick={handleProceedToCheckout}
                    disabled={isLoading}
                    className="w-full"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <Loading size="sm" className="mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Proceed to Checkout
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {isLoading && <PageLoading text="Loading components..." />}
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">PC Builder</h1>
              <p className="text-muted-foreground">Build your custom PC step by step</p>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pr-1">
                {componentCategories.map((category, index) => {
                  const isSelected = getSelectedComponent(category.id)
                  const isCurrent = index === currentStep
                  const Icon = category.icon
                  
                  return (
                    <div key={category.id} className="flex items-center flex-shrink-0">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        isSelected 
                          ? 'bg-black border-black text-white' 
                          : isCurrent 
                            ? 'border-primary text-primary' 
                            : 'border-muted text-muted-foreground'
                      }`}>
                        {isSelected ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                      </div>
                      <div className="ml-2 text-sm hidden sm:block">
                        <div className={`font-medium ${isSelected ? 'text-black' : isCurrent ? 'text-primary' : 'text-muted-foreground'}`}>
                          {category.name}
                        </div>
                        {isSelected && (
                          <div className="text-xs text-muted-foreground line-clamp-1">
                            {getSelectedComponent(category.id)?.name}
                          </div>
                        )}
                      </div>
                      {index < componentCategories.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-muted-foreground mx-4 hidden sm:inline" />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Current Category Components */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                Select {componentCategories[currentStep]?.name}
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {componentCategories[currentStep] && getSuggestedComponents(componentCategories[currentStep].id).length > 0 ? (
                  getSuggestedComponents(componentCategories[currentStep].id).map((component) => {
                    const isSelected = getSelectedComponent(component.category)?.id === component.id
                    return (
                    <Card 
                      key={component.id} 
                      className={`hover:shadow-md transition-all cursor-pointer group ${
                        isSelected 
                          ? 'ring-2 ring-primary bg-primary/5 border-primary' 
                          : 'hover:border-primary/50'
                      }`}
                    >
                      <CardContent className="p-2">
                      <div className="aspect-square bg-muted rounded-md mb-2 flex items-center justify-center">
                        <span className="text-muted-foreground text-xs">IMG</span>
                      </div>
                      
                      <h3 className="font-medium text-xs line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                        {component.name}
                      </h3>
                      
                      <div className="space-y-1 mb-2">
                        {Object.entries(component.specifications).slice(0, 2).map(([key, value]) => (
                          <div key={key} className="text-xs">
                            <span className="text-muted-foreground text-xs">{key}:</span>
                            <span className="ml-1 font-medium text-xs">{value}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center mb-2">
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-400 text-xs">★</span>
                          <span className="text-xs font-medium">{component.rating}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-sm font-bold text-primary">
                          {formatPrice(component.price)}
                        </div>
                        <Button
                          onClick={() => handleComponentSelect(component)}
                          disabled={!component.inStock || isLoading}
                          size="sm"
                          className={`w-full text-xs h-7 ${
                            isSelected 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-primary hover:bg-primary/90'
                          }`}
                        >
                          {isLoading ? (
                            <Loading size="sm" />
                          ) : isSelected ? (
                            'Selected'
                          ) : (
                            'Select'
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                    )
                  })
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-muted-foreground">No components available for this category.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              <div className="text-center">
                <div className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {componentCategories.length}
                </div>
                <div className="text-xs text-muted-foreground">
                  {Object.keys(selectedComponents).length} components selected
                </div>
              </div>
              
              <Button
                onClick={() => setCurrentStep(Math.min(componentCategories.length - 1, currentStep + 1))}
                disabled={currentStep === componentCategories.length - 1}
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}