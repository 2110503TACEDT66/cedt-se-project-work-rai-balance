import Link from "next/link"
import { BookingItem2, BookingJson } from "../../../interface"
import AllBooking from "@/components/AllBooking"
import getBookings from "@/libs/getBookings"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getReviewForReservation from "@/libs/getReviewforReservation"
import deleteBooking from "@/libs/deleteBooking";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react"
import getPendingReviews from "@/libs/getPendingReviews"
import AllPending from "@/components/AllPending"

export default async function PendingPage() {
    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null

    const pendings = getPendingReviews(session.user.token, "pending");
    

    return (
        <main>
            <AllPending reviewJsonCoworking={pendings}/>
        </main>
    )
}