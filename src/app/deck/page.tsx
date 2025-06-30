"use client";

import { useAuth } from "@clerk/nextjs";
import { AppSidebar } from '../_navComponents/app-sidebar'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'  
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DeckViewer from "../_cardViewer/DeckViewer";


export default function Home() {
  const router = useRouter()
  const { isSignedIn, isLoaded } = useAuth();
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/auth/login'); // Redirect to login page
    }
  }, [isLoaded, isSignedIn, router])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
          <div className="flex">
            <h1 className="font-semibold">YUYUTSU CARD DECK</h1>
          </div>
      </header>
      <div className="">
        <DeckViewer/>
      </div>
      </SidebarInset>

    </SidebarProvider>
    
  );
}
