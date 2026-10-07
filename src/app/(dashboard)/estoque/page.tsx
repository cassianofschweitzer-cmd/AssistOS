import type { Metadata } from "next";
import { Package } from "lucide-react";

import { ModulePlaceholder } from "@/components/shared/module-placeholder";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Estoque",
};

export default function EstoquePage() {
  return (
    <>
      <PageHeader
        title="Estoque"
        description="Controle de produtos, pecas e movimentacoes."
      />
      <ModulePlaceholder
        module="Estoque"
        icon={Package}
        scope={[
          "Cadastro de produtos e pecas",
          "Entradas, saidas e ajustes",
          "Saldo por item e alerta de minimo",
          "Consumo por ordem de servico",
          "Fornecedores e custo de reposicao",
          "Relatorios de movimentacao",
        ]}
      />
    </>
  );
}
