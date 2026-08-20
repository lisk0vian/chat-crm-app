import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2, Check, AlertTriangle, Download } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export type DownloadButtonState = 'idle' | 'downloading' | 'complete' | 'error'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border-2 border-accent bg-transparent hover:bg-accent hover:text-accent-foreground/150',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface DownloadButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Estado actual del ciclo de descarga */
  state: DownloadButtonState
  /** Progreso 0-100, dibuja el borde como anillo de carga */
  progress?: number
  /** Se llama al hacer click en estado idle (o error, para reintentar) */
  onDownload?: () => void
  /** Ms antes de volver automáticamente a "idle" tras completar. 0 = sin auto-reset */
  autoResetMs?: number
  /** Obligatorio: el botón no tiene texto visible */
  'aria-label': string
}

export function DownloadButton({
  state,
  progress = 0,
  onDownload,
  autoResetMs = 0,
  className,
  size,
  disabled,
  onClick,
  variant = 'outline',
  ...props
}: DownloadButtonProps) {
  const [internalState, setInternalState] =
    React.useState<DownloadButtonState>(state)

  React.useEffect(() => {
    setInternalState(state)
  }, [state])

  React.useEffect(() => {
    if (internalState === 'complete' && autoResetMs > 0) {
      const t = setTimeout(() => setInternalState('idle'), autoResetMs)
      return () => clearTimeout(t)
    }
  }, [internalState, autoResetMs])

  const clampedProgress = Math.min(100, Math.max(0, progress))
  const isDownloading = internalState === 'downloading'
  const isComplete = internalState === 'complete'
  const isError = internalState === 'error'

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDownloading) return
    onClick?.(e)
    if ((internalState === 'idle' || internalState === 'error') && onDownload) {
      onDownload()
    }
  }

  const icon = React.useMemo(() => {
    if (isDownloading) return <Loader2 className='size-4 animate-spin' />
    if (isComplete) return <Check className='size-4' />
    if (isError) return <AlertTriangle className='size-4' />
    return <Download className='size-4' />
  }, [isDownloading, isComplete, isError])

  const sweep = isComplete ? 360 : clampedProgress * 3.6

  return (
    <div
      className='relative inline-block rounded-md p-[2px] transition-[background] duration-150'
      style={{
        background:
          isDownloading || isComplete
            ? `conic-gradient(from 0deg, hsl(var(--primary)) ${sweep}deg, hsl(var(--border)) ${sweep}deg)`
            : 'hsl(var(--border))',
      }}
    >
      <Button
        type='button'
        className={cn(
          'size-full rounded-[calc(var(--radius)-2px)] border-0 p-0',
          buttonVariants({ variant, size, className }),
          isError && 'text-destructive'
        )}
        disabled={disabled || isDownloading}
        onClick={handleClick}
        aria-busy={isDownloading}
        {...props}
      >
        {icon}
      </Button>
    </div>
  )
}
