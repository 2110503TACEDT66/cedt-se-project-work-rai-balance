import { ApproveItemEdit } from "../../interface"

export default async function editApprove(token: string, reviewId:string,approval:string){
   const response = await fetch(`${process.env.BACKEND_URL}/api/project/reviews/${reviewId}/approve`,{
      cache: "no-store",
       method: "PUT",
       headers: {
         "Content-type":"application/json",
         authorization: `Bearer ${token}`,
       },body: JSON.stringify({approval})
    })
    
    if(!response.ok){
      return await response.json()
    }

    return await response.json()
}