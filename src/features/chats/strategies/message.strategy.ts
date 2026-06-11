import type { ChatMessage } from '../types/chat.domain'
import {
  type MessageType,
  type WhatsAppMessageContent,
} from '../types/message.domain'
import { DocumentStrategy } from './document.strategy'
import { ImagenStrategy } from './imagen.strategy'
import { TextStrategy } from './text.strategy'

export interface MessageStrategy {
  getContent(content: WhatsAppMessageContent): string
  getRenderData(msg: ChatMessage['msg']): {
    text: string
    url?: string
  }
}

const SUPPORT_TYPE: Record<MessageType, MessageStrategy> = {
  text: new TextStrategy(),
  document: new DocumentStrategy(),
  image: new ImagenStrategy(),
}

export function getMessageStrategy(type: MessageType) {
  const strategy = SUPPORT_TYPE[type]

  if (!strategy) {
    throw new Error(`No strategy registered for message type: ${type}`)
  }

  return strategy
}
