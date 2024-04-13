import Link from "next/link";
import { HistoryJson,HistoryItem } from "../../interface";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AllHistory({
    historyJson,
} : {historyJson: Promise<HistoryJson>;

}) {
    const historyJsonReady = await historyJson;
    // var updatedAt = new Date(historyJson.)
    
    return(
        <>
        <div className="flex min-h-full w-auto flex-1 flex-col justify-center rounded-3xl px-6 py-12 md:px-15 md:mx-20 lg:mx-[200px]">
        {historyJsonReady.data.map((HistoryItem: HistoryItem) => (
            <div className="bg-white p-5 rounded-xl drop-shadow-xl w-auto m-3" key={HistoryItem.updatedAt}>
              <div className="text-[25px] font-bold">
                {HistoryItem.message}
              </div>  
              <div className="text-[15px] font-semibold">
                Point {HistoryItem.change}
              </div>
              
              <div className="text-[15px] font-semibold">
                Current Point {HistoryItem.updatedPoint.toString()}
              </div>
              <div className="text-[15px] font-semibold">
                Updated At {(new Date(HistoryItem.updatedAt)).toString()}
              </div>
            </div>
          ))}
        </div>
      </>
    )
}