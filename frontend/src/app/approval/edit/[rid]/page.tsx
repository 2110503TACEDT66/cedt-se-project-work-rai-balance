'use client'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import deleteBooking from "@/libs/deleteBooking";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { useState } from "react";
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
import { BookingItemEdit } from "../../../../../interface";
import editBooking from "@/libs/editBooking";
import approve from "@/libs/approval";



export default function ApproveReview({params}:{params:{rid:string}}) {
    const { data: session } = useSession();
    if (!session || !session.user.token) return null;
    
    const approveReviews = async () => {    
        console.log(session.user.token)
        console.log(params.rid)
        
      const editing = await editApprove(session.user.token, params.rid, "approved");
      console.log("Edit result:", editing);
      if (editing.success === true) {
        
      } else if (editing.success === false) {
        alert(editing.message);
      }
    };
  
    return (
      <main>
        
        <button className="block m-auto rounded-md px-8 py-2 font-semibold text-white shadow-sm bg-[#252645] bg-gradient-to-r hover:from-[#252645] hover:to-[#5C5EAB]"
          onClick={approveReviews}
        >
          Submit
        </button>
      </main>
    );
}

