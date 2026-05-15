import { format } from 'date-fns'
import type { Message } from '../types/message.api'

type GroupMessages = Record<string, Message[]>

export const messageBuilder = {
  group: {
    date: (messages: Message[]): GroupMessages => groupMessagesByDate(messages),
  },
}

export function groupMessagesByDate(
  messages: Message[]
): Record<string, Message[]> {
  const groups = messages.reduce(
    (acc, msg) => {
      const dateKey: string = format(new Date(msg.createdAt), 'yyyy-MM-dd')
      acc[dateKey] = acc[dateKey] ? [...acc[dateKey], msg] : [msg]
      return acc
    },
    {} as Record<string, Message[]>
  )

  for (const date in groups) {
    groups[date].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  const sortedGroups = Object.fromEntries(
    Object.entries(groups).sort(
      ([a], [b]) => new Date(b).getTime() - new Date(a).getTime()
    )
  )

  return sortedGroups
}
