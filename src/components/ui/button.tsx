import { type ButtonHTMLAttributes, forwardRef } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "purple"
  size?: "sm" | "md" | "lg"
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-medium transition-all duration-300 cursor-pointer select-none active:scale-[0.97]"
    const sizes = {
      sm: "text-sm px-5 py-2 gap-1.5 h-10",
      md: "text-base px-7 py-3 gap-2 h-12",
      lg: "text-lg px-9 py-4 gap-2.5 h-14",
    }
    const variants = {
      primary: "gradient-btn text-white font-semibold rounded-full",
      ghost:
        "bg-transparent text-text-secondary rounded-full border border-[#2A3245] hover:border-purple hover:text-white",
      purple:
        "bg-transparent text-white font-semibold rounded-full border border-purple hover:bg-purple/10 hover:shadow-glow-purple",
    }
    return (
      <button
        ref={ref}
        className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
