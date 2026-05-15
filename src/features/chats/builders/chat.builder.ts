import type { Chat, ChatClient } from '../types/chat.domain'

export const chatBuilder = {
  draft(client: ChatClient): Chat {
    return {
      id: crypto.randomUUID() + '-temp',
      isDraft: true,
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
      client,
    }
  },
}
