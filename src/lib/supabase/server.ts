import { createServerClient, type CookieMethodsServer } from "@supabase/ssr";
import { cookies } from "next/headers";

import { requireSupabaseEnv } from "./env";

/**
 * Client Supabase para uso no servidor (Server Components, Server Actions e
 * Route Handlers).
 *
 * Deve ser criado por requisicao — nunca guardado em uma variavel de modulo,
 * porque carrega os cookies de sessao do usuario atual.
 *
 * TODO (proximo passo do banco de dados): tipar com os tipos gerados —
 * `createServerClient<Database>(...)`.
 */
export async function createSupabaseServerClient() {
  const { url, anonKey } = requireSupabaseEnv();
  const cookieStore = await cookies();

  /*
   * A anotacao `CookieMethodsServer` e obrigatoria.
   *
   * `createServerClient` tem duas sobrecargas: a primeira (deprecada) espera
   * `cookies: { get, set, remove }` e a segunda espera `{ getAll, setAll }`.
   * Ao avaliar a primeira sobrecarga, o TypeScript nao encontra `setAll` no
   * tipo esperado, entao o parametro fica sem tipo contextual e `noImplicitAny`
   * acusa o erro — mesmo que a segunda sobrecarga fosse escolhida no final.
   *
   * Tipando o objeto antes da chamada, os parametros dos metodos recebem o
   * tipo da propria biblioteca e a sobrecarga correta e selecionada.
   */
  const cookieMethods: CookieMethodsServer = {
    getAll() {
      return cookieStore.getAll();
    },
    setAll(cookiesToSet) {
      try {
        for (const { name, value, options } of cookiesToSet) {
          cookieStore.set(name, value, options);
        }
      } catch {
        // `cookies().set` nao e permitido em Server Components apenas de
        // leitura. Nesse caso o middleware ja renovou a sessao, portanto
        // ignorar aqui e o comportamento recomendado pelo Supabase.
      }
    },
  };

  return createServerClient(url, anonKey, { cookies: cookieMethods });
}
