
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import deleteBooking from "@/libs/deleteBooking";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { useEffect, useState } from "react";
import editApprove from "@/libs/editApprove";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/redux/features/bookingSlice";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BookingItemEdit, ReviewItemCoworking } from "../../../../../interface";
import editBooking from "@/libs/editBooking";
import approve from "@/libs/approval";
import getOneReview from "@/libs/getOneReview";


export default async function ApproveReview({params}:{params:{rid:string}}) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user.token) return null
  
  const approveReview = await editApprove(session.user.token, params.rid, "approved")
  console.log("result:", approveReview)
  
  if(approveReview.succes == false){
      alert(approveReview.message)
  }

    return (
      <main>
        <div className="bg-white p-5 rounded-3xl drop-shadow-xl w-auto">     
                <div className="text-xl text-center text-gray-600 m-5 p-5">Approve Successfully</div>
        </div>
        <div className="flex justify-center items-center">
            <Link href={'/approval'}>
                <button className="block rounded-md bg-black hover:bg-indigo-900 px-3 py-2 text-white shadow-sm flex flex-row m-10" >
                Back to Menu
                </button>
            </Link>
        </div>
      </main>
    );
}

