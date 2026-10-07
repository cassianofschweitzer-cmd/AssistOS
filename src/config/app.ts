/**
 * Configuracao estatica da aplicacao.
 *
 * A empresa esta isolada aqui de proposito: quando o AssistOS virar um SaaS
 * multi-empresa, estes valores passam a vir do banco (tabela de empresas /
 * tenants) e nada mais no codigo precisa mudar.
 */
export const appConfig = {
  name: "AssistOS",
  description:
    "Sistema profissional de gerenciamento para assistencias tecnicas.",
  version: "0.1.0",
} as const;

/** Empresa atualmente atendida pela instalacao. */
export const tenantConfig = {
  name: "Smart 360",
  fullName: "Smart 360 Assistencia Tecnica",
  shortName: "Smart 360",
} as const;
