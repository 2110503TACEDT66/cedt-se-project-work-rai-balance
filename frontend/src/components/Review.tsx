import Image from "next/image";
import Link from "next/link";
import { ReviewItem } from "../../interface";
import { ReviewJson } from "../../interface";
import { ReviewItem2 } from "../../interface";
import Rating from '@mui/material/Rating';

export default async function Review({
   reviewjson
}:{
   reviewjson: Promise<ReviewItem2>
}){

   const reviewjsonReady = await reviewjson;
   console.log(reviewjson)
   
  

   return(
      <>
         <div className="flex min-h-full w-auto flex-1 flex-col justify-center rounded-3xl px-6 py-12 md:px-15 md:mx-20 lg:mx-[200px]">
               
               <div
                  className="bg-white p-5 rounded-xl drop-shadow-xl w-auto m-3"
                  // key={ReviewItem2.createAt}
               >
                  Rating: 
                  <Rating
                
                     size="large"
                     name="rate"
                     value={(reviewjsonReady.data.rating.valueOf())}
                     readOnly
                     
            />
               <div className="text-lg font-normal flex flex-row justify-between">
                  conmment: {reviewjsonReady.data.comment}
                  
                  
                  </div>
               </div>

            
      </div>
          

      </>
   )
}
