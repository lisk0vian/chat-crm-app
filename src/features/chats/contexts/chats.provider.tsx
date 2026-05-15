import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import type { Chat, ChatSentiment } from '../types/chat.domain'

type ChatBoxContextType = {
  chatSelected: Chat | null
  setChatSelected: (chat: Chat | null) => void
  sentimentData?: ChatSentiment
  setSentimentData: (data?: ChatSentiment) => void
  chatId?: string
  setChatId: (id: string) => void
  mobile: boolean
  setMobile: (m: boolean) => void
  searchClientDialog: boolean
  setSearchClientDialog: (b: boolean) => void
}

const ChatsContext = createContext<ChatBoxContextType | undefined>(undefined)

export const ChatsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [chatId, setChatId] = useState<string | undefined>(undefined)
  const [mobile, setMobile] = useState(false)
  const [searchClientDialog, setSearchClientDialog] = useState(false)
  const [chatSelected, setChatSelected] = useState<Chat | null>(null)
  const [sentimentData, setSentimentData] = useState<ChatSentiment | undefined>(
    {
      avgPos: 0,
      avgNeg: 0,
      avgNeu: 0,
      totalMessages: 0,
      dominant: 'NEU',
    }
  )

  return (
    <ChatsContext
      value={{
        chatSelected,
        setChatSelected,
        sentimentData,
        setSentimentData,
        chatId,
        setChatId,
        searchClientDialog,
        setSearchClientDialog,
        mobile,
        setMobile,
      }}
    >
      {children}
    </ChatsContext>
  )
}

export const useChats = () => {
  const context = useContext(ChatsContext)

  if (!context) throw new Error('useChats must be used within ChatsProvider')

  return context
}
