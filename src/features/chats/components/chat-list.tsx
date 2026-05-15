import { useState } from 'react'
import { Fragment } from 'react/jsx-runtime'
import { useQuery } from '@tanstack/react-query'
import { getChatList } from '@/services/chat.service'
import { parsePhoneNumber } from 'react-phone-number-input'
import { cn } from '@/lib/utils'
import { useSocket } from '@/context/socket-provider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button, ScrollArea, Separator } from '.'
import { useChatBox } from '../contexts/chat-box.provider'
import { ChatSocketEvents as Events } from '../types/socket.api'
import { Edit, MessagesSquare, SearchIcon, User } from './icons'

export const ChatList = () => {
  const { socket } = useSocket()
  const [search, setSearch] = useState('')
  const [_createConversationDialogOpened, setCreateConversationDialog] =
    useState(false)
  const { setChatSelected, chatId, setChatId, setMobile } = useChatBox()
  const { setSearchClientDialog } = useChatBox()

  const { data: chats = [] } = useQuery({
    queryKey: ['chat', 'list'],
    queryFn: getChatList,
    placeholderData: (prev) => prev,
  })

  const filteredChatList = chats.filter(({ client }) => {
    if (search.trim() === '') return true
    return client?.username
      ?.toLowerCase()
      ?.includes(search.trim().toLowerCase())
  })

  return (
    <div className='flex w-full flex-col gap-2 sm:w-56 lg:w-72 2xl:w-80'>
      <div
        className={cn(
          'bg-background sticky top-0 z-10 -mx-4 px-4 pb-3',
          'shadow-md sm:static sm:z-auto sm:mx-0 sm:p-0 sm:shadow-none'
        )}
      >
        <div className='flex items-center justify-between py-2'>
          <div className='flex gap-2'>
            <h1 className='text-2xl font-bold'>Inbox</h1>
            <MessagesSquare size={20} />
          </div>

          <Button
            size='icon'
            variant='ghost'
            onClick={() => {
              setSearchClientDialog(true)
              console.log('despues del click')
            }}
            className='rounded-lg'
          >
            <Edit size={24} className='stroke-muted-foreground' />
          </Button>
        </div>

        <label
          className={cn(
            'focus-within:ring-ring focus-within:ring-1 focus-within:outline-hidden',
            'border-border flex h-10 w-full items-center space-x-0 rounded-md border ps-2'
          )}
        >
          <SearchIcon size={15} className='me-2 stroke-slate-500' />
          <span className='sr-only'>Search</span>
          <input
            type='text'
            className='w-full flex-1 bg-inherit text-sm focus-visible:outline-hidden'
            placeholder='Search chat...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>

      <ScrollArea className='-mx-3 h-full overflow-scroll p-3'>
        {filteredChatList.map((chatUsr) => {
          const { id, client, message } = chatUsr
          const lastMsg = message?.id
            ? `Yo: ${message.content}`
            : message?.content
          return (
            <Fragment key={id}>
              <button
                type='button'
                className={cn(
                  'group hover:bg-accent hover:text-accent-foreground',
                  `flex w-full rounded-md px-2 py-2 text-start text-sm`,
                  chatId === id && 'sm:bg-muted'
                )}
                onClick={() => {
                  socket?.emit(Events.join, chatUsr.id)
                  setChatSelected(chatUsr)
                  setChatId(chatUsr.id)
                  console.log(chatUsr.id, chatUsr.client.phone)
                  setMobile(true)
                }}
              >
                <div className='flex gap-2'>
                  <Avatar>
                    <AvatarImage
                      src={client?.username}
                      alt={client?.username}
                    />
                    <AvatarFallback className='font-bold'>
                      {client?.username?.charAt(0) || <User />}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span className='col-start-2 row-span-2 font-medium'>
                      {client?.username ??
                        parsePhoneNumber(
                          client?.phone ?? '',
                          'PE'
                        )?.formatNational() ??
                        'unknown'}
                      {/* <Badge
                              variant={
                                chatUsr.status === 'pending'
                                  ? 'secondary'
                                  : 'default'
                              }
                              className='ml-2'
                            >
                              {chatUsr.status}
                            </Badge> */}
                    </span>
                    <span
                      className={cn(
                        'col-start-2 row-span-2 row-start-2 line-clamp-2',
                        'text-muted-foreground group-hover:text-accent-foreground/90 text-ellipsis'
                      )}
                    >
                      {lastMsg}
                    </span>
                  </div>
                </div>
              </button>
              <Separator className='my-1' />
            </Fragment>
          )
        })}
      </ScrollArea>
    </div>
  )
}
