import Link from "next/link";

import { BrandMark } from "@/components/shared/brand";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="grid min-h-svh place-items-center bg-background px-6">
      <div className="flex max-w-md flex-col items-center text-center">
        <BrandMark className="size-10" />
        <p className="mt-6 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
          Erro 404
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          Pagina nao encontrada
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          O endereco acessado nao existe ou o modulo ainda nao foi criado.
        </p>
        <Link href="/dashboard" className={`${buttonVariants()} mt-6`}>
          Voltar ao dashboard
        </Link>
      </div>
    </div>
  );
}
