import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import deleteBooking from "@/libs/deleteBooking";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import editReviewStatus from "@/libs/editReviewStatus";
import { useState } from "react";
// import { ApproveReviewEdit } from "interface";

export default async function ApproveReview({params}:{params:{rid:string}}) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null


    const approveReviews =  await editReviewStatus(session.user.token, params.rid, "approved")

    return (
        <div>
            a
        </div>
    )
}