import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 appearance-none",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50 pointer-events-none" />
    </div>
  )
)
Select.displayName = "Select"

// Export the main Select component
export { Select }

// Simple wrapper components for compatibility
export const SelectTrigger = Select
export const SelectContent = ({ children }: { children: React.ReactNode }) => <>{children}</>
export const SelectValue = ({ placeholder }: { placeholder?: string }) => (
  <option value="" disabled>{placeholder}</option>
)
export const SelectItem = ({ value, children }: { value: string; children: React.ReactNode }) => (
  <option value={value}>{children}</option>
)
export const SelectGroup = ({ children }: { children: React.ReactNode }) => <>{children}</>
export const SelectLabel = ({ children }: { children: React.ReactNode }) => (
  <optgroup label={children as string} />
)
export const SelectSeparator = () => null
export const SelectScrollUpButton = () => null
export const SelectScrollDownButton = () => null
