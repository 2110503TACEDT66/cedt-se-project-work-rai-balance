import Link from "next/link";
import { ApproveItem, ApproveJson } from "../../interface";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import deleteBooking from "@/libs/deleteBooking";
import Image from "next/image";

export default async function AllApproval({
    approvesJson,
  }: {
    approvesJson: Promise<ApproveJson>;
  }) {
    const approvesJsonReady = await approvesJson;
    console.log(approvesJsonReady)
  
    return (
      <>
        <div className="text-[30px] font-bold text-center mt-10">
          {approvesJsonReady.count}
        </div>
        <div className="flex min-h-full w-auto flex-1 flex-col justify-center rounded-3xl px-6 py-12 md:px-15 md:mx-20 lg:mx-[200px]">
            {approvesJsonReady.data.map((ApproveItem:ApproveItem)=>(
                <div className="bg-white p-5 rounded-xl drop-shadow-xl w-auto m-3 ">
                    Status : {ApproveItem.approval}
                    <br/>
                    Review ID : {ApproveItem._id}
                    <br/>
                    Comment : {ApproveItem.comment}
                    <br/>
                    Coworking-Space ID : {ApproveItem.coworking}
                    <br/>
                    User ID : {ApproveItem.user}

                    <br /><br />
                    <div className="flex flex-row">
                    <Link href={"/approval/editApprove/" + ApproveItem._id } >
                      <button className="mx-5 m-auto rounded-md px-5 py-2 font-semibold text-white shadow-sm bg-[#252645] bg-gradient-to-r hover:from-[#252645] hover:to-[#5C5EAB]">Approve</button>
                    </Link>
                    <Link href={"/approval/editDisapprove/" + ApproveItem._id + `?id=${ApproveItem._id}&name=${ApproveItem.comment.toString()}`} >
                      <button className="m-auto rounded-md px-5 py-2 font-semibold text-white shadow-sm bg-[#252645] bg-gradient-to-r hover:from-[#252645] hover:to-[#5C5EAB]">Disapprove</button>
                    </Link>
                    </div>
                    
                </div>
                
            ))}
        </div>
      </>
    );
  }