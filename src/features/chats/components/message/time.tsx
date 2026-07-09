import { format } from 'date-fns'

type MessageTimeProps = { time: Date | string }

export const MessageTime = ({ time }: MessageTimeProps) => {
  return (
    <span className='absolute right-0 bottom-0 mr-2 w-12 pb-1.5 text-end text-xs font-extralight italic'>
      {format(time, 'h:mm a')}
    </span>
  )
}
