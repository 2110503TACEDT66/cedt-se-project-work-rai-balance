
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


export default async function ConfirmBan({params}:{params:{uid:string}}){
  const session = await getServerSession(authOptions)
  if (!session || !session.user.token) return null
  
  const user = session?.user._id;
  if (!session || !session.user.token) return null
    console.log(`ban ${session.user.token}`);
    
    
    const banUser = await banUserById(session.user.token, params.uid)

    console.log("result:", banUser)
    
    if(banUser.success == false){
        alert(banUser.message)
    }
    


    return(
      <div>
       <div className="flex min-h-full w-auto flex-1 flex-col justify-center rounded-3xl px-6 py-12 md:px-15 md:mx-20 lg:mx-[200px]">
            <div className="bg-white p-5 rounded-3xl drop-shadow-xl w-auto">
                
                <div className="text-xl text-center text-gray-600 m-5 p-5">You Have Successfully Deleted</div>

        </div>
        <div className="flex justify-center items-center">
            <Link href={'/allusers'}>
                <button className="block rounded-md bg-black hover:bg-indigo-900 px-3 py-2 text-white shadow-sm flex flex-row m-10" >
                View All Users
                </button>
            </Link>
        </div>
        </div>
      </div>
    )



}