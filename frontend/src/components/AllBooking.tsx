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

  return (
    <>
      <div className="text-4xl font-bold text-center mt-10">
        You have {bookingsJsonReady.count} bookings
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 mx-auto max-w-7xl">
        {bookingsJsonReady.data.map((BookingItem2: BookingItem2) => (
          <div
            className="bg-white rounded-lg p-6 shadow-md"
            key={BookingItem2.createAt}
          >
            <div className="text-xl font-semibold">{BookingItem2.coworking?.name}</div>
            <div className="flex justify-between mt-4">
              <div className="text-gray-600">From {BookingItem2.start} to {BookingItem2.end}</div>
              <div className="text-gray-600">Date {BookingItem2.apptDate.split("T")[0]}</div>
            </div>
            <div className="text-gray-600 mt-2">By {BookingItem2.user}</div>
            <div className="mt-4 flex justify-between">
              {BookingItem2.hasReview ? (
                <div className="text-sm text-gray-500">Can not edit or delete</div>
              ) : (
                <div className="flex space-x-4">
                  <Link href={"/mybooking/edit/" + BookingItem2._id}>
                    <a className="text-indigo-500 hover:text-indigo-700">
                      <Image src="/img/edit.png" alt="edit" width={20} height={20} />
                    </a>
                  </Link>
                  <Link href={`/mybooking/delete/${BookingItem2._id}`}>
                    <a className="text-red-500 hover:text-red-700">
                      <Image src="/img/trash.png" alt="delete" width={20} height={20} />
                    </a>
                  </Link>
                </div>
              )}
              <Link href={BookingItem2.hasReview ? `/review/${BookingItem2._id}` : `/review?id=${BookingItem2._id}&name=${BookingItem2.coworking?.name}`}>
                <a className="bg-black hover:bg-indigo-900 text-white px-6 py-2 rounded-md shadow-md">
                  Review
                </a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}