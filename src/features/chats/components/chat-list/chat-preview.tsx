import { cn } from '@/lib/utils'
import type { Chat } from '../../types/chat.domain'

export const ChatPreview = ({
  preview,
  isMe,
}: {
  preview: Chat['preview']
  isMe: boolean
}) => {
  let lastMsg = ''
  const content = preview?.content

  if (content && typeof content === 'object') {
    if ('body' in content) {
      lastMsg = isMe ? `Yo: ${content.body}` : content.body
    } else if ('filename' in content) {
      lastMsg = isMe
        ? `Yo: Documento (${content.filename})`
        : `Documento (${content.filename})`
    } else if ('link' in content) {
      lastMsg = isMe ? `Yo: Media` : `Media`
    }
  } else {
    // fallback if content is string
    lastMsg = String(content)
  }
  return (
    <span
      className={cn(
        'col-start-2 row-span-2 row-start-2 line-clamp-2',
        'text-muted-foreground group-hover:text-accent-foreground/90 text-ellipsis'
      )}
    >
      {lastMsg}
    </span>
  )
}
