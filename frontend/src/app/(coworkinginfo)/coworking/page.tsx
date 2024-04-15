import getCoworkings from "@/libs/getCoworkings";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

import CoworkingCatalog from "@/components/CoworkingCatalog";

export default async function Coworking() {
  const coworkings = await getCoworkings();

  return (
    <main className="text-center p-5">
      <h1 className="text-xl font-medium">Select Coworking</h1>
      {/* <Suspense
        fallback={
          <p>
            Loading...
            <LinearProgress />
          </p>
        }
      >
        
      </Suspense> */}
      <CoworkingCatalog coworkingsJson={coworkings} />
    </main>
  );
}
