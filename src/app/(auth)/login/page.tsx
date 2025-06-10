"use client"
import SignInWithGoogle from "@/components/sign-in";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const { data: session } = useSession();
  if (session) {
    redirect("/");
  }
  return (
    <main className="flex items-center justify-center">
      <SignInWithGoogle />

    </main>
  );
}