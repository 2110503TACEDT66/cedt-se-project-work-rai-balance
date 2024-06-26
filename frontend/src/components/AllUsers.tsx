import Link from "next/link";
import { UserItem, UserJson, UserBookingItem, UserBookingItem2 } from "../../interface";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import deleteBooking from "@/libs/deleteBooking";

export default async function AllUsers({
  usersJson,
}: {
  usersJson: Promise<UserJson>;
}) {
  const usersJsonReady = await usersJson;
  console.log(usersJsonReady);

  /*const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null

    const handleDeleteBooking = async (token: string, bookingItem: BookingItem2) => {
        const response = await deleteBooking(token, bookingItem);
        if (response.success == true) {
          alert('You deleted')
        } else if (response.success == false){
         alert(response.message)
        }
    };*/

  return (
    <>
        <div className="text-3xl font-bold text-center mt-10 mb-6"> You have {usersJsonReady.count} users </div>
        
        <div className="flex min-h-full w-auto flex-1 flex-col justify-center rounded-3xl px-6 py-12 md:px-15 md:mx-20 lg:mx-[200px]">
          {usersJsonReady.data.map((UserItem: UserItem) => (

            <div className="bg-white p-5 rounded-xl drop-shadow-xl w-auto m-3" key={UserItem.email}>
              <div className="text-xl font-bold mb-2">
                {UserItem.name}
              </div>
              <hr />
              <div className="text-md ">
                Name : {UserItem.name}
                <br />
                Email : {UserItem.email}
                <br />
                Tel. : {UserItem.telephone}
                <br />
                Point : {UserItem.currentPoint}
                <br />
                Number of Reservations : {UserItem.reservationCount}
                <br />
                Chances to Review : {UserItem.reviewWithoutApproval}
              </div>
              
              
              {/* <div className="text-[20px] font-lg"> Email: {UserItem.email}
                <div className="text-md mt-2">Name: {UserItem.name}</div>
                <div className="text-md mt-2">Telephone: {UserItem.telephone}</div>
                <div className="text-md mt-2">Point: {UserItem.currentPoint}</div>
                <div className="text-md mt-2">Number of Reservations: {UserItem.reservationCount}</div>
                <div className="text-md mt-2">Chances to Review: {UserItem.reviewWithoutApproval}</div>
              </div> */}
              
              {
                UserItem.reservations.map((UserBookingItem: UserBookingItem)=>
                <div className="bg-slate-200 p-5 rounded-xl text-black ml-5 mt-2 mb-2 mr-4  " key={UserItem.email}>Reservation Date: {UserBookingItem.apptDate.split('T')[0]} 
                <br />from {UserBookingItem.start} to {UserBookingItem.end}
                <br />
                  
                    
                        {
                          UserBookingItem.hasReview == 'no'? null
                          :
                          <div className="flex flex-column">
                            <div>
                              Review Status :
                            </div>
                            {
                              UserBookingItem.hasReview == 'pending'?
                                  <div className="text-yellow-500">
                                    Review is pending
                                  </div>:
                              UserBookingItem.hasReview == 'approved'?
                                  <div className="text-emerald-500">
                                    Review has been approved
                                  </div>:
                              UserBookingItem.hasReview == 'disapproved'?
                                  <div className="text-red-600">
                                    Review has been disapproved
                                  </div>:
                                  null

                            }
                            
                          </div>
                        }
                  </div>
                
                
                  )
              }
              <div className="ml-5 flex flex-row">
              
                {
                  UserItem.role === 'user' && UserItem.currentPoint === 0 && UserItem.reviewWithoutApproval === 0 ?
                    <Link href={`allusers/ban/${UserItem._id}`}>
                      <button className="block m-auto rounded-md px-8 py-2 font-semibold text-white shadow-sm bg-black hover:bg-red-600">
                        Ban
                      </button>
                    </Link>
                  :
                  UserItem.role === 'banned user' ?
                    <Link href={`allusers/ban/${UserItem._id}`}>
                      <button className="block m-auto rounded-md px-8 py-2 font-semibold text-white shadow-sm bg-black ">
                        Unban
                      </button>
                    </Link>
                  :
                  null
                }
              
              
          </div>
            </div>
          ))}
          
        </div>
    </>
  );
}



{/*<div>{UserItem.email}
          {
            UserItem.reservations.map((UserBookingItem: UserBookingItem)=>
            <div>{UserBookingItem.apptDate}</div>)
          }
        </div>*/}