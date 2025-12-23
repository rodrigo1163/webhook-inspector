import type { ComponentProps, ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const iconButton = tv({
  base: 'flex items-center justify-center rounded-lg hover:bg-zinc-700 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent',
  variants: {
    size: {
      sm: 'size-6',
      md: 'size-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

interface IconButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof iconButton> {
  icon: ReactNode
}

export function IconButton({
  icon,
  size,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={iconButton({ size, className })}
      {...props}
    >
      {icon}
    </button>
  )
}
