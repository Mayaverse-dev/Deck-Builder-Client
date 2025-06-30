"use client";

import { SignUp } from "@clerk/nextjs"
import { useAuth } from '@clerk/nextjs'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
    const { isSignedIn} = useAuth()
    const router = useRouter()
    useEffect(()=>{
        if (isSignedIn) {
            return router.push('/'); // Redirect to home if already signed in
        }
    }, [isSignedIn, router])
    return (
        <div className="flex items-center justify-center h-[100vh] w-full bg-primary">
            <SignUp routing="hash"/>
        </div>
    )
}
