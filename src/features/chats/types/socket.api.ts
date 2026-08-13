// SOCKET
export const ChatSocketEvents = {
    join: 'chat:join',
    broadcast: 'chat:message:broadcast',
    error: 'chat:message:error',
    sendMessage: 'chat:message:send',
    sentimentIndicator: 'chat:sentiment:update'
} as const;

export type ChatSocketEvents = typeof ChatSocketEvents[keyof typeof ChatSocketEvents];
