import Link from "next/link";
import { BookingItem2, BookingJson } from "../../interface";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import deleteBooking from "@/libs/deleteBooking";
import Image from "next/image";

export default async function AllBooking({
  bookingsJson,
}: {
  bookingsJson: Promise<BookingJson>;
}) {
  const bookingsJsonReady = await bookingsJson;
  console.log(bookingsJsonReady)
  console.log("PPPPPP");
  console.log(new Date);

  return (
    <>
      <div className="text-[30px] font-bold text-center mt-10">
        You have {bookingsJsonReady.count} bookings
      </div>
      <div className="flex min-h-full w-auto flex-1 flex-col justify-center rounded-3xl px-6 py-12 md:px-15 md:mx-20 lg:mx-[200px]">
        {bookingsJsonReady.data.map((BookingItem2: BookingItem2) => (
          <div
            className="bg-white p-5 rounded-xl drop-shadow-xl w-auto m-3"
            key={BookingItem2.createAt}
          >
            <div className="text-[25px] font-bold flex flex-row justify-between">
              {BookingItem2.coworking?.name}
              
              {
                (BookingItem2.hasReview == "no" && new Date().toISOString() < new Date(new Date(BookingItem2.apptDate.split("T")[0] + "T" + BookingItem2.start + ".000Z").getTime() - 7 * 60 * 60 * 1000).toISOString()) ?(
                  <div className="ml-5 flex flex-row">
                    <Link href={"/mybooking/edit/" + BookingItem2._id} >
                    <Image src={'/img/edit.png'} className='w-[20px] ml-5 mt-auto mb-auto' alt='logo'
                      width={0} height={0} sizes='100vh'/>
                    </Link>
                    <Link href={`/mybooking/delete/${BookingItem2._id}`}>
                    <Image src={'/img/trash.png'} className='w-[20px] ml-5 mt-auto mb-auto' alt='logo'
                    width={0} height={0} sizes='100vh'/>
                    </Link>
                  </div>
                  
                ):(
                  <div className="ml-5 flex flex-row">
                  <div className="text-sm font-light text-slate-400">
                    Editing and deleting are no longer available after the start of reservation
                  </div>
                  
                </div>
                  
                )
              }
              
            </div>
            <div className="text-md mt-5">
              From {BookingItem2.start} to {BookingItem2.end}
            </div>
            <div className="text-md mt-2">
              Date {BookingItem2.apptDate.split("T")[0]}
            </div>
            <div className="text-md mt-2">By {BookingItem2.user}</div>
            <div className="mt-5 flex justify-end">
              <div className="ml-5">
              {
                new Date().toISOString() > new Date(new Date(BookingItem2.apptDate.split("T")[0] + "T" + BookingItem2.start + ".000Z").getTime() - 7 * 60 * 60 * 1000).toISOString()?
                <div>
                  {BookingItem2.hasReview == 'no' ?(
                  <Link href={`/review?id=${BookingItem2._id}&name=${BookingItem2.coworking?.name}`}>
                    <button className="block rounded-md bg-black hover:bg-indigo-900 px-6 py-2 text-white shadow-sm right-5 bottom-5">
                      Review
                    </button>
                  </Link>
                    
                ):(
                  <Link href={`/review/${BookingItem2._id}`}>
                      <button className="block rounded-md bg-black hover:bg-indigo-900 px-6 py-2 text-white shadow-sm right-5 bottom-5">
                        My Review
                      </button>
                  </Link>
                  )
                }
                </div>
                : <div>
                  Please review after {new Date(BookingItem2.apptDate).toLocaleDateString()} {BookingItem2.end}
                </div>
              }
              
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </>
  );
}