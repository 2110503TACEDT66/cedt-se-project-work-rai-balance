// // import { ReviewItemEdit } from "../../interface"

// // import { ApproveReviewEdit } from "interface"

// export default async function editReviewStatus(token: string, reviewId: string, status:string){
//    const response = await fetch(`${process.env.BACKEND_URL}/api/project/reviews/${reviewId}/approve`,{
//       cache: "no-store",
//        method: "PUT",
//        headers: {
//          authorization: `Bearer ${token}`,
//        },
//        body: JSON.stringify({
//         approval:status
//        })
//     })
    
//     if(!response.ok){
//       return await response.json()
//     }

//     return await response.json()
// }