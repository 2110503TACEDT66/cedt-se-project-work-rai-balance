import Link from "next/link";
import { BookingItem2, BookingJson, ReviewItemCoworking, ReviewJsonCoworking } from "../../interface";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import deleteBooking from "@/libs/deleteBooking";
import Image from "next/image";

export default async function AllPending({
    reviewJsonCoworking,
}: {
    reviewJsonCoworking: Promise<ReviewJsonCoworking>;
}) {
    const reviewJsonCoworkingReady = await reviewJsonCoworking;
    console.log(reviewJsonCoworkingReady);

    return (
        <>
            <div>
                {
                    reviewJsonCoworkingReady.data?.map((reviewItemCoworking: ReviewItemCoworking) => (
                        // <div className="border-2 m-3 p-3 bg-white">
                        <>
                            {reviewItemCoworking.approval === 'pending' && (
                                <div className="border-2 bg-white m-5 p-5">
                                    <div>
                                        <div>
                                            Status: {reviewItemCoworking.approval}
                                        </div>
                                        <div>
                                            Coworking-Space: {reviewItemCoworking.coworking}
                                        </div>
                                        <div>
                                            Rating: {reviewItemCoworking.rating.valueOf()}
                                        </div>
                                        <div className="flex flex-row">
                                            Comment: {reviewItemCoworking.comment}
                                            <Link href={`/approval/approved/${reviewItemCoworking._id}`}><button className="border-2 ml-[100px]"> approve </button></Link>
                                            
                                            <Link href={"s"}><button className="border-2 ml-[100px]"> more info </button></Link>
                                        </div>
                                    </div>
                                </div>  
                            )}     
                            </>             
                        // </div>
                    ))
                }
            </div>
        </>
    )
}