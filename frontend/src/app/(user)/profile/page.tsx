import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
import Link from "next/link";

export default async function Profile() {
    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null

    const profile = await getUserProfile(session.user.token)
    var createdAt = new Date(profile.data.createdAt)
    const formattedCreatedAt = createdAt.toLocaleDateString()

    return (
        <main>
            <div className="flex min-h-full w-auto flex-1 flex-col justify-center rounded-3xl px-6 py-12 md:px-15 md:mx-20 lg:mx-[200px]">
                <div className="bg-white p-5 rounded-3xl drop-shadow-xl w-auto text-black">
                    <div className="text-2xl pt-5 pl-7 mb-5">{profile.data.name}</div>
                    <hr className="bg-gray-200 border" />
                        <table className="table-auto border-separate border-spacing-2 p-5 ">
                            <tbody >
                                <tr><td>Email</td><td>{'    '}</td><td>{profile.data.email}</td></tr>
                                <tr><td>Tel.</td><td>{'    '}</td><td>{profile.data.telephone}</td></tr>
                                <tr><td>Member Since</td><td>{'    '}</td><td>{formattedCreatedAt}</td></tr>
                                {
                                    profile.data.role == 'user'?<tr><td>Point</td><td>{'    '}</td><td>{profile.data.currentPoint}</td></tr>
                                    :null
                                }
                                
                            </tbody>
                        </table>
                        <div className="ml-5">
                            <Link href={`/profile/edit/${session.user._id}`}>
                                <button className="block rounded-md bg-black hover:bg-indigo-900 px-6 py-2 text-white shadow-sm">
                                    Edit
                                </button>
                            </Link>
                    </div>
                </div>
            

            </div>
            
        </main>
    );
}
