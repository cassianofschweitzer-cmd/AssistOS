import type { Metadata } from "next";
import { CircleAlert } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { tenantConfig } from "@/config/app";
import { formatDateTime } from "@/lib/utils/format";

import {
  mockMonthSummary,
  mockRecentOrders,
  mockStats,
} from "./_data/mock-dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description={`Visao geral da operacao — ${tenantConfig.fullName}.`}
      />

      <div
        role="note"
        className="mb-6 flex items-start gap-3 rounded-lg border border-warning/40 bg-warning/10 px-4 py-3"
      >
        <CircleAlert className="mt-0.5 size-4 shrink-0 text-warning-foreground" />
        <p className="text-sm text-warning-foreground">
          <strong className="font-semibold">Dados ficticios.</strong> Os numeros
          abaixo existem apenas para construir o layout. Nenhuma consulta ao
          banco de dados foi implementada ainda.
        </p>
      </div>

      <section aria-label="Indicadores de ordens de servico">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {mockStats.map((stat) => (
            <StatCard
              key={stat.key}
              label={stat.label}
              value={stat.value}
              hint={stat.hint}
              tone={stat.tone}
              icon={stat.icon}
            />
          ))}
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Ordens de servico recentes</CardTitle>
            <CardDescription>
              Ultimas movimentacoes registradas na operacao.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-y border-border bg-muted/50 text-left">
                    <th className="px-5 py-2.5 font-medium text-muted-foreground">
                      OS
                    </th>
                    <th className="px-5 py-2.5 font-medium text-muted-foreground">
                      Cliente
                    </th>
                    <th className="hidden px-5 py-2.5 font-medium text-muted-foreground sm:table-cell">
                      Equipamento
                    </th>
                    <th className="px-5 py-2.5 font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="hidden px-5 py-2.5 font-medium text-muted-foreground md:table-cell">
                      Atualizado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockRecentOrders.map((order) => (
                    <tr
                      key={order.code}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-5 py-3 font-medium text-foreground">
                        {order.code}
                      </td>
                      <td className="px-5 py-3 text-foreground">
                        {order.customer}
                      </td>
                      <td className="hidden px-5 py-3 text-muted-foreground sm:table-cell">
                        {order.equipment}
                      </td>
                      <td className="px-5 py-3">
                        <Badge tone={order.tone}>{order.status}</Badge>
                      </td>
                      <td className="hidden px-5 py-3 whitespace-nowrap text-muted-foreground md:table-cell">
                        {formatDateTime(order.updatedAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resumo do mes</CardTitle>
            <CardDescription>Setembro de 2026</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="divide-y divide-border">
              {mockMonthSummary.map((entry) => (
                <div
                  key={entry.label}
                  className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                >
                  <dt className="text-sm text-muted-foreground">
                    {entry.label}
                  </dt>
                  <dd className="text-sm font-semibold text-foreground">
                    {entry.value}
                  </dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
