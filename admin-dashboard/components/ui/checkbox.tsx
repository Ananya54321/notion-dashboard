import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          className={cn(
            "peer h-5 w-5 shrink-0 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#52c7f3] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 checked:bg-[#52c7f3] checked:border-[#52c7f3]",
            className
          )}
          ref={ref}
          {...props}
        />
        <Check className="absolute left-0.5 top-0.5 h-4 w-4 text-white pointer-events-none hidden peer-checked:block" />
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }

