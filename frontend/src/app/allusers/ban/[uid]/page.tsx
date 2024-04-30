import Link from "next/link";
import AllBooking from "@/components/AllBooking";
import getBookings from "@/libs/getBookings";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import deleteBooking from "@/libs/deleteBooking";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import getAllUsers from "@/libs/getAllUser";
import getUserById from "@/libs/getUserById";
import banById from "@/libs/BanUser";
import banUserById from "@/libs/BanUser";
import { ReviewItem4, UserBookingItem2 } from "interface";

export default async function ConfirmBan({
  params,
}: {
  params: { uid: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  const user = session?.user._id;
  if (!session || !session.user.token) return null;
  console.log(`ban ${session.user.token}`);

  const users = await getUserById(session.user.token, params.uid);
  console.log(users.data.reservations);

  return (
    <div>
      <div className="flex min-h-full w-auto flex-1 flex-col justify-center rounded-3xl px-6 py-12 md:px-15 md:mx-20 lg:mx-[200px]">
        <div className="bg-white p-5 rounded-3xl drop-shadow-xl w-auto text-black">
          <div className="font-bold text-2xl pt-5 pl-7 mb-5">
            {users.data.name}
          </div>
          <hr className="bg-gray-200 border" />
          <table className="table-auto border-separate border-spacing-2 px-5 ">
            <tbody>
              <tr>
                <td>Email</td>
                <td>:</td>
                <td>{users.data.email}</td>
              </tr>
              <tr>
                <td>Tel.</td>
                <td>:</td>
                <td>{users.data.telephone}</td>
              </tr>

              {/* <tr><td>Member Since</td><td>{'    '}</td><td>{}</td></tr> */}
              <tr>
                <td>Point</td>
                <td>:</td>
                <td>{users.data.currentPoint}</td>
              </tr>
            </tbody>
          </table>

          {users.data.reservations.map((reservation: UserBookingItem2) => (
            <div className="bg-slate-100 p-5 rounded-md text-black ml-4 mb-2 mr-4">
              <tbody key={reservation._id}>
                <tr>
                  <td>BookingID</td>
                  <td>{"    "}</td>
                  <td>{reservation._id}</td>
                </tr>
                <tr>
                  <td>Date</td>
                  <td>{"    "}</td>
                  <td>{reservation.apptDate}</td>
                </tr>
                <tr>
                  <td>Start</td>
                  <td>{"    "}</td>
                  <td>{reservation.start}</td>
                </tr>
                <tr>
                  <td>End</td>
                  <td>{"    "}</td>
                  <td>{reservation.end}</td>
                </tr>
              </tbody>
              <div className="bg-slate-200 p-4 rounded-md text-black mx-4 mt-2 mb-2 ">
                <div className="font-bold">Review</div>
                {reservation.reviews.map((review: ReviewItem4) => (
                  <tbody key={review._id}>
                    <tr>
                      <td>ReviewID</td>
                      <td>:</td>
                      <td>{review._id}</td>
                    </tr>
                    <tr>
                      <td>Rating</td>
                      <td>:</td>
                      <td>{review.rating}</td>
                    </tr>
                    <tr>
                      <td>Comment</td>
                      <td>:</td>
                      <td>{review.comment}</td>
                    </tr>
                    <tr className="text-red-600">
                      <td>Status</td>
                      <td>:</td>
                      <td>{review.approval}</td>
                    </tr>
                  </tbody>
                ))}
              </div>
            </div>
          ))}

          <div className="ml-5">
            {users.data.role == "user" ? (
              <Link href={`/allusers/confirmban/${params.uid}`}>
                <button className="block rounded-md bg-black hover:bg-red-600 px-6 py-2 text-white shadow-sm">
                  Ban
                </button>
              </Link>
            ) : users.data.role == "banned user" ? (
              <Link href={`/allusers/confirmunban/${params.uid}`}>
                <button className="block rounded-md bg-black  px-6 py-2 text-white shadow-sm">
                  Unban
                </button>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="flex min-h-full w-auto flex-1 flex-col justify-center rounded-3xl px-6 py-12 md:px-15 md:mx-20 lg:mx-[200px]">
          <div className="bg-white p-5 rounded-3xl drop-shadow-xl w-auto">
            <div className="text-xl text-center text-gray-600 m-5 p-5">User Information</div>
              
            <div className="text-xl text-center text-gray-600 m-5 p-5">
              name: {users.data.name}
              <br></br>
              telephone: {users.data.telephone}
              <br></br>
              email: {users.data.email}
              <br></br>
              Point: {users.data.currentPoint}
              {users.data.reservations.map((reservation: any) => (
                <li key={reservation._id}>
                  {/* Display reservation details here */
}
//           Reservation ID: {reservation._id}
//           {reservation.reviews.map((review: any) => (
//             <li key={review._id}>
//               Review ID: {review._id}
//               <br></br>
//               Status: {review.approval}
//               {/* Display other review details */}
//             </li>
//           ))}
//           {/* Add more details as needed */}
//         </li>
//       ))}

//     </div>
//     <div className="flex justify-center items-center">
//         <Link href={`/allusers/confirmban/${params.uid}`}>
//             <button className="block m-auto rounded-md px-8 py-2 font-semibold text-white shadow-sm bg-[#252645] bg-gradient-to-r hover:from-[#252645] hover:to-[#5C5EAB]">
//               confirm{/* Change button text based on ban status */}
//             </button>
//         </Link>
//     </div>
//   </div>
//  */}
