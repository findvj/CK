import { Product } from '@/types'

export const products: Product[] = [
  // CPUs
  {
    id: 'cpu-1',
    name: 'Intel Core i9-13900K',
    description: 'High-performance 24-core processor with integrated graphics',
    price: 48999,
    image: '/images/cpu-intel-i9-13900k.jpg',
    category: 'cpu',
    brand: 'Intel',
    specifications: {
      'Cores': '24 (8P + 16E)',
      'Base Clock': '3.0 GHz',
      'Boost Clock': '5.8 GHz',
      'TDP': '125W',
      'Socket': 'LGA1700'
    },
    inStock: true,
    stockQuantity: 15,
    rating: 4.8,
    reviewCount: 234,
    compatibility: {
      socket: 'LGA1700',
      powerRequirement: 125
    }
  },
  {
    id: 'cpu-2',
    name: 'AMD Ryzen 9 7950X',
    description: '16-core, 32-thread processor with excellent multi-threading performance',
    price: 57999,
    image: '/images/cpu-amd-ryzen-7950x.jpg',
    category: 'cpu',
    brand: 'AMD',
    specifications: {
      'Cores': '16',
      'Base Clock': '4.5 GHz',
      'Boost Clock': '5.7 GHz',
      'TDP': '170W',
      'Socket': 'AM5'
    },
    inStock: true,
    stockQuantity: 8,
    rating: 4.9,
    reviewCount: 189,
    compatibility: {
      socket: 'AM5',
      powerRequirement: 170
    }
  },
  
  // GPUs
  {
    id: 'gpu-1',
    name: 'NVIDIA GeForce RTX 4090',
    description: 'Flagship gaming GPU with 24GB GDDR6X memory',
    price: 132999,
    image: '/images/gpu-rtx-4090.jpg',
    category: 'gpu',
    brand: 'NVIDIA',
    specifications: {
      'Memory': '24GB GDDR6X',
      'Memory Bus': '384-bit',
      'Base Clock': '2230 MHz',
      'Boost Clock': '2520 MHz',
      'Power Consumption': '450W'
    },
    inStock: true,
    stockQuantity: 5,
    rating: 4.7,
    reviewCount: 156,
    compatibility: {
      powerRequirement: 450,
      dimensions: {
        length: 304,
        width: 137,
        height: 61
      }
    }
  },
  {
    id: 'gpu-2',
    name: 'AMD Radeon RX 7900 XTX',
    description: 'High-end gaming GPU with 24GB GDDR6 memory',
    price: 82999,
    image: '/images/gpu-rx-7900-xtx.jpg',
    category: 'gpu',
    brand: 'AMD',
    specifications: {
      'Memory': '24GB GDDR6',
      'Memory Bus': '384-bit',
      'Base Clock': '1900 MHz',
      'Boost Clock': '2500 MHz',
      'Power Consumption': '355W'
    },
    inStock: true,
    stockQuantity: 12,
    rating: 4.6,
    reviewCount: 98,
    compatibility: {
      powerRequirement: 355,
      dimensions: {
        length: 287,
        width: 135,
        height: 51
      }
    }
  },
  
  // Motherboards
  {
    id: 'mb-1',
    name: 'ASUS ROG Strix Z790-E Gaming WiFi',
    description: 'Premium motherboard with WiFi 6E and PCIe 5.0 support',
    price: 37299,
    image: '/images/mb-asus-z790-e.jpg',
    category: 'motherboard',
    brand: 'ASUS',
    specifications: {
      'Socket': 'LGA1700',
      'Chipset': 'Intel Z790',
      'Form Factor': 'ATX',
      'Memory Slots': '4x DDR5',
      'PCIe Slots': '2x PCIe 5.0 x16'
    },
    inStock: true,
    stockQuantity: 20,
    rating: 4.8,
    reviewCount: 67,
    compatibility: {
      socket: 'LGA1700',
      formFactor: 'ATX',
      memoryType: 'DDR5'
    }
  },
  {
    id: 'mb-2',
    name: 'MSI MPG X670E Carbon WiFi',
    description: 'High-end AMD motherboard with PCIe 5.0 and USB4 support',
    price: 33199,
    image: '/images/mb-msi-x670e-carbon.jpg',
    category: 'motherboard',
    brand: 'MSI',
    specifications: {
      'Socket': 'AM5',
      'Chipset': 'AMD X670E',
      'Form Factor': 'ATX',
      'Memory Slots': '4x DDR5',
      'PCIe Slots': '2x PCIe 5.0 x16'
    },
    inStock: true,
    stockQuantity: 18,
    rating: 4.7,
    reviewCount: 45,
    compatibility: {
      socket: 'AM5',
      formFactor: 'ATX',
      memoryType: 'DDR5'
    }
  },
  
  // RAM
  {
    id: 'ram-1',
    name: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5-6000',
    description: 'High-speed DDR5 memory with RGB lighting',
    price: 16599,
    image: '/images/ram-corsair-vengeance-rgb.jpg',
    category: 'ram',
    brand: 'Corsair',
    specifications: {
      'Capacity': '32GB (2x16GB)',
      'Speed': 'DDR5-6000',
      'Timings': 'CL36-36-36-96',
      'Voltage': '1.35V',
      'Type': 'DDR5'
    },
    inStock: true,
    stockQuantity: 25,
    rating: 4.9,
    reviewCount: 123,
    compatibility: {
      memoryType: 'DDR5'
    }
  },
  
  // Storage
  {
    id: 'storage-1',
    name: 'Samsung 980 PRO 2TB NVMe SSD',
    description: 'High-performance PCIe 4.0 NVMe SSD with 2TB capacity',
    price: 20799,
    image: '/images/ssd-samsung-980-pro.jpg',
    category: 'storage',
    brand: 'Samsung',
    specifications: {
      'Capacity': '2TB',
      'Interface': 'PCIe 4.0 x4',
      'Read Speed': '7,000 MB/s',
      'Write Speed': '5,100 MB/s',
      'Form Factor': 'M.2 2280'
    },
    inStock: true,
    stockQuantity: 30,
    rating: 4.8,
    reviewCount: 89,
    compatibility: {
      formFactor: 'M.2'
    }
  },
  
  // PSUs
  {
    id: 'psu-1',
    name: 'Corsair RM1000x (2021) 1000W 80+ Gold',
    description: 'Fully modular 1000W power supply with 80+ Gold efficiency',
    price: 15799,
    image: '/images/psu-corsair-rm1000x.jpg',
    category: 'psu',
    brand: 'Corsair',
    specifications: {
      'Wattage': '1000W',
      'Efficiency': '80+ Gold',
      'Modular': 'Fully Modular',
      'Fan': '140mm Fluid Dynamic Bearing',
      'Warranty': '10 Years'
    },
    inStock: true,
    stockQuantity: 15,
    rating: 4.9,
    reviewCount: 78,
    compatibility: {
      powerRequirement: 1000
    }
  },
  
  // Cases
  {
    id: 'case-1',
    name: 'Fractal Design Torrent RGB',
    description: 'Premium full-tower case with excellent airflow and RGB fans',
    price: 19099,
    image: '/images/case-fractal-torrent-rgb.jpg',
    category: 'case',
    brand: 'Fractal Design',
    specifications: {
      'Form Factor': 'Full Tower',
      'Motherboard Support': 'E-ATX, ATX, mATX, ITX',
      'GPU Length': 'Up to 461mm',
      'CPU Cooler Height': 'Up to 188mm',
      'Fans Included': '3x 140mm RGB'
    },
    inStock: true,
    stockQuantity: 12,
    rating: 4.7,
    reviewCount: 56,
    compatibility: {
      formFactor: 'Full Tower',
      dimensions: {
        length: 461,
        width: 240,
        height: 530
      }
    }
  },
  
  // Cooling
  {
    id: 'cooling-1',
    name: 'Noctua NH-D15 chromax.black',
    description: 'Premium dual-tower CPU cooler with excellent cooling performance',
    price: 8299,
    image: '/images/cooler-noctua-nh-d15.jpg',
    category: 'cooling',
    brand: 'Noctua',
    specifications: {
      'Type': 'Air Cooler',
      'Heat Pipes': '6x 6mm',
      'Fan Size': '2x 140mm',
      'Noise Level': '24.6 dB(A)',
      'Compatibility': 'Intel LGA1700, AMD AM5'
    },
    inStock: true,
    stockQuantity: 20,
    rating: 4.9,
    reviewCount: 234,
    compatibility: {
      socket: 'Universal'
    }
  },
  
  // Accessories
  {
    id: 'acc-1',
    name: 'ARGB LED Strip Kit',
    description: 'Addressable RGB LED lighting kit to illuminate your PC build',
    price: 1299,
    image: '/images/fractalRGB2.jpg',
    category: 'accessories',
    brand: 'Corsair',
    specifications: {
      'Length': '2 x 30cm',
      'LED Type': 'Addressable RGB',
      'Connector': '3-pin ARGB',
      'Compatibility': 'Most ARGB controllers & motherboards'
    },
    inStock: true,
    stockQuantity: 40,
    rating: 4.6,
    reviewCount: 32
  },
  
  // Prebuilt PCs
  {
    id: 'prebuilt-1',
    name: 'Gaming Beast Pro',
    description: 'High-FPS 1440p/4K gaming PC tuned for performance and thermals',
    price: 189999,
    image: '/images/gaming-beast-pro.jpg',
    category: 'prebuilt',
    brand: 'Bhupati Builds',
    specifications: {
      'CPU': 'Intel Core i7-13700K',
      'GPU': 'NVIDIA GeForce RTX 4070 Ti',
      'RAM': '32GB DDR5-6000',
      'Storage': '1TB NVMe SSD',
      'Motherboard': 'Z790 ATX',
      'PSU': '850W 80+ Gold',
      'Case': 'ATX Mid Tower'
    },
    inStock: true,
    stockQuantity: 6,
    rating: 4.8,
    reviewCount: 21
  },
  {
    id: 'prebuilt-2',
    name: 'Ultimate Performance',
    description: 'Workstation-class PC for 4K gaming, editing, and AI workloads',
    price: 259999,
    image: '/images/ultimate-performance.jpg',
    category: 'prebuilt',
    brand: 'Bhupati Builds',
    specifications: {
      'CPU': 'AMD Ryzen 9 7950X',
      'GPU': 'NVIDIA GeForce RTX 4090',
      'RAM': '64GB DDR5-6000',
      'Storage': '2TB NVMe Gen4 SSD',
      'Motherboard': 'X670E ATX',
      'PSU': '1000W 80+ Gold',
      'Case': 'Full Tower High-Airflow'
    },
    inStock: true,
    stockQuantity: 3,
    rating: 4.9,
    reviewCount: 12
  }
]

export const categories = [
  { id: 'motherboard', name: 'Motherboard', icon: '🔌' },
  { id: 'cpu', name: 'Processor', icon: '⚡' },
  { id: 'ram', name: 'Memory (RAM)', icon: '💾' },
  { id: 'psu', name: 'Power Supply', icon: '🔋' },
  { id: 'monitors', name: 'Monitors', icon: '🖥️' },
  { id: 'cooling', name: 'Cooling System', icon: '❄️' },
  { id: 'case', name: 'Cabinets', icon: '📦' },
  { id: 'accessories', name: 'Accessories', icon: '🎯' },
  { id: 'peripherals', name: 'Peripherals', icon: '🖱️' },
  { id: 'gpu', name: 'Graphics Cards', icon: '🎮' },
  { id: 'storage', name: 'Storage', icon: '💿' },
  { id: 'prebuilt', name: 'Pre-built PCs', icon: '🖥️' }
]
