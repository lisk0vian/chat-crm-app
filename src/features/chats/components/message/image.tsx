import { MessageTime } from './time'

type MessageImageProps = {
  url: string
  caption?: string
  time: Date | string
}

export const MessageImage = ({ url, caption, time }: MessageImageProps) => {
  return (
    <figure>
      <img
        src={url}
        alt={caption ?? 'Image upload'}
        className='w-full rounded-lg object-cover'
      />
      <figcaption className='text-muted-foreground mx-2 mt-2 block text-sm dark:text-neutral-50'>
        {caption}
        {/* This span creates fixed blank spacing inside the chat bubble,
         so the timestamp aligns visually like in WhatsApp */}
        <span className='inline-flex'>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <MessageTime time={time} />
      </figcaption>
    </figure>
  )
}
