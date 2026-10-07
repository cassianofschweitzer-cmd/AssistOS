import type { Metadata } from "next";
import Link from "next/link";
import { Info } from "lucide-react";

import { BrandMark } from "@/components/shared/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: "Entrar",
};

export default function LoginPage() {
  return (
    <div>
      <div className="lg:hidden">
        <BrandMark className="size-9" />
      </div>

      <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground lg:mt-0">
        Entrar no AssistOS
      </h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Acesse com as credenciais fornecidas pela sua assistencia tecnica.
      </p>

      {/*
        Formulario visual. Nenhum envio esta implementado: a autenticacao com
        Supabase Auth (Server Action + validacao + tratamento de erro) sera
        adicionada no passo dedicado a autenticacao.
      */}
      <form className="mt-8 flex flex-col gap-4" aria-describedby="login-aviso">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="nome@empresa.com.br"
            disabled
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            disabled
          />
        </div>

        <Button type="submit" className="mt-2 w-full" disabled>
          Entrar
        </Button>
      </form>

      <div
        id="login-aviso"
        className="mt-5 flex items-start gap-2.5 rounded-md border border-border bg-muted px-3.5 py-3"
      >
        <Info className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
        <p className="text-xs leading-relaxed text-muted-foreground">
          Autenticacao ainda nao implementada. Esta tela existe para definir a
          estrutura e o layout. Enquanto isso, o{" "}
          <Link
            href="/dashboard"
            className="font-medium text-primary underline underline-offset-2"
          >
            dashboard
          </Link>{" "}
          esta acessivel diretamente.
        </p>
      </div>
    </div>
  );
}
