// 'use client'
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

export default async function MyBooking() {
    // const router = useRouter();

    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null
    
    const bookings = getBookings(session.user.token)
    // const reviews = getReviewForReservation("661ad6b69586c1cdfb9a0113")
    
    return (
        <main>
            <AllBooking bookingsJson={bookings}/>
        </main>
    )
}