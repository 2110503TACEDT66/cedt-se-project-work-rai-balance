import Link from "next/link"
import { BookingItem2, BookingJson } from "../../../interface"
import AllBooking from "@/components/AllBooking"
import getBookings from "@/libs/getBookings"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import deleteBooking from "@/libs/deleteBooking";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react"
import getPointHistory from "@/libs/getPointHistory"
import AllHistory from "@/components/AllHistory"

export default async function PointHistory() {
    // const router = useRouter();

    // const {data: session} = useSession()
    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null
    
    const history = getPointHistory(session.user.token, session.user._id)
    
    return (
        <main>
            <AllHistory historyJson={history}/>
        </main>
    )
}