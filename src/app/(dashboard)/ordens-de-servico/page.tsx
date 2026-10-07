import type { Metadata } from "next";
import { ClipboardList } from "lucide-react";

import { ModulePlaceholder } from "@/components/shared/module-placeholder";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Ordens de Servico",
};

export default function OrdensDeServicoPage() {
  return (
    <>
      <PageHeader
        title="Ordens de Servico"
        description="Abertura, acompanhamento e encerramento dos atendimentos tecnicos."
      />
      <ModulePlaceholder
        module="Ordens de Servico"
        icon={ClipboardList}
        scope={[
          "Abertura de OS vinculada a cliente e equipamento",
          "Checklist de entrada do equipamento",
          "Fluxo de status do atendimento",
          "Orcamento e aprovacao",
          "Lancamento de servicos e pecas",
          "Impressao da ordem de servico",
        ]}
      />
    </>
  );
}
