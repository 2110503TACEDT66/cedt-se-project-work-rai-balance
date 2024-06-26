import getCoworking from "@/libs/getCoworking"
import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AllReviews from "@/components/AllReviews";
import getAllReviewsByCoworkingId from "@/libs/getReviewsByCoworkingId";

export default async function CoworkingDetailPage({params}:{params:{cid:string}}){
   const session = await getServerSession(authOptions)
   if (!session || !session.user.token) 
      return (
         <main className="flex flex-col items-center justify-center h-screen">
            <p className="text-white text-lg text-center mb-4 text-5xl font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Please log in to view this content.</p><br /><br />
            <Link href={`/login`}>
               <button className="block px-4 py-2 text-lg font-semibold text-white bg-gradient-to-r from-[#252645] to-[#5C5EAB] rounded-md shadow-md hover:from-[#5C5EAB] hover:to-[#252645] transition duration-300 ease-in-out">
                  Log in to make Reservation
               </button>
            </Link>
         </main>

         
      )
   const coworkingDetail = await getCoworking(params.cid)
   // const token = session?.user?.token ?? '';
   
   console.log(session.user.token);
   const reviews = await getAllReviewsByCoworkingId(session.user.token, params.cid);
   console.log(reviews);

   
   console.log(params.cid)
   return(
      <main className="p-5 ">
         <div className="bg-white flex min-h-full w-auto flex-1 flex-wrap justify-center rounded-t-3xl px-16 py-12 md:px-15 md:mx-20 relative shadow-xl">
            <h1 className="text-3xl text-center font-bold text-[#252645] mb-4">{coworkingDetail.data.name}</h1>
            
         
            <div className="flex flex-wrap my-5 justify-center w-full relative">
               <div className="rounded-lg w-[230px] h-[280px] relative">
                  <Image
                     src={coworkingDetail.data.picture}
                     alt="Product Picture"
                     fill={true}
                     className="object-cover absolute rounded-lg  shadow-xl"
                  />
               </div>
                  <table className="table-auto border-separate border-spacing-4  p-8 mx-2 lg:text-lg ">
                     <tbody className="px-2" >
                        <tr><td>name</td><td>{'    '}</td><td>{ coworkingDetail.data.name }</td></tr>
                        <tr><td>ID</td><td>{'    '}</td><td>{params.cid}</td></tr>
                        <tr><td>Address</td><td>{'    '}</td><td>{ coworkingDetail.data.address } { coworkingDetail.data.district} { coworkingDetail.data.province} { coworkingDetail.data.region} { coworkingDetail.data.postalcode} </td></tr>
                        <tr><td>tel.</td><td>{'    '}</td><td>{ coworkingDetail.data.telephone }</td></tr>
                        <tr><td>open - close time</td><td>{'    '}</td><td>{ coworkingDetail.data.opentime } - {coworkingDetail.data.closetime}</td></tr>
                     </tbody>
                  </table>   
                     
            </div>
            <div className="px-5 my-2 items-center">
            {session ?
                  <>
                  {session.user.role !== 'banned user'?
                     <Link href={`/booking?id=${params.cid}&name=${coworkingDetail.data.name}`}>
                        <button className="block rounded-md px-3 py-2 text-md font-semibold text-white shadow-sm bg-[#252645] bg-gradient-to-r hover:from-[#252645] hover:to-[#5C5EAB]">Make Reservation</button>
                     </Link>:<p className="text-red-500">You are banned and cannot make reservations.</p>
                  }
                     
                     {/* {session.user.role === 'banned user' && <p className="text-red-500">You are banned and cannot make reservations.</p>} */}
                  </> :
                  <Link href={`/login`}>
                     <button className="block rounded-md px-3 py-2 text-md font-semibold text-white shadow-sm bg-[#252645] bg-gradient-to-r hover:from-[#252645] hover:to-[#5C5EAB]">Log in to make Reservation</button>
                  </Link>
               }
            </div>
         </div>
         <div className="bg-white rounded-b-3xl px-16 py-12 md:px-15 md:mx-20 relative shadow-xl mb-[100px]">
            
            <AllReviews reviewJson={reviews}/>
         </div>
         
         
             
      </main>
   )
}