'use client'

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import deleteBooking from "@/libs/deleteBooking";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import deleteBookingById from "@/libs/deleteBooking";

export default function DeleteBookingPage({params}:{params:{mid:string}}) {
    const {data: session} = useSession()
   if (!session || !session.user.token) return null
   const router = useRouter();
   const urlParams = useSearchParams()

   const [hasDelete, setHasDelete] = useState(false)
    

    const deleteBooking = async() => {
        const deletedBookings = await deleteBookingById(session.user.token,params.mid)
        console.log("result:", deletedBookings)
    
        if(deletedBookings.success == true){
            setHasDelete(true)
        }else if(deletedBookings.success == false){
            alert(deletedBookings.message)
        }
    }
    const control = async() => {     
        router.replace("/mybooking")
        router.refresh()}

        useEffect(() => {
            deleteBooking();
          }, []);

    return (
        <div className="flex min-h-full w-auto flex-1 flex-col justify-center rounded-3xl px-6 py-12 md:px-15 md:mx-20 lg:mx-[200px]">
            <div className="bg-white p-5 rounded-3xl drop-shadow-xl w-auto">
                
                <div className="text-xl text-center text-gray-600 m-5 p-5">You Have Successfully Deleted</div>

        </div>
        <div className="flex justify-center items-center">
            {/* <Link href={'/mybooking'}> */}
                <button onClick={control} className="block rounded-md bg-black hover:bg-indigo-900 px-3 py-2 text-white shadow-sm flex flex-row m-10" >
                    View My Booking
                </button>
            {/* </Link> */}
        </div>
        </div>

    )
}