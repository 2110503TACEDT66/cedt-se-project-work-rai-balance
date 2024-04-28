export default async function unbanUserById(token:string,id:string){
   
   const response = await fetch(`${process.env.BACKEND_URL}/api/project/auth/${id}/unban`,{
      cache: "no-store",
      method: "GET",
      headers: {
         authorization: `Bearer ${token}`,
      }
   })
   
   if(!response.ok){
      throw new Error("Cannot Unban user profile")
   }
   return await response.json()
}