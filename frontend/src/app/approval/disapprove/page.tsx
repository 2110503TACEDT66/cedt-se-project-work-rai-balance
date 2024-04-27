// app/approval/page.tsx
import { GetServerSideProps } from 'next';
import { getSession } from "next-auth/react"
import AllApproval from '@/components/AllApproval';
import { ApproveJson } from 'interface';
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import approve from '@/libs/approval';
import { ApproveItem } from 'interface';

export default async function DisapprovalPage({ approvesItem }: { approvesItem: ApproveItem }) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null

    const approves = approve(session.user.token,approvesItem,"disapproved")
    return(
        <main>
            <AllApproval approvesJson={approves}/>
        </main>
    )
};