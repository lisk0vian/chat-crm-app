import { MessageTime } from './time'

type MessageTextProps = {
  text: string
  time: Date | string
}

export const MessageText = ({ text, time }: MessageTextProps) => {
  return (
    <p className='font-medium dark:text-amber-50'>
      {text}
      {/* This span creates fixed blank spacing inside the chat bubble,
      so the timestamp aligns visually like in WhatsApp */}
      <span className='inline-flex'>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span>
      <MessageTime time={time} />
    </p>
  )
}
