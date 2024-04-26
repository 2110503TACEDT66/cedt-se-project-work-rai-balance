import Link from "next/link";

export default function Approval() {
    return (
        <main>
            <div className="flex flex-row">
                <div className="border-2 m-10 p-10 w-1/3 bg-white">
                    <Link href={'#'}>
                        <button>Go to approve list</button>
                    </Link>
                </div>
                <div className="border-2 m-10 p-10 w-1/3 bg-white">
                    <Link href={'approval/pending'}>
                        <button>Go to pending list</button>
                    </Link>
                </div>
                <div className="border-2 m-10 p-10 w-1/3 bg-white">
                    <Link href={'approval/disapprove'}>
                        <button>Go to disapprove list</button>
                    </Link>
                </div>
            </div>
            
        </main>
    )
}