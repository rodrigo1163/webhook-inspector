import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { twMerge } from 'tailwind-merge'
import { CheckIcon } from 'lucide-react'

interface CheckboxProps extends RadixCheckbox.CheckboxProps {}

export function Checkbox(props: CheckboxProps) {
  return (
    <RadixCheckbox.Root className={twMerge(
      // Layout
      'flex size-4 shrink-0 items-center justify-center ',
      // Forma
      'rounded',
      // Borda padrão
      'border border-zinc-600',
      // Background padrão
      'bg-zinc-800',
      // Transições
      'transition-colors',
      // Hover
      'hover:border-zinc-500',
      // Focus
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2',
      // Estado checked
      'data-[state=checked]:border-indigo-400 data-[state=checked]:bg-indigo-400'
    )}
    {...props}
    >
      <RadixCheckbox.Indicator className='flex items-center justify-center text-zinc-900'>
        <CheckIcon className='size-3 stroke-3'/>
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  )
}