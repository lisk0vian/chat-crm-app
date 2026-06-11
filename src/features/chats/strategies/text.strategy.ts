import type { ChatMessage } from '../types/chat.domain'
import type { WhatsAppTextContent } from '../types/message.domain'
import type { MessageStrategy } from './message.strategy'

export class TextStrategy implements MessageStrategy {
  getRenderData(data: ChatMessage['msg']): { text: string; url?: string } {
    return {
      text: (data.content as WhatsAppTextContent).body,
    }
  }
  getContent(content: WhatsAppTextContent): string {
    return content.body
  }
}
