export default async function getAllReviewsByCoworkingId(token:string,id:string) {
   const response = await fetch(`${process.env.BACKEND_URL}/api/project/coworkings/${id}/reviews/all`, {
      method: "GET",
      headers: {
         authorization: `Bearer ${token}`,
      }
   })

   if(!response.ok){
     return await response.json()
   }
   return await response.json()
}