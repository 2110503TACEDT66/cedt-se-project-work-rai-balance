// import { BookingItem } from "../../interface"

export default async function getPendingReviews(token: string, wants:string){
   
    const response = await fetch(`${process.env.BACKEND_URL}/api/project/reviews/all`,{
       method: "POST",
       headers: {
            authorization: `Bearer ${token}`,
       },
       body: JSON.stringify({
        approval: wants
     }),
    })
    
    if(!response.ok){
      return await response.json()
    }

    return await response.json()
 }