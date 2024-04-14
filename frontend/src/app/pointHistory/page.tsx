import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getPointHistory from "@/libs/getPointHistory"
import AllHistory from "@/components/AllHistory"
import ProgressBar from "@/components/Progressbar";

export default async function PointHistory() {

    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null
    
    const history = getPointHistory(session.user.token, session.user._id)
    
    return (
        <main>
            <ProgressBar value1={session.user.currentPoint}/>
            <AllHistory historyJson={history}/>
        </main>
    )
}