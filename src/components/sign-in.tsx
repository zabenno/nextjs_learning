"use client"
import { signIn } from "next-auth/react"
import Image from "next/image"
 
export default function SignInWithGoogle() {
  return (
    <button onClick={() => signIn("google")} className="flex items-center">
      <Image
        src="/auth/google/dark/web_dark_rd_SI.svg"
        alt="Google Logo"
        width={240}
        height={24}
        className="mr-2"
      />
    </button>
  )
}
