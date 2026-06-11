import type { ChatMessage } from '../types/chat.domain'
import type { WhatsAppMediaContent } from '../types/message.domain'
import type { MessageStrategy } from './message.strategy'

export class ImagenStrategy implements MessageStrategy {
  getRenderData(msg: ChatMessage['msg']): { text: string; url?: string } {
    return {
      text: (msg.content as WhatsAppMediaContent).caption ?? 'Imagen recivida',
      url: `http://localhost:3000${msg.mediaUrl}`,
    }
  }
  getContent(content: WhatsAppMediaContent): string {
    return content?.caption ?? 'Imagen recibida'
  }
}
