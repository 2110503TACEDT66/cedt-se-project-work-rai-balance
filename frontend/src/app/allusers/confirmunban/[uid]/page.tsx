'use client'
import Link from "next/link"
import AllBooking from "@/components/AllBooking"
import getBookings from "@/libs/getBookings"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import deleteBooking from "@/libs/deleteBooking";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react"
import getAllUsers from "@/libs/getAllUser"
import getUserById from "@/libs/getUserById";
import { useState } from 'react';
import banById from "@/libs/BanUser";
import banUserById from "@/libs/BanUser";
import unbanUserById from "@/libs/UnbanUser";
import { useSearchParams } from "next/navigation";


export default function ConfirmUnban({params}:{params:{uid:string}}){
   const {data: session} = useSession()
   if (!session || !session.user.token) return null
   const router = useRouter();
   const urlParams = useSearchParams()

   const [hasUnban, setHasUnban] = useState(false)

  
   console.log(`ban ${session.user.token}`);
    
   const unban = async() => {

      const unbanUser = await unbanUserById(session.user.token, params.uid)

      console.log("result:", unbanUser)
      
      if(unbanUser.success == true){
         setHasUnban(true)
         router.replace("/allusers")
         router.refresh()
      }else if(unbanUser.success == false){
         alert(unbanUser.message)
      }
   }
    


    return(
      <div>
       <div className="flex min-h-full w-auto flex-1 flex-col justify-center rounded-3xl px-6 py-12 md:px-15 md:mx-20 lg:mx-[200px]">
            <div className="bg-white p-5 rounded-3xl drop-shadow-xl w-auto">
                
                <div className="text-xl text-center text-gray-600 m-5 p-5">You Have Successfully Unban</div>

        </div>
        <div className="flex justify-center items-center">
            {/* <Link href={'/allusers'}> */}
                <button  onClick={unban} className="block rounded-md bg-black hover:bg-indigo-900 px-3 py-2 text-white shadow-sm flex flex-row m-10" >
                  View All Users
                </button>
            {/* </Link> */}
        </div>
        </div>
      </div>
    )



}