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
import { useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
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
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [type, setType] = React.useState("");
  const [sliderValue, setSliderValue] = React.useState<unknown>(5);
  const [classes, setClasses] = React.useState<
    Array<{ value: string; label: string }>
  >([]);
  //make 4 states for the 4 card types: Action, Item, Arena, ArcherItem
  const [actionCards, setActionCards] = React.useState<ICard[]>([]);
  const [itemCards, setItemCards] = React.useState<ICard[]>([]);
  const [arenaCards, setArenaCards] = React.useState<ICard[]>([]);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/auth/login"); // Redirect to login page
    }
  }, [isLoaded, isSignedIn, router]);
  useEffect(() => {
    axios
      .get("https://yuyutsu-deckbuilder-api.vercel.app/class/all")
      .then((res) => {
        const arr: { value: string; label: string }[] = [];
        console.log(res.data);
        res.data.map((item: { name: string }) => {
          arr.push({ value: item.name, label: item.name });
        });
        setClasses(arr);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleFilter() {
    const maxCost = sliderValue as number;
    const cardType = type;
    const cardClass = classes.find((c) => c.value === value)?.label || "";
    console.log(maxCost, cardType, cardClass);
    if (!maxCost || !cardType || !cardClass) {
      toast.error("Please set all filters before applying.");
      return;
    }

    axios
      .post("https://yuyutsu-deckbuilder-api.vercel.app/cards/filter", {
        maxCost,
        type: cardType,
        class: cardClass,
      })
      .then((res) => {
        const cards = res.data;
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
            FILTER NON-DECK CARDS
          </h2>
        </div>
        <div className="flex items-center justify-center">
          <Separator orientation="vertical" className="" />
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between mx-5"
              >
                {value
                  ? classes.find((framework) => framework.value === value)
                      ?.label
                  : "Select Card Class..."}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search Classes..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {classes.map((framework) => (
                      <CommandItem
                        key={classes.indexOf(framework)}
                        value={framework.value}
                        onSelect={(currentValue) => {
                          console.log(currentValue, value);
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        {framework.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            value === framework.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Separator orientation="vertical" className="" />
          <RadioGroup defaultValue="comfortable" className="ml-2 p-5">
            <div className="flex items-center gap-3">
              
              <RadioGroupItem
                value="All Cards"
                id="r1"
                onClick={(e) => setType((e.target as HTMLInputElement).value.split(" ")[0])}
              />
              <Label htmlFor="r1">All Cards</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="Action Cards"
                id="r2"
                onClick={(e) => setType((e.target as HTMLInputElement).value.split(" ")[0])}
              />
              <Label htmlFor="r2">Action Cards</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="Item Cards"
                id="r3"
                onClick={(e) => setType((e.target as HTMLInputElement).value.split(" ")[0])}
              />
              <Label htmlFor="r3">Item Cards</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="Arena Cards"
                id="r4"
                onClick={(e) => setType((e.target as HTMLInputElement).value.split(" ")[0])}
              />
              <Label htmlFor="r4">Arena Cards</Label>
            </div>
          </RadioGroup>
          <Separator orientation="vertical" className="ml-2" />
          <div className="flex flex-col justify-center items-center ml-2 px-5">
            <Label htmlFor="slider" className="text-sm font-medium">
              Max Card Cost:{sliderValue as number}
            </Label>
            <br></br>
            <Slider
              defaultValue={[sliderValue as number]}
              max={10}
              step={1}
              onValueChange={(v) => setSliderValue(v[0])}
            />
          </div>
          <Separator orientation="vertical" className="ml-4" />
          <Button
            className="ml-4"
            onClick={() => {
              handleFilter();
            }}
          >
            Apply Filter
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
