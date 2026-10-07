import type { Metadata } from "next";
import { Settings } from "lucide-react";

import { ModulePlaceholder } from "@/components/shared/module-placeholder";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Configuracoes",
};

export default function ConfiguracoesPage() {
  return (
    <>
      <PageHeader
        title="Configuracoes"
        description="Dados da empresa, usuarios e parametros do sistema."
      />
      <ModulePlaceholder
        module="Configuracoes"
        icon={Settings}
        scope={[
          "Dados da empresa e identidade visual",
          "Tecnicos, usuarios e permissoes",
          "Catalogo de servicos e precos",
          "Modelos de checklist de entrada",
          "Layout de impressao da ordem de servico",
          "Historico de atividades do sistema",
        ]}
      />
    </>
  );
}
