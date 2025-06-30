import React, { useEffect, useState } from "react";
import axios from "axios";
import { ActionCard } from "../_cardComponents/actions/ActionCard";
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "react-toastify";
import { toast as t } from "sonner";

interface ICard {
  copy: number; // Optional for local cards
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
export default function ActionCardViewer({
  local,
  lCards,
  deck,
}: {
  local?: boolean;
  lCards?: ICard[];
  deck?: boolean;
}) {
  const [cards, setCards] = useState<ICard[]>([]);
  const [reload, setReload] = useState<boolean>(true);
  useEffect(() => {
    if (local === true && lCards) {
      const chars = {
        nairvi: "NEIR",
        khazir: "KHZR",
        prabhakar: "PRAB",
        dangsa: "DANG",
      };
      const act = sessionStorage.getItem("activeTeam");
      const parsed = JSON.parse(act || JSON.stringify({ name: "Prabhakar" }));
      const character: string = parsed.name;
      delete chars[character.toLowerCase() as keyof typeof chars];
      const filteredCards = lCards.filter((card: ICard) => {
        return !Object.values(chars).some((char) =>
          card.cardId.startsWith(char)
        );
      });
      //remove copies of the same card from filteredCards
      const uniqueCards: { [key: string]: ICard } = {};
      filteredCards.forEach((card) => {
        if (!uniqueCards[card.cardId]) {
          uniqueCards[card.cardId] = card;
        }
      });
      // Convert the object back to an array
      const uniqueCardsArray = Object.values(uniqueCards);
      // Set the state with unique cards
      setCards(uniqueCardsArray);
    } else {
      axios
        .get("https://yuyutsu-deckbuilder-api.vercel.app/cards/type/Action")
        .then((res) => {
          const chars = {
            nairvi: "NEIR",
            khazir: "KHZR",
            prabhakar: "PRAB",
            dangsa: "DANG",
          };
          const act = sessionStorage.getItem("activeTeam");
          const parsed = JSON.parse(
            act || JSON.stringify({ name: "Prabhakar" })
          );
          const character: string = parsed.name;
          //   const start = chars[character.toLowerCase() as keyof typeof chars];
          delete chars[character.toLowerCase() as keyof typeof chars];
          const filteredCards = res.data.filter((card: ICard) => {
            return !Object.values(chars).some((char) =>
              card.cardId.startsWith(char)
            );
          });
          console.log(filteredCards);
          setCards(filteredCards);
        })
        .catch((err) => console.log(err));
    }
  }, [local, lCards]);
  function addToDeck(card: ICard) {
    if (sessionStorage.getItem("deck")) {
      const deck = JSON.parse(sessionStorage.getItem("deck") || "[]");
      if (deck.length === 30) {
        toast.error("Deck is full! You can only have 30 cards in your deck.");
        return;
      }
      const cardExists = deck.filter(
        (c: ICard) => c.cardId === card.cardId
      ).length;
      if (cardExists >= 3) {
        toast.error("You can only have 3 copies of a card in your deck!");
        return;
      }
      let copyNumber = 1;
      const existingCopies = deck
        .filter((c: ICard) => c.cardId === card.cardId)
        .map((c: ICard) => c.copy)
        .sort((a: number, b: number) => a - b);

      for (let i = 1; i <= 3; i++) {
        if (!existingCopies.includes(i)) {
          copyNumber = i;
          break;
        }
      }

      // Assign the copy number to the card
      card = { ...card, copy: copyNumber };

      deck.push(card); // add a copy property to the card
      sessionStorage.setItem("deck", JSON.stringify(deck));
      t.success("Card added to deck!");
      setReload(!reload);
    } else {
      sessionStorage.setItem("deck", JSON.stringify([card]));
      t.success("Card added to deck!");
      setReload(!reload);
    }
  }

  //make remove from deck function
  function removeFromDeck(card: ICard) {
    if (sessionStorage.getItem("deck")) {
      const deck = JSON.parse(sessionStorage.getItem("deck") || "[]");
        console.log(deck.length);
        const cardIndex1 = deck.findIndex(
          (card: ICard) => c.cardId === card.cardId
        );
        deck.splice(cardIndex1, 1);
        console.log(deck.length);
        sessionStorage.setItem("deck", JSON.stringify(deck));
        toast.success("Card removed from deck!");
        setCards(deck);
        setReload(!reload);
    }
  }

  function cardCount(cardId: string):number {
    if (sessionStorage.getItem("deck")) {
      const deck = JSON.parse(sessionStorage.getItem("deck") || "[]");
      const cardCount = deck.filter((c: ICard) => c.cardId === cardId).length;
      return cardCount;
    }
    return 0;
  }

  return (
    <>
      <div className="w-full flex justify-center">
        <div
          className="grid gap-4 justify-items-center"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            maxWidth: "1100px", // 220 * 5
            width: "100%", // allows it to shrink on small screens
          }}
        >
          {cards.map((card) => (
            <div key={card.cardId + card.copy} className="flex">
              <ActionCard
                name={card.name}
                primaryClass={card.primaryClass}
                secondaryClass={card.secondaryClass}
                thirdClass={card.thirdClass}
                actionSlot1={card.actionSlot1}
                actionSlot2={card.actionSlot2}
                actionSlot3={card.actionSlot3}
                cardId={card.cardId}
                cardImg={card.cardImg}
                effectBack={card.effectBack}
                text={card.text}
                gain={card.gain}
                cost={card.cost}
                mainClass={card.mainClass}
                type={card.type}
                key={card.cardId}
              />
              <Tooltip>
                {(sessionStorage.getItem("deck") &&
                  JSON.parse(sessionStorage.getItem("deck") || "[]").filter(
                    (c: ICard) => c.cardId === card.cardId
                  ).length >= 3) ||
                (sessionStorage.getItem("deck") &&
                  deck &&
                  JSON.parse(sessionStorage.getItem("deck") || "[]").some(
                    (c: ICard) => c.cardId === card.cardId
                  )) ? (
                  <div id={`plus${card.cardId}`}>
                    <TooltipTrigger className="self-start">
                      <div
                        className="ml-[3px] self-start w-[28px] h-[28px] rounded-full flex items-center justify-center"
                        onClick={() => removeFromDeck(card)}
                      >
                        <MinusCircleIcon className="hover:bg-rose-500 hover:text-white hover:rounded-full text-rose-500" />
                      </div>
                    </TooltipTrigger>
                    <div className="flex items-center justify-center font-semibold">
                      {cardCount(card.cardId)}
                    </div>
                  </div>
                ) : (
                  <div id={`plus${card.cardId}`}>
                    <TooltipTrigger className="self-start">
                      <div
                        className="ml-[3px] self-start w-[28px] h-[28px] rounded-full flex items-center justify-center"
                        onClick={() => addToDeck(card)}
                      >
                        <PlusCircleIcon className="hover:bg-black hover:text-white hover:rounded-full" />
                      </div>
                    </TooltipTrigger>
                    <div className="flex items-center justify-center font-semibold">
                      {cardCount(card.cardId)}
                    </div>
                  </div>
                )}
                <TooltipContent>
                  {(sessionStorage.getItem("deck") &&
                    JSON.parse(sessionStorage.getItem("deck") || "[]").filter(
                      (c: ICard) => c.cardId === card.cardId
                    ).length >= 3) ||
                  (sessionStorage.getItem("deck") &&
                    deck &&
                    JSON.parse(sessionStorage.getItem("deck") || "[]").some(
                      (c: ICard) => c.cardId === card.cardId
                    )) ? (
                    <p className="bg-black text-white rounded-sm w-full pt-1 pb-1 pr-2 pl-2">
                      Remove from Deck
                    </p>
                  ) : (
                    <p className="bg-black text-white rounded-sm w-full pt-1 pb-1 pr-2 pl-2">
                      Add to Deck
                    </p>
                  )}
                </TooltipContent>
              </Tooltip>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
