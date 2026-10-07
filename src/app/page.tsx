import { redirect } from "next/navigation";

/** A raiz encaminha para o dashboard. */
export default function RootPage() {
  redirect("/dashboard");
}
