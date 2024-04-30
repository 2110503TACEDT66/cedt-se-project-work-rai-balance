'use client'
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


export default function ApproveReview({params}:{params:{rid:string}}) {
  const {data: session} = useSession()
   if (!session || !session.user.token) return null
   const router = useRouter();
   const urlParams = useSearchParams()

   const [hasApprove, setHasApprove] = useState(false)

   const disapprove = async() => {
        const disapproveReview = await editApprove(session.user.token, params.rid, "disapproved")
        console.log("result:", disapproveReview)

        if(disapproveReview.success == true){
          setHasApprove(true)
      }else if(disapproveReview.success == false){
          alert(disapproveReview.message)
      }

   }

   const control = async() => {     
    router.replace("/approval")
    router.refresh()}

    useEffect(() => {
      disapprove();
    }, []);


    return (
      <main>
        <div className="flex min-h-full w-auto flex-1 flex-col justify-center rounded-3xl px-6 py-12 md:px-15 md:mx-20 lg:mx-[200px]">
            <div className="bg-white p-5 rounded-3xl drop-shadow-xl w-auto">
                
                <div className="text-xl text-center text-gray-600 m-5 p-5">Disapprove Successfully</div>

            </div>
          <div className="flex justify-center items-center">
              {/* <Link href={'/approval'}> */}
                  <button onClick={control} className="block rounded-md bg-black hover:bg-indigo-900 px-3 py-2 text-white shadow-sm flex flex-row m-10" >
                  Back to Menu
                  </button>
              {/* </Link> */}
          </div>
        </div>
      </main>
    );
}

