import { ReviewItemEdit } from "../../interface"

export default async function editReview(token: string, reviewId:string,reviewItemEdit:Partial<ReviewItemEdit>){
   const response = await fetch(`${process.env.BACKEND_URL}/api/project/reviews/${reviewId}`,{
      cache: "no-store",
       method: "PUT",
       headers: {
         "Content-type":"application/json",
         authorization: `Bearer ${token}`,
       },body: JSON.stringify(reviewItemEdit)
    })
    
    if(!response.ok){
      return await response.json()
    }

    return await response.json()
}