import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

import { ChatInput } from "./chat-input";
import { ChatMessage } from "./chat-message";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { initialsName, numberFormat } from "@/lib/format-chat";
import { useT } from "@/lib/i18n/useT";
import type { MessageData, UserContact } from "@/types/chat";

type ServerToClientEvents = {
  newMessage: (msg: { from: string; text: string }) => void;
};

type ClientToServerEvents = {
  joinChat: (chatId: string) => void;
};

export const ChatCard = ({ contact }: { contact: UserContact }) => {
  const socketRef = useRef<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);
  const [messages, setMessages] = useState<MessageData[]>([]);

  useEffect(() => {
    const socket = io(
      import.meta.env.VITE_SOCKET_URL ?? "http://localhost:3000/chat"
    );

    socketRef.current = socket;

    // Unirse al chat usando el número de teléfono como chatId
    socket.emit("joinChat", contact.phoneNumber);

    // Escuchar mensajes entrantes
    socket.on("newMessage", (msg) => {
      // Solo agregar mensajes que vienen del contacto
      if (msg.from === contact.phoneNumber) {
        setMessages((prev) => [...prev, { content: msg.text, isSent: false }]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [contact.phoneNumber]);

  const handleSend = async (msg: string) => {
    const newMessage: MessageData = { content: msg, isSent: true };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <Card>
      <CardHeader>
        <ChatCardHeader name={contact?.fullName} phone={contact.phoneNumber} />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {messages.length > 0 ? (
          messages.map((m, i) => (
            <ChatMessage key={i} content={m.content} isSent={m.isSent} />
          ))
        ) : (
          <ChatCardEmpty />
        )}
      </CardContent>
      <CardFooter>
        <ChatInput onSend={handleSend} />
      </CardFooter>
    </Card>
  );
};

const ChatCardHeader = ({ name, phone }: { name?: string; phone: string }) => {
  const { t } = useT();
  const initials = initialsName(name || "");
  const phoneFormat = numberFormat(phone);

  return (
    <div className="flex items-center space-x-4">
      <Avatar className="size-12">
        <AvatarFallback className="font-bold">{initials}</AvatarFallback>
      </Avatar>
      <CardTitle className="flex flex-col space-y-1 items-start">
        <p className="font-bold">{name || t("chat.user.unknown")}</p>
        <p className="text-sm text-muted-foreground">{phoneFormat}</p>
      </CardTitle>
    </div>
  );
};

const ChatCardEmpty = () => {
  const { t } = useT();
  return (
    <div className="flex items-center justify-center h-full">
      <h3 className="scroll-m-20 text-center py-7 text-2xl font-semibold tracking-tight">
        {t("chat.empty")}
      </h3>
    </div>
  );
};
