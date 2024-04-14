import getReviewForReservation from "@/libs/getReviewforReservation";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Review from "@/components/Review";

export default async function ReviewDetailPage({params}:{params:{bid:string}}){
   const session = await getServerSession(authOptions)
   if (!session || !session.user.token) return null

   const reviewDetail = await getReviewForReservation(session.user.token,params.bid)
   
   console.log(reviewDetail.data._id)
   return(
      <main>
         <div>
            
         </div>
            <Review reviewjson={reviewDetail}/>
            <Link href={`/review/edit/${reviewDetail.data._id}`}><button className="block m-auto rounded-md px-8 py-2 font-semibold text-white shadow-sm bg-[#252645] bg-gradient-to-r hover:from-[#252645] hover:to-[#5C5EAB]">Edit My Review</button></Link>
        </main>
   )
}