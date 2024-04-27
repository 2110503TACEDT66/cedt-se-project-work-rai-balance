import { ApproveItemEdit, ReviewItem } from "../../interface"
import { ApproveItem } from "../../interface"

export default async function approve(token: string, approveItem:ApproveItemEdit, status:string){
   
    const response = await fetch(`${process.env.BACKEND_URL}/api/project/reviews/all`,{
       method: "POST",
       headers: {
            "Content-type":"application/json",
            authorization: `Bearer ${token}`,
       },
       body: JSON.stringify({
        approval: status
     }),
    })
    
    if(!response.ok){
      return await response.json()
    }

    return await response.json()
 }