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

export const ArenaCard = ({name, primaryClass, text, cost, effectBack, cardId, cardImg }:ICard) => {
    return (
      <Card className="w-[180px] h-[252px] p-0 overflow-hidden">
        <CardContent className="p-0">
          <div className="relative h-[252px] overflow-hidden bg-cover" style={{ backgroundImage: `url('/Images/${cardImg}')` }}>
            {/* Top section with ITEM label and icons */}
            <div className="absolute w-[165px] h-[87px] top-[5px] left-2.5">
              <Image
                className="absolute w-[161px] h-[19px] top-[5px] left-0"
                alt="Vector"
                src="/Images/TitleBack.png"
                width={161}
                height={19}
              />
              <div className="absolute w-5 h-[11px] top-[9px] left-[7px] [font-family:'Oswald',Helvetica] font-extrabold text-[#3d3631] text-[11px] tracking-[0] leading-[11px]">
                ARENA
              </div>
  
              {/* Three icon containers - bottom symbol on top */}
              <div className="absolute top-0 left-[129px] flex flex-col">
                {/* First icon - lowest z-index */}
                {primaryClass && 
                  (<div className="relative w-9 h-9 z-10">
                    <Image
                      className="absolute w-9 h-9 left-[1px]"
                      alt="Clip path group"
                      src={`/Images/${primaryClass}`}
                      width={36}
                      height={36}
                    />
                  </div>)
                }
                
  
                {/* Second icon - middle z-index */}
                {/* <div className="relative w-9 h-9 z-20 -mt-2">
                  <Image
                    className="absolute w-9 h-9 left-[1px]"
                    alt="Clip path group"
                    src="/clip-path-group-1.png"
                  />
                </div> */}
  
                {/* Third icon - highest z-index (bottom symbol on top) */}
                {/* <div className="relative w-9 h-9 z-30 -mt-2">
                  <Image
                    className="absolute w-9 h-9"
                    alt="Clip path group"
                    src="/clip-path-group-2.png"
                  />
                </div> */}
              </div>
            </div>
  
            {/* Bottom section with ability text and value */}
            <div className="absolute w-[186px] h-[86px] top-[166px] left-0">
              <Image
                className="absolute w-[161px] h-[51px] top-0 left-2.5"
                alt="Vector"
                src={`/Images/${effectBack}`}
                width={161}
                height={51}
              />
              <Image
                className="absolute w-40 h-[18px] top-[55px] left-2.5"
                alt="Vector"
                src={`/Images/${effectBack}`}
                width={160}
                height={18}
              />
              <div className="absolute w-[100px] truncate h-[11px] top-[58px] left-[46px] [font-family:'Oswald',Helvetica] font-extrabold text-[#3d3631] text-[11px] tracking-[0] leading-[11px]">
                {name}
              </div>
  
              <div className="absolute w-[186px] h-[73px] top-[13px] left-0">
                <div className="absolute w-4 h-1 top-[63px] left-[150px] [font-family:'Oswald',Helvetica] font-normal text-black text-[4px] tracking-[0] leading-[4px]">
                  {cardId}
                </div>
  
                {/* Ability text now positioned inside the blue box */}
                <div className="absolute w-[145px] h-[18px] top-[0px] left-[18px] [font-family:'Oswald',Helvetica] font-normal text-[#3d3631] text-[9px] tracking-[0] leading-[9px]">
                  {text}
                </div>
              </div>
  
              {/* Value circle with number 1 */}
              <div className="relative">
                <Image
                  className="absolute w-[33px] h-[33px] top-[45px] left-[7px]"
                  alt="Vector"
                  src="/Images/BrownCircle.png"
                  width={33}
                  height={33}
                />
                <div className="absolute w-2 h-5 top-[52px] left-[18px] [font-family:'Oswald',Helvetica] font-bold text-[#faf9e7] text-xl tracking-[0] leading-5">
                  {cost}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  