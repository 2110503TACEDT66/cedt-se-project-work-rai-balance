import Link from "next/link";

export default function Approval() {
    return (
        <main>
            <div className="flex flex-row">
                    <Link href={'approval/approve'} className=" w-1/3">
                        <button className="border-2 p-[200px] bg-white text-center text-2xl font-semibold bg-emerald-300 shadow-xl">Approve list</button>
                    </Link>
                    <Link href={'approval/pending'} className=" w-1/3">
                        <button className="border-2 p-[200px] bg-white text-center text-2xl font-semibold bg-amber-300 shadow-xl">Pending list</button>
                    </Link>
                    <Link href={'approval/disapprove'} className=" w-1/3">
                        <button className="border-2 p-[200px] bg-white text-center text-2xl font-semibold bg-rose-400 shadow-xl">Disapprove list</button>
                    </Link>
            </div>
            
        </main>
    )
}