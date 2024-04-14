
export default async function getReviewForReservation(token:string,id:string) {
   const response = await fetch(`${process.env.BACKEND_URL}/api/project/reservations/${id}/reviews`,{
      cache: "no-store",
      method: "GET",
      headers: {
         authorization: `Bearer ${token}`,
      }
   })

   if(!response.ok){
      throw new Error("Failed to fetch coworking")
   }
   return await response.json()
}

