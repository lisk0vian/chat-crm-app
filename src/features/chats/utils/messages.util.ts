import { format } from "date-fns"

type MessageContent = {
    id: string
    senderType: string
    senderId: string
    content: string
    type: string
    status: string
    direction: string
    createdAt: string
    updatedAt: string
    mediaUrl: string | null
    deletedAt: string | null
    chat: string
}

export function groupMessagesByDate(
    messages: MessageContent[]
): Record<string, MessageContent[]> {
    const groups = messages.reduce(
        (acc, msg) => {
            const dateKey: string = format(new Date(msg.createdAt), 'yyyy-MM-dd')
            acc[dateKey] = acc[dateKey] ? [...acc[dateKey], msg] : [msg]
            return acc
        },
        {} as Record<string, MessageContent[]>
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