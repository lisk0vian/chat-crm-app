import { useState } from 'react'
import { Fragment } from 'react/jsx-runtime'
import { format } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { getMessagesByChatId } from '@/services/chat.service'
import {
  ArrowLeft,
  ImagePlus,
  MessagesSquare,
  MoreVertical,
  Paperclip,
  Send,
} from 'lucide-react'
import { parsePhoneNumber } from 'react-phone-number-input'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useChatBox } from '../contexts/chat-box.provider'
import { getChatDateLabel } from '../utils/chat.util'
import { groupMessagesByDate } from '../utils/messages.util'
import { AssignedUser } from './assigned-user'
import { SentimentIndicator } from './sentiment-indicator'

export const ChatBox = () => {
  const { sentimentData, chatSelected, setChatSelected, mobile, setMobile } =
    useChatBox()
  const [messageInput, setMessageInput] = useState<string | undefined>()

  const { data: messages } = useQuery({
    queryKey: ['chat', chatSelected?.id, 'messages'],
    queryFn: () => getMessagesByChatId(chatSelected!.id),
    enabled: !!chatSelected?.id,
    select: (m) => groupMessagesByDate(m),
  })

  return chatSelected ? (
    <div
      className={cn(
        'bg-background absolute inset-0 start-full z-50 hidden w-full',
        'flex-1 flex-col border shadow-xs sm:static sm:z-auto sm:flex sm:rounded-md',
        mobile && 'start-0 flex'
      )}
    >
      {/* Top Part */}
      <div className='bg-card mb-1 flex flex-none justify-between p-4 shadow-lg sm:rounded-t-md'>
        {/* Left */}
        <div className='flex gap-3'>
          <Button
            size='icon'
            variant='ghost'
            className='-ms-2 h-full sm:hidden'
            onClick={() => {
              setChatSelected(null)
              setMobile(false)
            }}
          >
            <ArrowLeft className='rtl:rotate-180' />
          </Button>
          <div className='flex items-center gap-2 lg:gap-4'>
            <Avatar className='size-9 lg:size-11'>
              <AvatarImage
                src={chatSelected.client?.username}
                alt={chatSelected.client?.username}
              />
              <AvatarFallback className='font-bold'>
                {chatSelected.client?.username?.charAt(0) ?? 'N/A'}
              </AvatarFallback>
            </Avatar>
            <div>
              <span className='col-start-2 row-span-2 text-sm font-medium lg:text-base'>
                {chatSelected?.client?.username ?? 'Desconocido'}
              </span>
              <span
                className={cn(
                  'text-muted-foreground col-start-2 row-span-2 row-start-2',
                  'line-clamp-1 block max-w-32 text-xs text-nowrap text-ellipsis lg:max-w-none lg:text-sm'
                )}
              >
                {parsePhoneNumber(
                  chatSelected.client.phone ?? '',
                  'PE'
                )?.formatInternational() || chatSelected.client.phone}
              </span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className='-me-1 flex items-center gap-1 lg:gap-2'>
          {/* here */}
          <SentimentIndicator sentiment={sentimentData} />
          <AssignedUser chatId={chatSelected.id} />
          <Button
            size='icon'
            variant='ghost'
            className='h-10 rounded-md sm:h-8 sm:w-4 lg:h-10 lg:w-6'
          >
            <MoreVertical className='stroke-muted-foreground sm:size-5' />
          </Button>
        </div>
      </div>

      {/* Conversation */}
      <div className='flex flex-1 flex-col gap-2 rounded-md px-4 pt-0 pb-4'>
        <div className='flex size-full flex-1'>
          <div className='chat-text-container relative -me-4 flex flex-1 flex-col overflow-y-hidden'>
            <div className='chat-flex flex h-40 w-full grow flex-col-reverse justify-start gap-4 overflow-y-auto py-2 pe-4 pb-4'>
              {messages &&
                Object.keys(messages).map((key) => (
                  <Fragment key={key}>
                    {messages[key].map((msg, index) => (
                      <div
                        key={`${chatSelected.client.username ?? 'N/A'}-${msg.createdAt}-${index}`}
                        className={cn(
                          'chat-box max-w-72 px-3 py-2 break-words shadow-lg',
                          msg.direction === 'out'
                            ? 'bg-primary/90 text-primary-foreground/75 self-end rounded-[16px_16px_0_16px]'
                            : 'bg-muted self-start rounded-[16px_16px_16px_0]'
                        )}
                      >
                        {msg.content}{' '}
                        <span
                          className={cn(
                            'text-foreground/75 mt-1 block text-xs font-light italic',
                            msg.direction === 'out' &&
                              'text-primary-foreground/85 text-end'
                          )}
                        >
                          {format(msg.createdAt, 'h:mm a')}
                        </span>
                      </div>
                    ))}
                    <div className='text-center text-xs'>
                      {getChatDateLabel(key)}
                    </div>
                  </Fragment>
                ))}
            </div>
          </div>
        </div>
        <form
          className='flex w-full flex-none gap-2'
          onSubmit={(e) => {
            e.preventDefault()
            // handleSendMessage(messageInput)
            setMessageInput('')
          }}
        >
          <div
            className={cn(
              'border-input bg-card focus-within:ring-ring flex flex-1 items-center',
              'gap-2 rounded-md border px-2 py-1 focus-within:ring-1 focus-within:outline-hidden lg:gap-4'
            )}
          >
            <div className='space-x-1'>
              <Button
                size='icon'
                type='button'
                variant='ghost'
                className='hidden h-8 rounded-md lg:inline-flex'
              >
                <ImagePlus size={20} className='stroke-muted-foreground' />
              </Button>
              <Button
                size='icon'
                type='button'
                variant='ghost'
                className='hidden h-8 rounded-md lg:inline-flex'
              >
                <Paperclip size={20} className='stroke-muted-foreground' />
              </Button>
            </div>
            <label className='flex-1'>
              <span className='sr-only'>Chat Text Box</span>
              <Input
                placeholder='Type your messages...'
                className='h-8 w-full bg-inherit focus-visible:outline-hidden'
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
            </label>
            <Button
              variant='ghost'
              size='icon'
              className='hidden sm:inline-flex'
            >
              <Send size={20} />
            </Button>
          </div>
          <Button className='h-full sm:hidden'>
            <Send size={18} /> Send
          </Button>
        </form>
      </div>
    </div>
  ) : (
    <div
      className={cn(
        'bg-card absolute inset-0 start-full z-50 hidden w-full',
        'flex-1 flex-col justify-center rounded-md border shadow-xs sm:static sm:z-auto sm:flex'
      )}
    >
      <div className='flex flex-col items-center space-y-6'>
        <div className='border-border flex size-16 items-center justify-center rounded-full border-2'>
          <MessagesSquare className='size-8' />
        </div>
        <div className='space-y-2 text-center'>
          <h1 className='text-xl font-semibold'>Your messages</h1>
          <p className='text-muted-foreground text-sm'>
            Send a message to start a chat.
          </p>
        </div>
        {/* <Button onClick={() => setCreateConversationDialog(true)}>
              Send message
            </Button> */}
      </div>
    </div>
  )
}
