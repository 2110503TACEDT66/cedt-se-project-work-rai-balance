"use client";
import Link from "next/link";

import editReview from "@/libs/editReview";
import { ReviewItemEdit } from "../../../../../interface";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import * as React from 'react';
import editUserProfile from "@/libs/editUserProfile";
import { useSession } from "next-auth/react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

export default function EditReview({params}:{params:{rid:string}}) {
   const {data: session} = useSession()
    if (!session || !session.user.token ) return null

    
  const [hasEdit, setHasEdit] = useState(false);
  const [data, setData] = useState({
    rating: -1,
    comment: "",
    
  });

  const editProfile = async (e: FormEvent) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    console.log(data.rating);
    if (data.rating || data.comment ) {
      const item: Partial<ReviewItemEdit> = {}
        if (data.rating !== -1) {
          item.rating = data.rating
        }
        if (data.comment !== "") {
          item.comment = data.comment
        }
        
      console.log(item)
            
            const editing = await editReview(session.user.token, params.rid,item);
            console.log("Booking result:", editing);
            if (editing.success == true) {
               setHasEdit(true)
            }
            else if (editing.success == false) {
                alert(editing.message)
            }
    }
  };

  const [comment, setcomment] = useState<string>("")
  const [rating, setRating] = useState<Number|0>(0)
  const [value, setValue] = React.useState<number | null>(0);


  return (
    <>
      <div className="flex min-h-full w-auto flex-1 flex-col justify-center rounded-3xl px-6 py-12 md:px-15 md:mx-20 lg:mx-[300px]">
        <div className="bg-white p-5 rounded-3xl drop-shadow-xl w-auto">
          <div className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Edit Profile
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={editProfile} >
            <Typography component="legend" className="flex flex-row">Tap to rate</Typography>
            <Rating
                
                size="large"
                name="rate"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    if (newValue !== null) {
                        setRating(newValue)
                        
                    }else{
                     newValue=0
                    }
                    setData({ ...data, rating: newValue.valueOf() });
                    console.log("this " + newValue);
                }}
                
            />
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
                        setData({ ...data, comment: e.target.value });
                     }}
                  />
               


              <div>
                
                  <button
                  className="flex w-[40%] m-auto justify-center  rounded-md bg-[#252645] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-gradient-to-r hover:from-[#252645] hover:to-[#5C5EAB]"
                  type="submit"
                  >
                    {hasEdit ? "complete" : "Edit"}
                  </button>
                
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}