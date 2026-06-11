import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getChatList } from '@/services/chat.service'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { Chat } from '../../types/chat.domain'
import { ChatListHeader } from './chat-list-header'
import { ChatListItem } from './chat-list-item'

export const ChatList = () => {
  const [search, setSearch] = useState('')

  const { data: chats = [] } = useQuery({
    queryKey: ['chat', 'list'],
    queryFn: getChatList,
    placeholderData: (prev) => prev,
  })

  const filterFun = ({ client }: { client: Chat['client'] }) => {
    if (search.trim() === '') return true
    return client?.username
      ?.toLowerCase()
      ?.includes(search.trim().toLowerCase())
  }

  return (
    <div className='flex w-full flex-col gap-2 sm:w-56 lg:w-72 2xl:w-80'>
      <ChatListHeader searchState={{ search, setSearch }} />

      <ScrollArea className='-mx-3 h-full overflow-scroll p-3'>
        {chats.filter(filterFun).map((chatUsr) => {
          return <ChatListItem key={chatUsr.id} chat={chatUsr} />
        })}
      </ScrollArea>
    </div>
  )
}
