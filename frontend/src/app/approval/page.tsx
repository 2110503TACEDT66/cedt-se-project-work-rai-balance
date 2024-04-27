'use client'
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Approval() {
    const { data: session } = useSession();

    if (session?.user.role === 'user') {
        return (
            <main className="items-center">
                <div className="text-red-500 text-3xl font-bold text-center m-10">
                    Not authorized 
                </div>
                <Link href={'/'}>
                    <button className="mx-[46%] p-3 border-2 bg-white text-center text-2xl font-semibold">Go back</button>
                </Link>
            </main>
        );
    }

    return (
        <main>
            <div className="flex flex-row">
                <Link href={'approval/approve'} className=" w-1/3">
                    <button className="border-2 p-[200px] text-center text-2xl font-semibold bg-emerald-300 shadow-xl">Approve list</button>
                </Link>
                <Link href={'approval/pending'} className=" w-1/3">
                    <button className="border-2 p-[200px] text-center text-2xl font-semibold bg-amber-300 shadow-xl">Pending list</button>
                </Link>
                <Link href={'approval/disapprove'} className=" w-1/3">
                    <button className="border-2 p-[200px] text-center text-2xl font-semibold bg-rose-400 shadow-xl">Disapprove list</button>
                </Link>
            </div>
        </main>
    );
}
