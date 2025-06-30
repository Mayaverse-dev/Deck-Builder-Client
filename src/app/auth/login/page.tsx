"use client";
import { SignIn, useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { isSignedIn, isLoaded} = useAuth()
  const router = useRouter()
  useEffect(()=>{
    if (isLoaded && isSignedIn) {
      return router.push('/'); // Redirect to home if already signed in
    }
  }, [isSignedIn, router, isLoaded])
  return (
    <div className="flex items-center justify-center h-[100vh] w-full bg-primary">
      <SignIn routing="hash"/>
    </div>
  )
}
