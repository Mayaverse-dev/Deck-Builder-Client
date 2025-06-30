"use client";
import { useAuth } from "@clerk/nextjs";
import { AppSidebar } from "../../_navComponents/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import React from "react";

import axios from "axios";
import { toast } from "react-toastify";
import ActionCardViewer from "@/app/_cardViewer/ActionCardViewer";
import ItemCardViewer from "@/app/_cardViewer/ItemCardViewer";
import ArenaCardViewer from "@/app/_cardViewer/ArenaCardViewer";

interface ICard {
  name: string;
  primaryClass: string;
  secondaryClass: string;
  thirdClass: string;
  text: string;
  cost: number;
  gain: number;
  effectBack: string;
  actionSlot1: string;
  actionSlot2: string;
  actionSlot3: string | null;
  cardId: string;
  cardImg: string;
  mainClass: string;
  type: string;
}

export default function Home() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();
  //make 4 states for the 4 card types: Action, Item, Arena, ArcherItem
  const [actionCards, setActionCards] = React.useState<ICard[]>([]);
  const [itemCards, setItemCards] = React.useState<ICard[]>([]);
  const [arenaCards, setArenaCards] = React.useState<ICard[]>([]);
  const [search, setSearch] = React.useState<string>("");

  React.useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/auth/login"); // Redirect to login page
    }
  }, [isLoaded, isSignedIn, router]);

  function handleFilter() {
    if (!search || search === "") {
      toast.error("Please set all filters before applying.");
      return;
    }
    console.log("searching for: ", search);
    axios
      .post("https://yuyutsu-deckbuilder-api.vercel.app/cards/search", {
        query: search
      })
      .then((res) => {
        const cards = res.data;
        console.log("Cards found: ", res.data.length);
        const actionCards = cards.filter(
          (card: ICard) => card.type === "Action"
        );
        const itemCards = cards.filter(
          (card: ICard) => card.type === "Item" || card.type === "ArcherItem"
        );
        const arenaCards = cards.filter((card: ICard) => card.type === "Arena");
        //check all arrays if a card exists in deck in sessionStorage, if yes remove from array
        const deck = sessionStorage.getItem("deck");
        if (deck) {
          const parsedDeck = JSON.parse(deck);
          const filteredActionCards = actionCards.filter(
            (card: ICard) =>
              !parsedDeck.some((c: ICard) => c.cardId === card.cardId)
          );
          const filteredItemCards = itemCards.filter(
            (card: ICard) =>
              !parsedDeck.some((c: ICard) => c.cardId === card.cardId)
          );
          const filteredArenaCards = arenaCards.filter(
            (card: ICard) =>
              !parsedDeck.some((c: ICard) => c.cardId === card.cardId)
          );
          console.log(filteredActionCards.length)
          setActionCards(filteredActionCards);
          setItemCards(filteredItemCards);
          setArenaCards(filteredArenaCards);
        } else {
          setActionCards(actionCards);
          setItemCards(itemCards);
          setArenaCards(arenaCards);
        }
      });
  }

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
            <h1 className="font-semibold">YUYUTSU CARD FILTER</h1>
          </div>
        </header>
        <div className="flex w-full justify-start items-center">
          <h2 className="text-2xl mt-4 mb-2 ml-6 font-bold">
            Search Cards
          </h2>
        </div>
        <div className="flex items-center justify-center">
            <Input
                className="w-1/4 ml-6"
                type="text"
                placeholder="Enter keyword...."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
          <Separator orientation="vertical" className="ml-4" />
          <Button
            className="ml-4"
            onClick={() => {
              handleFilter();
            }}
          >
            Search
          </Button>
        </div>
        <Separator className="my-4" />
        <div className="">
          <div className="flex w-full justify-start items-center">
            <h2 className="text-2xl mt-4 mb-2 ml-6">ACTION CARDS</h2>
          </div>
          {/**@ts-expect-error copy*/}

          <ActionCardViewer lCards={actionCards} local={true} />
          <Separator className="my-4" />
          <div className="flex w-full justify-start items-center">
            <h2 className="text-2xl mt-4 mb-2 ml-6">ITEM CARDS</h2>
          </div>
          {/**@ts-expect-error copy*/}

          <ItemCardViewer lCards={itemCards} local={true} />
          <Separator className="my-4" />
          <div className="flex w-full justify-start items-center">
            <h2 className="text-2xl mt-4 mb-2 ml-6">ARENA CARDS</h2>
          </div>
          {/**@ts-expect-error copy*/}

          <ArenaCardViewer lCards={arenaCards} local={true} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
