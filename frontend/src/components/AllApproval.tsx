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
                <div className="bg-white p-5 rounded-xl drop-shadow-xl w-auto m-3">
                    {ApproveItem._id}
                    <br/>
                    {ApproveItem.approval}
                    <br/>
                    {ApproveItem.comment}
                    <br/>
                    {ApproveItem.coworking}
                    <br/>
                    {ApproveItem.user}

                    <Link href={"approval/edit/" + ApproveItem._id} >
                    <Image src={'/img/edit.png'} className='w-[20px] ml-5 mt-auto mb-auto' alt='logo'
                      width={0} height={0} sizes='100vh'/>
                    </Link>
                </div>
                
            ))}
        </div>
      </>
    );
  }