'use client'

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { BookingItem, ReviewItem } from "../../../interface"
import { useSession } from "next-auth/react";
import Link from "next/link";
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { TextField } from "@mui/material";
import postReview from "@/libs/postReview"

export default function Review() {
    const {data: session} = useSession()
    const urlParams = useSearchParams()
    
    const rid = urlParams.get('id')

    const user = session?.user
    const name = urlParams.get('name')
    const h = urlParams.get('hasReview')
    console.log(rid);
    console.log(name);

    const [hasReviewed, setHasReviewed] = useState(false)

    const review = async () => {
        if (rid && user) {
            const item:ReviewItem = {
                reservationId: rid,
                rating: rating,
                comment: comment
            }
            console.log(item)

            const creatingReview = await postReview(session.user.token, item);
            console.log("Review result:", creatingReview);
            if (creatingReview.success == true) {
                setHasReviewed(true)
            }
            else if (creatingReview.success == false) {
                alert(creatingReview.message)
            }
        }
    }

    const [rating, setRating] = useState<Number|0>(0)
    const [comment, setcomment] = useState<string>("")

    const [value, setValue] = React.useState<number | null>(2);
    

    return (
        <main className="mt-8">
        {/* <div className="text-3xl font-bold text-center mb-6 text-[#252645]">Review</div> */}
        <div className="bg-white min-h-full w-auto rounded-3xl m-8 px-16 py-12 md:px-15 md:mx-20 relative">
        <div className="text-xl font-medium ">Review: {name}</div>
        <Box
            sx={{
                '& > legend': { mt: 2 },
            }}
        >
            <Typography component="legend" className="flex flex-row">Tap to rate</Typography>
            <Rating
                
                size="large"
                name="rate"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    if (newValue !== null) {
                        setRating(newValue)
                    }
                    console.log("this " + newValue);
                }}
                
            />
        </Box>
        <form className="border-2 mt-10 mb-10">
            <TextField
                className="m-5 p-10 py-5 w-[100%]"
                variant='standard'
                margin="normal"
                fullWidth
                label="Tell us more"
                id="comment"
                name="comment"
                value={comment}
                placeholder="Write this"
                onChange={(e) => {
                    setcomment(e.target.value);
                }}
            />
        </form>
        {
            hasReviewed?<Link href={`/review/${rid}`}><button className="block m-auto rounded-md px-8 py-2 font-semibold text-white shadow-sm bg-[#252645] bg-gradient-to-r hover:from-[#252645] hover:to-[#5C5EAB]">View My Review</button></Link>:<button className="block m-auto rounded-md px-8 py-2 font-semibold text-white shadow-sm bg-[#252645] bg-gradient-to-r hover:from-[#252645] hover:to-[#5C5EAB]" onClick={review}>Submit</button>
        }
    </div>
</main>


    )
}