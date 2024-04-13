
export default async function getPointHistory(token:string,id:string) {

    const response = await fetch(`${process.env.BACKEND_URL}/api/project/auth/${id}/points`,{
      cache: "no-store",
      method: "GET",
      headers: {
         authorization: `Bearer ${token}`,
      }
   })
    if(!response.ok){
       throw new Error("Failed to fetch history")
    }
    return await response.json()
 }