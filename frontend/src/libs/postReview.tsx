import { ReviewItem } from "../../interface"

export default async function postBooking(token: string, reviewItem:ReviewItem){
   
    const response = await fetch(`${process.env.BACKEND_URL}/api/project/reservations/${reviewItem.reservationId}/reviews`,{
       method: "POST",
       headers: {
            "Content-type":"application/json",
            authorization: `Bearer ${token}`,
       },
       body: JSON.stringify({
        rating:reviewItem.rating,
        comment:reviewItem.comment
     }),
    })
    
    if(!response.ok){
      return await response.json()
    }

    return await response.json()
 }