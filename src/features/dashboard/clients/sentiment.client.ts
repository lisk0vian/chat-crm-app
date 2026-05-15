import { client } from "@/lib/http";

const sentiment = client("/sentiment")

type SentimentData = {
  chatId: string
  avgPos: number
  avgNeg: number
  avgNeu: number
  totalMessages: number
  dominant: 'POS' | 'NEG' | 'NEU'
}


export const getSentimentChat = (chatId: string) => sentiment.get<SentimentData>(`/chat/${chatId}`).then(res => {
  return res.data
}).catch((err) => {
  console.error(err);
  return {
    chatId,
    avgPos: 0,
    avgNeg: 0,
    avgNeu: 0,
    totalMessages: 0,
    dominant: 'NEG'
  }
})