const LOCALE = "pt-BR";
const CURRENCY = "BRL";

/** Formata um valor numerico como moeda brasileira. */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: CURRENCY,
  }).format(value);
}

/** Formata um numero inteiro com separador de milhar. */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat(LOCALE).format(value);
}

/** Formata uma data como dd/mm/aaaa. */
export function formatDate(value: Date | string): string {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat(LOCALE, { dateStyle: "short" }).format(date);
}

/** Formata uma data com hora como dd/mm/aaaa hh:mm. */
export function formatDateTime(value: Date | string): string {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat(LOCALE, {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}
