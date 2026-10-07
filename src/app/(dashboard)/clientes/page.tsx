import type { Metadata } from "next";
import { Users } from "lucide-react";

import { ModulePlaceholder } from "@/components/shared/module-placeholder";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Clientes",
};

export default function ClientesPage() {
  return (
    <>
      <PageHeader
        title="Clientes"
        description="Cadastro de pessoas fisicas e juridicas atendidas pela assistencia."
      />
      <ModulePlaceholder
        module="Clientes"
        icon={Users}
        scope={[
          "Cadastro de pessoa fisica e juridica",
          "Contatos, enderecos e documentos",
          "Historico de ordens por cliente",
          "Equipamentos vinculados ao cliente",
          "Busca e filtros",
          "Acesso ao Portal do Cliente",
        ]}
      />
    </>
  );
}
