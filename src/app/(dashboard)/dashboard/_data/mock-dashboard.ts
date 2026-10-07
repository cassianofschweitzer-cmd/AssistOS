/**
 * DADOS FICTICIOS — TEMPORARIOS.
 *
 * Existem apenas para construir e validar o layout do dashboard nesta fase do
 * projeto. Nenhuma parte da aplicacao depende deles fora desta pasta.
 *
 * Quando o banco de dados existir, este arquivo deve ser REMOVIDO e a pagina
 * passa a buscar os dados via Supabase (Server Component).
 */

import {
  CheckCircle2,
  ClipboardList,
  PackageSearch,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import type { StatusTone } from "@/types";

export type DashboardStat = {
  key: string;
  label: string;
  value: number;
  hint: string;
  tone: StatusTone;
  icon: LucideIcon;
};

export const mockStats: DashboardStat[] = [
  {
    key: "abertas",
    label: "Ordens abertas",
    value: 18,
    hint: "Aguardando triagem ou inicio",
    tone: "primary",
    icon: ClipboardList,
  },
  {
    key: "manutencao",
    label: "Em manutencao",
    value: 11,
    hint: "Em execucao pela equipe tecnica",
    tone: "info",
    icon: Wrench,
  },
  {
    key: "aguardando-peca",
    label: "Aguardando peca",
    value: 5,
    hint: "Bloqueadas por reposicao de estoque",
    tone: "warning",
    icon: PackageSearch,
  },
  {
    key: "prontas",
    label: "Prontas para retirada",
    value: 7,
    hint: "Concluidas, aguardando o cliente",
    tone: "success",
    icon: CheckCircle2,
  },
];

export type MockServiceOrder = {
  code: string;
  customer: string;
  equipment: string;
  status: string;
  tone: StatusTone;
  updatedAt: string;
};

export const mockRecentOrders: MockServiceOrder[] = [
  {
    code: "OS-1042",
    customer: "Marina Alves",
    equipment: "Notebook Dell Inspiron 15",
    status: "Em manutencao",
    tone: "info",
    updatedAt: "2026-09-03T11:20:00",
  },
  {
    code: "OS-1041",
    customer: "Rodrigo Pinheiro",
    equipment: "iPhone 13",
    status: "Aguardando peca",
    tone: "warning",
    updatedAt: "2026-09-03T09:05:00",
  },
  {
    code: "OS-1040",
    customer: "Eliane Costa",
    equipment: "Impressora HP LaserJet",
    status: "Pronta para retirada",
    tone: "success",
    updatedAt: "2026-09-02T17:40:00",
  },
  {
    code: "OS-1039",
    customer: "Central Log Transportes",
    equipment: "Desktop Lenovo ThinkCentre",
    status: "Aberta",
    tone: "primary",
    updatedAt: "2026-09-02T14:12:00",
  },
  {
    code: "OS-1038",
    customer: "Bruno Tavares",
    equipment: 'Smart TV Samsung 50"',
    status: "Em manutencao",
    tone: "info",
    updatedAt: "2026-09-02T10:33:00",
  },
];

export type MockSummaryEntry = {
  label: string;
  value: string;
};

export const mockMonthSummary: MockSummaryEntry[] = [
  { label: "Ordens abertas no mes", value: "41" },
  { label: "Ordens concluidas no mes", value: "34" },
  { label: "Tempo medio de reparo", value: "3,2 dias" },
  { label: "Ticket medio", value: "R$ 412,80" },
];
