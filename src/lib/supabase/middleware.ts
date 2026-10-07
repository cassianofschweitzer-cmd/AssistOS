import { createServerClient, type CookieMethodsServer } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { getSupabaseEnv } from "./env";

/**
 * Renova o token de sessao do Supabase a cada requisicao e repassa os cookies
 * atualizados para a resposta.
 *
 * Nesta fase do projeto a funcao NAO protege rotas: nenhum redirecionamento e
 * feito. A protecao das rotas do dashboard sera adicionada junto com o modulo
 * de autenticacao — o ponto exato esta marcado com TODO abaixo.
 *
 * Enquanto o Supabase nao estiver configurado (`.env.local` ausente), a funcao
 * simplesmente repassa a requisicao sem efeito.
 */
export async function updateSession(
  request: NextRequest,
): Promise<NextResponse> {
  const env = getSupabaseEnv();

  if (!env) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  /*
   * A anotacao `CookieMethodsServer` e obrigatoria — ver a explicacao completa
   * em `server.ts`. Em resumo: `createServerClient` tem uma sobrecarga
   * deprecada (`get`/`set`/`remove`) avaliada antes da atual
   * (`getAll`/`setAll`), e sem a anotacao o parametro de `setAll` fica sem
   * tipo contextual, disparando `noImplicitAny`.
   */
  const cookieMethods: CookieMethodsServer = {
    getAll() {
      return request.cookies.getAll();
    },
    setAll(cookiesToSet) {
      for (const { name, value } of cookiesToSet) {
        request.cookies.set(name, value);
      }

      supabaseResponse = NextResponse.next({ request });

      for (const { name, value, options } of cookiesToSet) {
        supabaseResponse.cookies.set(name, value, options);
      }
    },
  };

  const supabase = createServerClient(env.url, env.anonKey, {
    cookies: cookieMethods,
  });

  // Importante: `getUser()` precisa ser chamado para que o token seja
  // revalidado e os cookies renovados.
  await supabase.auth.getUser();

  // TODO (modulo de autenticacao): bloquear rotas privadas aqui.
  //
  //   const { data } = await supabase.auth.getUser();
  //   if (!data.user && !request.nextUrl.pathname.startsWith("/login")) {
  //     const url = request.nextUrl.clone();
  //     url.pathname = "/login";
  //     return NextResponse.redirect(url);
  //   }

  return supabaseResponse;
}
