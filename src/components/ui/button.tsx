import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[5px] font-normal transition-colors cursor-pointer no-underline disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        default: "border-2 border-black bg-transparent text-black hover:bg-black hover:text-custom-green",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90",
        outline:
          "border-2 border-black bg-transparent text-black hover:bg-black hover:text-white",
        secondary:
          "bg-custom-gray text-white hover:bg-custom-dark",
        ghost:
          "hover:bg-accent hover:text-accent-foreground",
        link: "text-black underline-offset-4 hover:underline",
      },
      size: {
        default: "px-[clamp(20px,3vw,40px)] py-[15px] text-[clamp(18px,2vw,25px)]",
        sm: "px-[clamp(15px,2vw,30px)] py-[10px] text-[clamp(14px,1.5vw,18px)]",
        lg: "px-[clamp(25px,4vw,50px)] py-[20px] text-[clamp(20px,2.5vw,30px)]",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
