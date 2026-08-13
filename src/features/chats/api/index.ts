import { searchClient } from './client.operations'
import { getMessagesByChatId } from './message.operations'

export const api = {
  queries: {
    clients: {
      search: searchClient,
    },
    messages: {
      get: (chatId: string) => getMessagesByChatId(chatId),
    },
  },
}
