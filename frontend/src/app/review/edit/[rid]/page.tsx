"use client"
import Link from "next/link";
import editReview from "@/libs/editReview";
import { ReviewItemEdit } from "../../../../../interface";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import * as React from "react";
import editUserProfile from "@/libs/editUserProfile";
import getReviewForReservation from "@/libs/getReviewforReservation";
import { useSession } from "next-auth/react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Image from "next/image";

export default function EditReview({ params }: { params: { rid: string } }) {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session || !session.user.token) return null;
  console.log(params.rid);

  const [hasEdit, setHasEdit] = useState(false);
  const [data, setData] = useState({
    rating: -1,
    comment: "",
  });

  const updateReview = async () => {
    if (data.rating || data.comment) {
      const item: Partial<ReviewItemEdit> = {};
      if (data.rating !== -1) {
        item.rating = data.rating;
      }
      if (data.comment !== "") {
        item.comment = data.comment;
      }

      console.log(item);

      const editing = await editReview(session.user.token, params.rid, item);
      console.log("Booking result:", editing);
      if (editing.success == true) {
        setHasEdit(true);
        router.refresh();
        router.replace("/mybooking")
      } else if (editing.success == false) {
        alert(editing.message);
      }
    }
  };

  const [comment, setcomment] = useState<string>("");
  const [rating, setRating] = useState<Number | 0>(0);
  const [value, setValue] = React.useState<number | null>(0);

  return (
    <main className="mt-8 w-auto items-center content-center place-content-center flex justify-center place-items-center w-[100%]">
      <div className="bg-white min-h-full w-[70%] rounded-3xl m-8 px-16 py-12 md:px-15 md:mx-20 relative">
        <div className="text-xl font-medium flex flex-row">
          <Image
            src={"/img/userlogo.png"}
            className="h-[100%] mt-11 w-auto mb-auto mt-auto"
            alt="logo"
            width={0}
            height={0}
            sizes="10vh"
          />
          <div className="m-5 ">{session.user.name}</div>
        </div>
        <div className="mt-4 text-xl font-bold leading-9 tracking-tight text-gray-900">
          Edit Review
        </div>
        <br />

        <div>
          <Typography component="legend" className="flex flex-row">
            Tap to rate
          </Typography>
          <Rating
            data-testid="rating-component"
            size="large"
            name="rate"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              if (newValue !== null) {
                setRating(newValue);
              } else {
                newValue = 0;
              }
              setData({ ...data, rating: newValue.valueOf() });
              console.log("this " + newValue);
            }}
          />
        </div>
        <br />
        <div>Comment</div>
        <form className="border-2 mb-10 w-[100%] rounded-lg p-5">
          <TextField
            className="m-5 p-10 py-5 w-[100%]"
            variant="standard"
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
        </form>
        <div>
          <button
            className="flex w-[40%] m-auto justify-center  rounded-md bg-[#252645] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-gradient-to-r hover:from-[#252645] hover:to-[#5C5EAB]"
            type="submit"
            onClick={updateReview}
          >
            {hasEdit ? <Link href={`/mybooking`}>complete</Link> : "Edit"}
          </button>
        </div>
      </div>
    </main>
  );
}
