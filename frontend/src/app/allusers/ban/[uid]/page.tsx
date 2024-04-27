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


export default async function ConfirmBan({params}:{params:{uid:string}}){
  const [isBanned, setIsBanned] = useState(false);
  const { data: session } = useSession();
  const user = session?.user._id;
  if (!session || !session.user.token) return null
    console.log(`ban ${session.user.token}`);
    
    const users = await getUserById(session.user.token,params.uid)
    console.log(users)

    const handleBanClick = async () => {
      console.log('Ban button clicked');
      // Call your API or perform any other action to ban the user
      try {
        // Call your ban user API here
        // Example:
        const banUser = await banUserById(session.user.token, params.uid)
        
        // const response = await banUser(session.user.token, params.uid);
        // Update state or perform any other actions based on the response
        setIsBanned(true); // Update state to reflect user is banned
      } catch (error) {
        console.error('Error banning user:', error);
        // Handle error, display message to user, etc.
      }
    };

    return(
      <div>
          <button className="block m-auto rounded-md px-8 py-2 font-semibold text-white shadow-sm bg-[#252645] bg-gradient-to-r hover:from-[#252645] hover:to-[#5C5EAB]"
          onClick={handleBanClick}
          disabled={isBanned}
          >
            {isBanned ? 'User Banned' : 'Ban'} {/* Change button text based on ban status */}</button>
        

      </div>
    )



}