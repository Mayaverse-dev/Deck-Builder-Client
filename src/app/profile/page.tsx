"use client";

import { useAuth, UserProfile } from "@clerk/nextjs";
import { MoveLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

export default function Profile() {
  const router = useRouter()
  const { isSignedIn, isLoaded } = useAuth();
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/auth/login'); // Redirect to login page
    }
  }, [isLoaded, isSignedIn, router])

  return (
    <div className="flex items-center justify-center h-[100vh] w-full bg-primary">
        <Tooltip>
            <TooltipTrigger className="self-start mt-5 mr-3">
                <div className="hover:bg-zinc w-10 h-10 rounded-full bg-primary hover:bg-zinc-700 flex items-center justify-center" onClick={() => router.push("/")}>
                    <MoveLeftIcon className="text-white"/>
                </div>
            </TooltipTrigger>
            <TooltipContent>
                <p className="bg-black text-white rounded-sm w-full pt-1 pb-1 pr-2 pl-2">Back</p>
            </TooltipContent>
        </Tooltip>
        <UserProfile routing="hash"/>
    </div>
    
  );
}
