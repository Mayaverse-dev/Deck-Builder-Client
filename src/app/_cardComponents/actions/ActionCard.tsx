import React, { useEffect, useState } from 'react';
import { Card, CardContent } from './Card';
import Image from 'next/image';

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

export const ActionCard = ({name, primaryClass, secondaryClass, thirdClass, text, cost, gain, effectBack, actionSlot1, actionSlot2, actionSlot3, cardId, cardImg }:ICard) => {
  const [bottomIcons, setBottomIcons] = useState<{ src: string; alt: string }[]>([])
  const [cardIcons, setCardIcons] = useState<{ src: string; alt: string }[]>([])
  useEffect(() => {
    if (primaryClass && secondaryClass && thirdClass) {
      setCardIcons([
        { src: `/Images/${primaryClass}`, alt: primaryClass },
        { src: `/Images/${secondaryClass}`, alt: secondaryClass },
        { src: `/Images/${thirdClass}`, alt: thirdClass },
      ])
    } else if (primaryClass && secondaryClass) {
      setCardIcons([
        { src: `/Images/${primaryClass}`, alt: primaryClass },
        { src: `/Images/${secondaryClass}`, alt: secondaryClass },
      ])
    } else {
      setCardIcons([
        { src: `/Images/${primaryClass}`, alt: primaryClass },
      ])
    }
  }, [primaryClass, secondaryClass, thirdClass])
  useEffect(() => {
    console.log(actionSlot3)
    if (actionSlot3) {
      setBottomIcons([
        { src: `/Images/${actionSlot1}`, alt: actionSlot1 || ""},
        { src: `/Images/${actionSlot2}`, alt: actionSlot2 || ""},
        { src: `/Images/${actionSlot3}`, alt: actionSlot3 || ""}
      ])
    } else {
      setBottomIcons([
        { src: `/Images/${actionSlot1}`, alt: actionSlot1 || ""},
        { src: `/Images/${actionSlot2}`, alt: actionSlot2 || ""}
      ])
    }
  }, [actionSlot3, actionSlot1, actionSlot2])

  return (
    <Card className="w-[180px] h-[252px] p-0 border-0 rounded-lg">
      <CardContent className={`relative h-[252px] p-0 overflow-hidden bg-cover rounded-lg`} style={{ backgroundImage: `url('/Images/${cardImg}')` }}>
        {/* Top section with title and icons */}
        <div className="absolute w-[169px] h-[87px] top-[5px] left-1.5">
          <div className="absolute w-[136px] h-[18px] top-0.5 left-[17px]">
            <div className="relative w-[134px] h-[18px]">
              <Image
                className="absolute w-[124px] h-[15px] top-px left-[3px]"
                alt="Vector"
                src="/Images/TitleBack.png"
                width={124}
                height={15}
              />
              <div className="absolute w-[100px] h-[11px] top-1 left-[20px] [font-family:'Oswald',Helvetica] font-bold text-[#403731] text-[11px] tracking-[0] leading-[11px] truncate">
                {name}
              </div>
            </div>
          </div>

          {/* Number 1 circle in top left */}
          <Image
            className="absolute w-[33px] h-[33px] top-px left-0"
            alt="Vector"
            src="/Images/BrownCircle.png"
            width={33}
            height={33}
          />
          <div className="absolute w-2 h-5 top-[7px] left-[11px] [font-family:'Oswald',Helvetica] font-bold text-[#f5ede3] text-xl tracking-[0] leading-5">
            {cost}
          </div>

          {/* Top right icons with minimal overlapping effect */}
          {cardIcons.map((icon, index) => {
            const topPosition = index * 26; // Further increased spacing for less overlap
            const leftPosition = 133;

            return (
              <React.Fragment key={index}>
                <Image
                  className={`absolute w-9 h-9 z-[${20 + index}]`}
                  style={{ top: `${topPosition}px`, left: `${leftPosition}px` }}
                  alt={icon.alt}
                  src={icon.src}
                  width={36}
                  height={36}

                />
              </React.Fragment>
            );
          })}
        </div>

        {/* Bottom section with text and number */}
        <div className="absolute w-[184px] h-[66px] top-[186px] left-0">
          <div className="absolute w-[184px] h-[25px] top-[41px] left-0">
            <div className="absolute w-[180px] h-2.5 top-4 left-0">
              <div className="absolute w-3 h-2 top-1 left-[151px] [font-family:'Inter',Helvetica] font-bold text-black text-[4.3px] tracking-[0] leading-[4.3px]">
                eGAIN
              </div>
            </div>
            <div className="absolute w-4 h-1 top-[18px] left-2.5 [font-family:'Oswald',Helvetica] font-normal text-black text-[4px] tracking-[0] leading-[4px]">
              {cardId}
            </div>
          </div>

          {/* Card description and image */}
          <Image
            className="absolute w-40 h-[50px] top-0 left-2.5"
            alt="Clip path group"
            src={`/Images/${effectBack}`}
            width={160}
            height={50}
          />
          <div className="absolute w-[127px] h-[9px] top-3.5 left-4 [font-family:'Oswald',Helvetica] font-normal text-black text-[9px] tracking-[0] leading-[9px]">
            {text}
          </div>

          {/* Bottom right number circle with number 2 - improved visibility */}
          <Image
            className="absolute w-[33px] h-[33px] top-[26px] left-[141px] z-20"
            alt="Vector"
            src="/Images/BrownCircle.png"
            width={33}
            height={33}
          />
          <div className="absolute top-[31px] left-[152px] z-30 [font-family:'Oswald',Helvetica] font-bold text-[#f5ede3] text-xl tracking-[0] leading-5">
            {gain}
          </div>
        </div>
        {bottomIcons?.length === 3 ? (
          <div className="absolute top-[136px] flex gap-1 place-content-center right-[15.5%]">
            {bottomIcons.map((icon, index) => (
              <img
                key={index}
                className="w-10 h-10"
                style={{ left: `${39 + index * 55}px` }} // Increased spacing between octagonal symbols
                alt={icon.alt}
                src={icon.src}
              />
            ))}
          </div>
        ) : (
          <div className="absolute top-[136px] flex gap-1 place-content-center right-[27%]">
            {bottomIcons.map((icon, index) => (
              <img
                key={index}
                className="w-10 h-10"
                style={{ left: `${39 + index * 55}px` }} // Increased spacing between octagonal symbols
                alt={icon.alt}
                src={icon.src}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
