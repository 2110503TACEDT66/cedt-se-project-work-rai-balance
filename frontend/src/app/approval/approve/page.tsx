// app/approval/page.tsx
import { GetServerSideProps } from 'next';
import { getSession } from "next-auth/react"
import AllApproval from '@/components/AllApproval';
import { ApproveItemEdit, ApproveJson } from 'interface';
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import approve from '@/libs/approval';
import { ApproveItem } from 'interface';
import Link from 'next/link';

export default async function ApprovalPage() {
    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null

    const item: ApproveItemEdit = {
        approval : ""
    }

    const approves = approve(session.user.token,item,"approved")
    return(
        <main>
            <div className="flex flex-row z-10 justify-center">
            <div className="bg-white h-20 mt-4 px-5 hover:bg-slate-200">       
                    <Link href={'/approval'} className="">
                        <div className="text-xl font-semibold p-5">
                        All
                        </div>
                        {/* <button className="h-full bg-black text-left font-semibold font-sans w-3/4 text-white text-9xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] shadow-sm bg-[#252645] bg-gradient-to-r hover:from-[#000000] hover:to-[#21D375]">Approve </button> */}
                    </Link>
                </div>
                <div className="bg-slate-200 h-20 mt-4 px-5 hover:bg-slate-200">       
                    <Link href={'/approval/approve'} className="">
                        <div className="text-xl font-semibold p-5">
                        Approve
                        </div>
                        {/* <button className="h-full bg-black text-left font-semibold font-sans w-3/4 text-white text-9xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] shadow-sm bg-[#252645] bg-gradient-to-r hover:from-[#000000] hover:to-[#21D375]">Approve </button> */}
                    </Link>
                </div>
                <div className="bg-white h-20 mt-4 px-5 hover:bg-slate-200">
                    <Link href={'/approval/pending'} className="">
                        <div className="text-xl font-semibold p-5">
                        Pending
                        </div>
                        
                    </Link>
                </div>
                
                <div className="bg-white h-20 mt-4 hover:bg-slate-200">
                    <Link href={'/approval/disapprove'} className="">
                        <div className="text-xl font-semibold p-5">
                            Disapprove
                        </div>
                        
                    </Link>
                </div>
            </div>
            <hr />
            <div className="bg-white ">
                <AllApproval approvesJson={approves}/>
            </div>
        </main>
    )
};