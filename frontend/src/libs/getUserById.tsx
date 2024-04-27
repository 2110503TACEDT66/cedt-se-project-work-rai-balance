export default async function getUserById(token:string,id:string){
   
   const response = await fetch(`${process.env.BACKEND_URL}/api/project/auth/${id}`,{
      cache: "no-store",
      method: "GET",
      headers: {
         authorization: `Bearer ${token}`,
      }
   })
   
   if(!response.ok){
      throw new Error("Cannot get user profile")
   }
   return await response.json()
}