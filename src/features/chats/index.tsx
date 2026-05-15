import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getChatList } from '@/services/chat.service'
import { toast } from 'sonner'
import { useSocket } from '@/context/socket-provider'
import {
  ChatBox,
  ChatList,
  ClientChatDialog,
  ConfigDrawer,
  Header,
  Main,
  NotificationBell,
  ProfileDropdown,
  ThemeSwitch,
} from './components'
import { Search } from './components/icons'
import { ChatsProvider } from './contexts/chats.provider'
import type { Chat } from './types/chat.domain'
import type { Message } from './types/message.domain'
import { ChatSocketEvents as Events } from './types/socket.api'

export function Chats() {
  const queryClient = useQueryClient()
  const [search, _setSearch] = useState('')
  const { socket } = useSocket()
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)

  const handleSendMessage = (body: string) => {
    socket?.emit(Events.sendMessage, {
      chat: selectedChat?.id,
      to: selectedChat?.client.phone,
      body,
    })
    setSelectedChat((chat) => {
      if (chat) {
        chat.status = 'open'
        return chat
      }
      return chat
    })
  }

  useEffect(() => {
    if (!socket || !selectedChat?.id) return

    const handleNewMessage = (newMessage: Message) => {
      queryClient.setQueryData(['chat', 'list'], (oldChats: Chat[] = []) => {
        const exists = oldChats.some((c) => c.id === newMessage.chat)
        if (exists) {
          return oldChats.map((chat) =>
            chat.id === newMessage.chat
              ? { ...chat, lastMessage: newMessage }
              : chat
          )
        }
        return [{ chat: newMessage.chat, lastMessage: newMessage }, ...oldChats]
      })

      queryClient.setQueryData(
        ['chat', newMessage.chat, 'messages'],
        (oldMessages: Message[] | undefined) => {
          if (!oldMessages) return [newMessage]
          console.log(newMessage)
          return [...oldMessages, newMessage]
        }
      )
    }

    socket.on(Events.broadcast, handleNewMessage)

    socket.on('notification', (data) => {
      toast.info(data.message)
    })

    // Cleanup
    return () => {
      socket.off(Events.broadcast, handleNewMessage)
      socket.off('notification')
    }
  }, [socket, selectedChat?.id, queryClient])

  const { data: conversations = [] } = useQuery({
    queryKey: ['chat', 'list'],
    queryFn: getChatList,
    placeholderData: (prev) => prev,
  })

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <NotificationBell />
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main fixed>
        <section className='flex h-full gap-6'>
          <ChatsProvider>
            <ChatList /> {/* Left Side */}
            <ChatBox /> {/* Right Side */}
            <ClientChatDialog />
          </ChatsProvider>
        </section>
      </Main>
    </>
  )
}
