import Link from "next/link";
import { UserItem, UserJson, UserBookingItem } from "../../interface";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import deleteBooking from "@/libs/deleteBooking";
import { current } from "@reduxjs/toolkit";
import Image from "next/image";

export default function UserPoint({
   userPoint,
   name,
   email
}:{
   userPoint:number,
   name:string,
   email:string
}){
   // console.log(name)
   return (
      <div className="flex min-h-full w-auto flex-1 flex-col justify-center rounded-3xl px-6 py-10 md:px-15 md:mx-20 lg:mx-[200px] h-[300px]">
            <div className="bg-white px-5 py-3 rounded-xl drop-shadow-xl w-auto m-3 h-[300px]">
               <div className="ml-5 flex flex-row justify-between">
                  <div className="text-3xl font-bold my-4 ">
                     My History Point
                  </div>
                  <div className="bg-blue-50 rounded-xl">
                     <div className="text-xl font-bold mx-6 my-[18px]">
                        Point : {userPoint}
                     </div>  
                  </div>
                  
               </div>
               
               <div className="text-md font-medium flex flex-row mx-6">
                    <Image src={'/img/userlogo.png'} className='h-[100%] mt-11 w-auto mb-auto mt-auto' 
                        alt='logo' width={0} height={0} sizes='7vh'/>
                    <div className="flex flex-col mx-4 mt-1">
                        <div className="">{name}</div>
                        <div className="">{email}</div>
                    </div>
                </div>
                <br />
               
            </div>
            
            
      </div>

   )
}