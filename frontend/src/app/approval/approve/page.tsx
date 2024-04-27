// app/approval/page.tsx
import { GetServerSideProps } from 'next';
import { getSession } from "next-auth/react"
import AllApproval from '@/components/AllApproval';
import { ApproveItemEdit, ApproveJson } from 'interface';
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import approve from '@/libs/approval';
import { ApproveItem } from 'interface';

export default async function ApprovalPage() {
    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null

    const item: ApproveItemEdit = {
        approval : ""
    }

    const approves = approve(session.user.token,item,"approved")
    return(
        <main>
            <AllApproval approvesJson={approves}/>
        </main>
    )
};