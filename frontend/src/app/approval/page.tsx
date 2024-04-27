//  'use client'
// import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Approval() {
    
    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null
    if (session.user.role==='user') {
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
            <div className="flex flex-col">
                <div className="h-24 mt-20">       
                    <Link href={'approval/approve'} className="">
                        <button className="h-full bg-black text-left font-semibold font-sans w-3/4 text-white text-9xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] shadow-sm bg-[#252645] bg-gradient-to-r hover:from-[#000000] hover:to-[#21D375]">Approve </button>
                    </Link>
                </div>
                <div className="h-24 mt-20">
                    <Link href={'approval/pending'} className="">
                        <button className="h-full bg-black text-left font-semibold font-sans w-3/4 text-white text-9xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] shadow-sm bg-[#252645] bg-gradient-to-r hover:from-[#000000] hover:to-[#F4C430]">Pending </button>
                    </Link>
                </div>
                
                <div className="h-24 mt-20">
                    <Link href={'approval/disapprove'} className="">
                        <button className="h-full bg-black text-left font-semibold font-sans w-3/4 text-white text-9xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] shadow-sm bg-[#252645] bg-gradient-to-r hover:from-[#000000] hover:to-[#FB3B1E]">Disapprove </button>
                    </Link>
                </div>
                {/* <div>
                    <Link href={'approval/disapprove'} className=" w-1/4">
                        <button className="m-2 px-[200px] text-center rounded-2xl text-2xl font-semibold bg-rose-400">Disapprove list</button>
                    </Link>
                </div> */}
                
            </div>
        </main>
    );
}

// const { data: session } = useSession();

    // if (session?.user.role === 'user') {
   
    // }

//  'use client'
// import { useSession } from "next-auth/react";
// import Link from "next/link";

// export default function Approval() {
//     // return (
//     //     <div>
//     //         Hi
//     //     </div>
//     // )
//     const { data: session } = useSession();

//     if (session?.user.role === 'user') {
//         return (
//             <main className="items-center">
//                 <div className="text-red-500 text-3xl font-bold text-center m-10">
//                     Not authorized 
//                 </div>
//                 <Link href={'/'}>
//                     <button className="mx-[46%] p-3 border-2 bg-white text-center text-2xl font-semibold">Go back</button>
//                 </Link>
//             </main>
//         );
//     }

//     return (
//         <main>
//             <div className="flex flex-row">
//                 <Link href={'approval/approve'} className=" w-1/3">
//                     <button className="border-2 p-[200px] text-center text-2xl font-semibold bg-emerald-300 shadow-xl">Approve list</button>
//                 </Link>
//                 <Link href={'approval/pending'} className=" w-1/3">
//                     <button className="border-2 p-[200px] text-center text-2xl font-semibold bg-amber-300 shadow-xl">Pending list</button>
//                 </Link>
//                 <Link href={'approval/disapprove'} className=" w-1/3">
//                     <button className="border-2 p-[200px] text-center text-2xl font-semibold bg-rose-400 shadow-xl">Disapprove list</button>
//                 </Link>
//             </div>
//         </main>
//     );
// }
