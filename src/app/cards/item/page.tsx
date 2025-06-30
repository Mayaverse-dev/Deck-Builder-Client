"use client";

import { useAuth } from "@clerk/nextjs";
import { AppSidebar } from '../../_navComponents/app-sidebar'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'  
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ItemCardViewer from "@/app/_cardViewer/ItemCardViewer";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import DeckViewer from "@/app/_cardViewer/DeckViewer";

export default function Home() {
  const router = useRouter()
  const { isSignedIn, isLoaded } = useAuth();
  const [, setReload] = useState<boolean>(true);
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/auth/login'); // Redirect to login page
    }
  }, [isLoaded, isSignedIn, router])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 fixed top-0 z-50 bg-gray-50 w-full">
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                  <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                  />
                </div>
                <div className="flex">
                  <h1 className="font-semibold">YUYUTSU ITEM CARDS</h1>
                </div>
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Sheet onOpenChange={(open) => setReload(open)}>
                  <SheetTrigger className="float-right">
                    <div className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-sm transition-colors">
                      <span className="text-sm font-semibold">View Deck</span>
                    </div>
                  </SheetTrigger>
                  <SheetContent className="h-full overflow-scroll">
                    <SheetHeader>
                      <SheetTitle>Your Deck</SheetTitle>
                    </SheetHeader>
                    <DeckViewer />
                  </SheetContent>
                </Sheet>
              </header>
      <div className="mt-16">
        <ItemCardViewer/>
      </div>
      </SidebarInset>

    </SidebarProvider>
    
  );
}
