"use client";

import React, { useEffect } from "react";
import ActionCardViewer from "./ActionCardViewer";
import ItemCardViewer from "./ItemCardViewer";
import ArenaCardViewer from "./ArenaCardViewer";
import { Separator } from "@/components/ui/separator";
import { Trash2Icon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
export default function DeckViewer() {
  //make useState for cards
  const [parsedDeck, setParsedDeck] = React.useState<ICard[]>([]);
  const [actionCards, setActionCards] = React.useState<ICard[]>([]);
  const [arenaCards, setArenaCards] = React.useState<ICard[]>([]);
  const [itemCards, setItemCards] = React.useState<ICard[]>([]);
  const [reload, setReload] = React.useState<boolean>(true);
  useEffect(() => {
    const deck = sessionStorage.getItem("deck");
    const parsedDeck = deck ? JSON.parse(deck) : [];
    const actionCards = parsedDeck.filter(
      (card: ICard) => card.type === "Action"
    );
    const arenaCards = parsedDeck.filter(
      (card: ICard) => card.type === "Arena"
    );
    const itemCards = parsedDeck.filter((card: ICard) => card.type === "Item" || card.type === "ArcherItem");
    setParsedDeck(parsedDeck);
    setActionCards(actionCards);
    setArenaCards(arenaCards);
    setItemCards(itemCards);
  }, []);

  function clearActionDeck() {
    const deck = sessionStorage.getItem("deck");
    if (deck) {
      const parsedDeck = JSON.parse(deck);
      const filteredDeck = parsedDeck.filter(
        (card: ICard) => card.type !== "Action"
      );
      sessionStorage.setItem("deck", JSON.stringify(filteredDeck));
      setParsedDeck(filteredDeck);
      setActionCards([]);
      setReload(!reload);
    }
  }
  function clearItemDeck() {
    const deck = sessionStorage.getItem("deck");
    if (deck) {
      const parsedDeck = JSON.parse(deck);
      const filteredDeck = parsedDeck.filter(
        (card: ICard) => card.type !== "Item" && card.type !== "ArcherItem"
      );
      sessionStorage.setItem("deck", JSON.stringify(filteredDeck));
      setParsedDeck(filteredDeck);
      setItemCards([]);
      setReload(!reload);
    }
  }
  function clearArenaDeck() {
    const deck = sessionStorage.getItem("deck");
    if (deck) {
      const parsedDeck = JSON.parse(deck);
      const filteredDeck = parsedDeck.filter(
        (card: ICard) => card.type !== "Arena"
      );
      sessionStorage.setItem("deck", JSON.stringify(filteredDeck));
      setParsedDeck(filteredDeck);
      setArenaCards([]);
      setReload(!reload);
    }
  }

  return (
    <>
      {parsedDeck.length === 0 ? (
        <div className="flex items-center justify-center h-[calc(100vh-64px)] overflow-hidden">
          <h1 className="text-2xl font-bold">Your deck is empty!</h1>
        </div>
      ) : (
        <div className="h-[calc(100vh-64px)]">
          <div className="flex w-full justify-start items-center">
            <h2 className="text-2xl mt-4 mb-2 ml-6">ACTION CARDS</h2>
            <Tooltip>
              <TooltipTrigger>
                <Trash2Icon className="rounded-full mt-4 mb-2 ml-2 hover:text-rose-600" onClick={()=>clearActionDeck()}/>
              </TooltipTrigger>
              <TooltipContent>Clear Cards</TooltipContent>
            </Tooltip>
          </div>
          {/**@ts-expect-error copy*/}
          <ActionCardViewer lCards={actionCards} local={true} deck={true}/>
          <Separator className="mt-4" />
          <div className="flex w-full justify-start items-center">
            <h2 className="text-2xl mt-4 mb-2 ml-6">ITEM CARDS</h2>
            <Trash2Icon className="rounded-full mt-4 mb-2 ml-2 hover:text-rose-600" onClick={()=>clearItemDeck()}/>
          </div>
          {/**@ts-expect-error copy*/}
          <ItemCardViewer lCards={itemCards} local={true} deck={true}/>
          <Separator className="mt-4" />
          <div className="flex w-full justify-start items-center">
            <h2 className="text-2xl mt-4 mb-2 ml-6">ARENA CARDS</h2>
            <Trash2Icon className="rounded-full mt-4 mb-2 ml-2 hover:text-rose-600" onClick={()=>clearArenaDeck()}/>
          </div>
          {/**@ts-expect-error copy*/}
          <ArenaCardViewer lCards={arenaCards} local={true} deck={true}/>
        </div>
      )}
    </>
  );
}
