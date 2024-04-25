"use client";

import InteractiveCard from "./InteractiveCard";

export default function ReviewCard({
  rating,
  description,
}: {
  rating:number,
  description:string
}) {
  return (
    // <div>
    //     this
    // </div>
    <InteractiveCard contentName={description}>
        <div className="w-full h-[70%] relative rounded-t-lg bg-white mt-5">
        {rating}
      </div>
      <div className="w-full h-[30%] p-[10px] font-bold">{description}</div>
    </InteractiveCard>
        

        );
}
