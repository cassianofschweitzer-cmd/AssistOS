import type { Metadata } from "next";
import { Wallet } from "lucide-react";

import { ModulePlaceholder } from "@/components/shared/module-placeholder";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Financeiro",
};

export default function FinanceiroPage() {
  return (
    <>
      <PageHeader
        title="Financeiro"
        description="Recebimentos, despesas e resultado da operacao."
      />
      <ModulePlaceholder
        module="Financeiro"
        icon={Wallet}
        scope={[
          "Contas a receber por ordem de servico",
          "Contas a pagar e despesas",
          "Formas e condicoes de pagamento",
          "Fluxo de caixa por periodo",
          "Faturamento e ticket medio",
          "Relatorios gerenciais",
        ]}
      />
    </>
  );
}
