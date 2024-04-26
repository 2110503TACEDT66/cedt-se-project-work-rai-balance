export default async function getOneReview(token:string,id:string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/project/reviews/${id}`,{
        cache: "no-store",
        method: "GET",
        headers: {
        authorization: `Bearer ${token}`,
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }
    return await response.json();
  }
  