import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getPointHistory from "@/libs/getPointHistory"
import AllHistory from "@/components/AllHistory"
import ProgressBar from "@/components/Progressbar";
import UserPoint from "@/components/UserPoint";
import getUserProfile from "@/libs/getUserProfile";

export default async function PointHistory({params}:{params:{uid:string}}) {

    const session = await getServerSession(authOptions)
    
    const token = session?.user?.token
    let token1 = '';
        if (token !== undefined) {
                token1 = String(token);
            } else {
                token1 = ''; // Provide a default value
            }

    const user = await getUserProfile(token1)
    if (!session || !session.user.token) return null
    
    const history = getPointHistory(session.user.token, session.user._id)
    console.log(user.data.name)
    return (
        <main>
            {/* <ProgressBar value1={session.user.currentPoint}/> */}
            <UserPoint userPoint={user.data.currentPoint} name={user.data.name} email={user.data.email}/>
            <AllHistory historyJson={history}/>
        </main>
    )
}