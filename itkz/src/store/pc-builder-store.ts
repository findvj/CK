import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PCBuild, Product, ProductCategory } from '@/types'

interface PCBuilderStore {
  currentBuild: Partial<PCBuild['components']>
  builds: PCBuild[]
  addComponent: (category: ProductCategory, product: Product) => void
  removeComponent: (category: ProductCategory) => void
  saveBuild: (name: string) => void
  loadBuild: (buildId: string) => void
  clearCurrentBuild: () => void
  getTotalPrice: () => number
  checkCompatibility: () => { compatible: boolean; warnings: string[] }
}

export const usePCBuilderStore = create<PCBuilderStore>()(
  persist(
    (set, get) => ({
      currentBuild: {},
      builds: [],
      
      addComponent: (category: ProductCategory, product: Product) => {
        set((state) => ({
          currentBuild: {
            ...state.currentBuild,
            [category]: product
          }
        }))
      },
      
      removeComponent: (category: ProductCategory) => {
        set((state) => {
          const newBuild = { ...state.currentBuild }
          delete newBuild[category]
          return { currentBuild: newBuild }
        })
      },
      
      saveBuild: (name: string) => {
        const state = get()
        const totalPrice = state.getTotalPrice()
        const compatibility = state.checkCompatibility()
        
        const newBuild: PCBuild = {
          id: Date.now().toString(),
          name,
          components: state.currentBuild,
          totalPrice,
          compatibility: compatibility.compatible,
          warnings: compatibility.warnings
        }
        
        set((state) => ({
          builds: [...state.builds, newBuild],
          currentBuild: {}
        }))
      },
      
      loadBuild: (buildId: string) => {
        const build = get().builds.find(b => b.id === buildId)
        if (build) {
          set({ currentBuild: build.components })
        }
      },
      
      clearCurrentBuild: () => {
        set({ currentBuild: {} })
      },
      
      getTotalPrice: () => {
        const components = get().currentBuild
        return Object.values(components).reduce((total, product) => {
          return total + (product?.price || 0)
        }, 0)
      },
      
      checkCompatibility: () => {
        const components = get().currentBuild
        const warnings: string[] = []
        
        // Basic compatibility checks
        if (components.cpu && components.motherboard) {
          if (components.cpu.compatibility?.socket !== components.motherboard.compatibility?.socket) {
            warnings.push('CPU socket does not match motherboard socket')
          }
        }
        
        if (components.ram && components.motherboard) {
          if (components.ram.compatibility?.memoryType !== components.motherboard.compatibility?.memoryType) {
            warnings.push('RAM type does not match motherboard memory type')
          }
        }
        
        if (components.gpu && components.case) {
          const gpuLength = components.gpu.compatibility?.dimensions?.length || 0
          const caseLength = components.case.compatibility?.dimensions?.length || 0
          if (gpuLength > caseLength) {
            warnings.push('GPU may be too long for the selected case')
          }
        }
        
        return {
          compatible: warnings.length === 0,
          warnings
        }
      }
    }),
    {
      name: 'pc-builder-storage',
      skipHydration: true,
      partialize: (state) => ({ 
        currentBuild: state.currentBuild,
        builds: state.builds 
      }),
    }
  )
)
