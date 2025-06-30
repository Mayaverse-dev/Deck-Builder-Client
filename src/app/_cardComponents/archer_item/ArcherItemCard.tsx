import React from "react";
import { Card, CardContent } from "./Card";
import Image from "next/image";

interface ICard {
  name:string,
  primaryClass:string,
  secondaryClass:string | null,
  thirdClass:string | null,
  text:string,
  cost: number,
  gain: number,
  effectBack:string,
  actionSlot1: string | null,
  actionSlot2: string | null,
  actionSlot3: string | null,
  cardId: string,
  cardImg: string,
  mainClass: string,
  type:string
}

export const ArcherItemCard = ({name, primaryClass, text, cost, effectBack, cardId, cardImg }:ICard) => {
  // Data for the action buttons
  const actionButtons = [
    { id: 1, text: text},
    { id: 2, text: text},
    { id: 3, text: text },
  ];

  return (
    <Card className="w-[180px] h-[252px] p-0 rounded-lg">
      <CardContent className="p-0 rounded-lg">
        <div className="relative h-[252px] overflow-hidden bg-cover rounded-lg" style={{ backgroundImage: `url('/Images/${cardImg}')` }}>
          {/* Top section with ITEM label and icon */}
          <div className="absolute w-[165px] h-9 top-[5px] left-2.5">
            <Image
              className="absolute w-[161px] h-[19px] top-[5px] left-0"
              alt="Vector"
              src="/Images/TitleBack.png"
              width={161}
              height={19}
            />            
            <div className="absolute w-5 h-[11px] top-[9px] left-2 [font-family:'Oswald',Helvetica] font-extrabold text-[#3d3631] text-[11px] tracking-[0] leading-[11px]">
              ITEM
            </div>
            <Image
              className="absolute w-9 h-9 top-0 left-[129px]"
              alt="Clip path group"
              src={`/Images/${primaryClass}`}
              width={36}
              height={36}
            />
          </div>

          {/* Bottom section with action buttons and BOLA label */}
          <div className="absolute w-[188px] h-[119px] top-[126px] left-0">
            {/* Action buttons background */}
            {[0, 32, 64].map((topPosition, index) => (
              <React.Fragment key={index}>
                <Image
                  className="absolute w-40 h-[29px] top-[${topPosition}px] left-2.5"
                  alt="Vector"
                  src={`/Images/${effectBack}`}
                  style={{ top: topPosition }}
                  width={160}
                  height={29}
                />
                <div
                  key={index}
                  className="absolute h-[9px] left-[14px] [font-family:'Oswald',Helvetica] font-normal text-[#3d3631] text-[9px] tracking-[0] leading-[9px]"
                  style={{ top: topPosition+3 }}
                >
                  {actionButtons[index].text}
                </div>
              </React.Fragment>
            ))}

            {/* BOLA section */}
            <Image
              className="absolute w-40 h-[18px] top-[96px] left-2.5"
              alt="Vector"
              src="/Images/Item_Effect.png"
              width={160}
              height={18}
            />
            <div className="absolute w-[100px] truncate h-[11px] top-[100px] left-[45px] [font-family:'Oswald',Helvetica] font-extrabold text-[#3d3631] text-[11px] tracking-[0] leading-[11px]">
              {name}
            </div>

            <div className="absolute w-[188px] h-28 top-[7px] left-0">
              {/* Bottom line with Apply 1 Root text */}
              <div className="absolute w-[180px] h-2.5 top-[102px] left-0 ">
              </div>

              {/* Product code */}
              <div className="absolute w-4 h-1 top-[105px] left-[161px] [font-family:'Oswald',Helvetica] font-normal text-black text-[4px] tracking-[0] leading-[4px]">
                {cardId}
              </div>
            </div>

            {/* Number indicator */}
            <Image
              className="absolute w-[33px] h-[33px] top-[86px] left-[7px]"
              alt="Vector"
              src="/Images/BrownCircle.png"
              width={33}
              height={33}
            />
            <div className="absolute w-2 h-5 top-[92px] left-[18px] [font-family:'Oswald',Helvetica] font-bold text-[#faf9e7] text-xl tracking-[0] leading-5">
              {cost}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
