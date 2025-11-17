import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Redirect to home if already authenticated
  if (session) {
    redirect("/");
  }

  return <>{children}</>;
}