import { format } from 'date-fns'
import { cn } from '@/lib/utils'

type MessageProps = {
  isMe: boolean
  key: string
  direction: ''
  msg: {
    body: ''
    timestamp: string
  }
}

export const Message = ({ isMe, key, msg }: MessageProps) => {
  return (
    <div
      key={key}
      className={cn(
        'chat-box max-w-72 px-3 py-2 break-words shadow-lg',
        isMe
          ? 'bg-primary/90 text-primary-foreground/75 self-end rounded-[16px_16px_0_16px]'
          : 'bg-muted self-start rounded-[16px_16px_16px_0]'
      )}
    >
      {msg.body}{' '}
      <span
        className={cn(
          'text-foreground/75 mt-1 block text-xs font-light italic',
          isMe && 'text-primary-foreground/85 text-end'
        )}
      >
        {format(msg.timestamp, 'h:mm a')}
      </span>
    </div>
  )
}
