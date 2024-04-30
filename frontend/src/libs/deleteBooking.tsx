import { BookingItem2 } from "../../interface"

export default async function deleteBookingById(token: string, bookingId: string){
   
    const response = await fetch(`${process.env.BACKEND_URL}/api/project/reservations/${bookingId}`,{
       method: "DELETE",
       headers: {
            authorization: `Bearer ${token}`,
       },
    })
    
    if(!response.ok){
        return await response.json()
    }

    return await response.json()
 }