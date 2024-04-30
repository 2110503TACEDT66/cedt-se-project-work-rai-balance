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
  console.log(approvesJsonReady);

  return (
    <>
      <div className="text-[30px] font-bold text-center pt-10">
        {approvesJsonReady.count} Reviews
      </div>
      <div className="flex min-h-full w-auto flex-1 flex-col justify-center rounded-3xl px-6 py-12 md:px-15 md:mx-20 lg:mx-[200px]">
        {approvesJsonReady.data.map((ApproveItem: ApproveItem) => (
          <div className="bg-white p-5 rounded-xl drop-shadow-xl w-auto m-3 ">
            {ApproveItem.approval == "approved" ? (
              <div className="text-[20px] font-bold text-emerald-500">
                Status : {ApproveItem.approval}
              </div>
            ) : ApproveItem.approval == "pending" ? (
              <div className="text-[20px] font-bold text-yellow-500">
                Status : {ApproveItem.approval}
              </div>
            ) : ApproveItem.approval == "disapproved" ? (
              <div className="text-[20px] font-bold text-red-600">
                Status : {ApproveItem.approval}
              </div>
            ) : null}
            {/* <br/> */}
            Review ID : {ApproveItem._id}
            <br />
            {/* Rating : {ApproveItem.rating}
                    <br/> */}
            Comment : {ApproveItem.comment}
            <br />
            Coworking-Space ID : {ApproveItem.coworking}
            <br />
            User ID : {ApproveItem.user}
            <br />
            <br />
            {ApproveItem.approval == "approved" ? (
              <div className="flex justify-center">
                <Link
                  href={
                    "/approval/editDisapprove/" +
                    ApproveItem._id +
                    `?id=${
                      ApproveItem._id
                    }&name=${ApproveItem.comment.toString()}`
                  }
                >
                  <button className="m-auto rounded-md px-5 py-2 font-semibold text-white shadow-sm bg-[#be2020] bg-gradient-to-r hover:from-[#be2020] hover:to-[#d24747]">
                    Disapprove
                  </button>
                </Link>
              </div>
            ) : ApproveItem.approval == "pending" ? (
              <div className="flex justify-center">
                <Link href={"/approval/editApprove/" + ApproveItem._id}>
                  <button className="mx-5 m-auto rounded-md px-5 py-2 font-semibold text-white shadow-sm bg-emerald-500 bg-gradient-to-r hover:from-[#26a333] hover:to-[#47c754]">
                    Approve
                  </button>
                </Link>
                <Link
                  href={
                    "/approval/editDisapprove/" +
                    ApproveItem._id +
                    `?id=${
                      ApproveItem._id
                    }&name=${ApproveItem.comment.toString()}`
                  }
                >
                  <button className="m-auto rounded-md px-5 py-2 font-semibold text-white shadow-sm bg-[#be2020] bg-gradient-to-r hover:from-[#be2020] hover:to-[#d24747]">
                    Disapprove
                  </button>
                </Link>
              </div>
            ) : ApproveItem.approval == "disapproved" ? (
              <div className="flex justify-center">
                <Link href={"/approval/editApprove/" + ApproveItem._id}>
                  <button className="rounded-md px-5 py-2 font-semibold text-white shadow-sm bg-emerald-500 bg-gradient-to-r hover:from-[#26a333] hover:to-[#47c754]">
                    Approve
                  </button>
                </Link>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </>
  );
}
