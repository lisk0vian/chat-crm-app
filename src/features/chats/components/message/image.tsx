import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { MessageTime } from './time'

const apiUrl = import.meta.env.VITE_API_URL

type MessageImageProps = {
  url: string
  caption?: string
  time: Date | string
}

export const MessageImage = ({
  url,
  caption = 'Imagen recibida',
  time,
}: MessageImageProps) => {
  return (
    <Dialog defaultOpen={false}>
      <DialogTrigger asChild>
        <figure>
          <img
            src={apiUrl + url}
            alt={caption}
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
      </DialogTrigger>
      <DialogContent className='pb-4 sm:max-w-5xl'>
        <DialogTitle className='capitalize'>vista previa</DialogTitle>
        <DialogDescription>{caption}</DialogDescription>
        <figure>
          <img
            src={apiUrl + url}
            alt={caption}
            className='w-full rounded-lg object-cover'
          />
        </figure>
      </DialogContent>
    </Dialog>
  )
}
