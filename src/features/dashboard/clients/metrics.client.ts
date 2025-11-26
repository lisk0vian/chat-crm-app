import { client } from "@/lib/http";

const metrics = client('/metrics')

export interface KPIValue {
  value: number;
  porcentLastMonth: string; // Ej: "+0.00%" o "-100.00%"
}

export interface SentimentKPIs {
  pos: KPIValue;
  neg: KPIValue;
  neu: KPIValue;
}

type SentimentTrend = {
  date: string; // 'YYYY-MM-DD'
  pos: number;
  neg: number;
  neu: number;
}

export interface DashboardKPIs {
  activeChats: KPIValue;
  messagesThisMonth: KPIValue;
  agentsActive: KPIValue;
  transfersThisMonth: KPIValue
  sentimentToday: SentimentKPIs;
}

type ActiveContact = {
  id: string
  username: string
  firstNames: string
  lastNames: string
  phoneNumber: string
  profile?: string
  messageCount: number
}

type BestAgents = {
  agentId: string
  firstNames: string
  lastNames: string
  username: string
  profile: string
  totalPositive: string
  phoneNumber: string
  avgPos: number
  score: number
}

export const getKpis = metrics.get<DashboardKPIs>("/kpis").then(res => res.data)

export const getSentimentMonthlyTrend = metrics.get<SentimentTrend[]>("sentiment/monthly-trend").then(res => res.data)

export const getSentimentTrend = (range: string, userId?: string) => metrics.get<SentimentTrend[]>("sentiment/trend", {
  params: { range, userId }
}).then(res => res.data);

export const getTopContacts = metrics.get<ActiveContact[]>("top-contacts").then(res => res.data)

export const getBestAgents = metrics.get<BestAgents[]>("/best-agents").then(res => res.data)

export const getBestClients = metrics.get<BestAgents[]>("/best-clients").then(res => res.data)