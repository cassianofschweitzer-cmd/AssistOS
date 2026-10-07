-- =============================================================================
-- AssistOS — fundacao do banco
-- =============================================================================
-- Nenhuma tabela de negocio aqui. Esta migration prepara apenas a base que
-- todas as fases seguintes usam:
--
--   * extensoes (no schema `extensions`, padrao do Supabase);
--   * schema `private` para funcoes auxiliares de seguranca (RLS), que nao
--     devem ser expostas pela API REST;
--   * funcao generica de `updated_at`.
-- =============================================================================

-- Extensoes -------------------------------------------------------------------

-- gen_random_bytes() para tokens seguros (portal do cliente, convites).
create extension if not exists pgcrypto with schema extensions;

-- Busca por similaridade (nome de cliente, telefone, modelo de equipamento).
create extension if not exists pg_trgm with schema extensions;

-- Texto case-insensitive (e-mails).
create extension if not exists citext with schema extensions;

-- Schema privado ----------------------------------------------------------------
--
-- O PostgREST so expoe os schemas configurados (por padrao `public`). Funcoes
-- em `private` podem ser usadas pelas policies de RLS, mas nao sao chamaveis
-- pela API. O acesso direto de `anon` e `authenticated` e revogado.

create schema if not exists private;

revoke all on schema private from public;
revoke all on schema private from anon, authenticated;
grant usage on schema private to authenticated;

-- Funcoes novas em `private` nascem sem EXECUTE publico; cada funcao usada por
-- policies recebe o grant explicito na migration que a cria.
alter default privileges in schema private revoke execute on functions from public;

-- updated_at --------------------------------------------------------------------

create or replace function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

comment on function private.set_updated_at() is
  'Trigger BEFORE UPDATE: mantem a coluna updated_at atualizada.';
