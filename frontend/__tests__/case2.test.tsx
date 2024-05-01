import { CoworkingJson } from "interface";
import fetch from "node-fetch";

export default async function getAllCoworkings(): Promise<CoworkingJson> {

    const BACKEND_URL = process.env.BACKEND_URL

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await fetch(
        `${BACKEND_URL}/api/project/coworkings/`
    );
    if (!response.ok) {
        // throw new Error("Failed to fetch");
    }

    return (await response.json()) as Promise<CoworkingJson>;
}

const mockCoworking: CoworkingJson = {
    "success": true,
    "count": 10,
    "pagination": {},
    "data": [
        {
            "_id": "65e29f14ccf74188031ddc21",
            "name": "Maurice Gleichner",
            "address": "705 Precious Neck",
            "district": "Pathumwan",
            "province": "Bangkok",
            "postalcode": 10330,
            "telephone": "02-2196999",
            "region": "กรุงเทพมหานคร (Bangkok)",
            "opentime": "08:00:00",
            "closetime": "22:00:00",
            "__v": 0,
            "picture": "https://drive.google.com/uc?export=download&id=1PdB_V7bjBIZvMamK5H1_5mKFwvUOm_tK",
            "reservations": [
                {
                    "_id": "662dee01f25eb6937ce03f6d",
                    "apptDate": "2024-04-26T17:00:00.000Z",
                    "user": "662dede3f25eb6937ce03f5f",
                    "coworking": "65e29f14ccf74188031ddc21",
                    "start": "08:00:00",
                    "end": "10:00:00",
                    "hasReview": "disapproved",
                    "createAt": "2024-04-28T06:34:41.294Z",
                    "__v": 0
                },
                {
                    "_id": "662e54f2bb68702154485954",
                    "apptDate": "2024-04-19T00:00:00.000Z",
                    "user": "662de9c3f25eb6937ce03f27",
                    "coworking": "65e29f14ccf74188031ddc21",
                    "start": "16:50:00",
                    "end": "17:55:00",
                    "hasReview": "approved",
                    "createAt": "2024-04-28T13:53:54.529Z",
                    "__v": 0
                },
                {
                    "_id": "662e5544bb68702154485972",
                    "apptDate": "2024-04-19T00:00:00.000Z",
                    "user": "662de9c3f25eb6937ce03f27",
                    "coworking": "65e29f14ccf74188031ddc21",
                    "start": "16:50:00",
                    "end": "17:55:00",
                    "hasReview": "no",
                    "createAt": "2024-04-28T13:55:16.245Z",
                    "__v": 0
                },
                {
                    "_id": "662f4a6167932a94368ba549",
                    "apptDate": "2024-04-28T00:00:00.000Z",
                    "user": "662f4a40392733a33577d020",
                    "coworking": "65e29f14ccf74188031ddc21",
                    "start": "09:00:00",
                    "end": "10:00:00",
                    "hasReview": "approved",
                    "createAt": "2024-04-29T07:21:05.054Z",
                    "__v": 0
                },
                {
                    "_id": "662f52701245c1af7e4748c0",
                    "apptDate": "2024-04-15T00:00:00.000Z",
                    "user": "662f524000f441971c2e7ac8",
                    "coworking": "65e29f14ccf74188031ddc21",
                    "start": "14:00:00",
                    "end": "18:00:00",
                    "hasReview": "approved",
                    "createAt": "2024-04-29T07:55:28.235Z",
                    "__v": 0
                },
                {
                    "_id": "662f52e31245c1af7e4748dd",
                    "apptDate": "2024-04-02T00:00:00.000Z",
                    "user": "662f524000f441971c2e7ac8",
                    "coworking": "65e29f14ccf74188031ddc21",
                    "start": "13:00:00",
                    "end": "13:05:00",
                    "hasReview": "approved",
                    "createAt": "2024-04-29T07:57:23.906Z",
                    "__v": 0
                },
                {
                    "_id": "662f5535d13e46e8f747a028",
                    "apptDate": "2024-04-09T00:00:00.000Z",
                    "user": "662f551a1245c1af7e4748f6",
                    "coworking": "65e29f14ccf74188031ddc21",
                    "start": "13:00:00",
                    "end": "14:00:00",
                    "hasReview": "disapproved",
                    "createAt": "2024-04-29T08:07:17.745Z",
                    "__v": 0
                },
                {
                    "_id": "662f55611245c1af7e474914",
                    "apptDate": "2024-04-05T00:00:00.000Z",
                    "user": "662f551a1245c1af7e4748f6",
                    "coworking": "65e29f14ccf74188031ddc21",
                    "start": "13:00:00",
                    "end": "14:00:00",
                    "hasReview": "disapproved",
                    "createAt": "2024-04-29T08:08:01.700Z",
                    "__v": 0
                },
                {
                    "_id": "662fc45b1bfccdbffd1d2dc6",
                    "apptDate": "2024-04-19T00:00:00.000Z",
                    "user": "662deaf83f6a167491697e1a",
                    "coworking": "65e29f14ccf74188031ddc21",
                    "start": "16:50:00",
                    "end": "17:55:00",
                    "hasReview": "no",
                    "createAt": "2024-04-29T16:01:31.350Z",
                    "__v": 0
                },
                {
                    "_id": "662fe280c99403715ceb2918",
                    "apptDate": "2024-04-29T17:00:00.000Z",
                    "user": "662fcee0534b5136d4579ec0",
                    "coworking": "65e29f14ccf74188031ddc21",
                    "start": "08:00:00",
                    "end": "10:00:00",
                    "hasReview": "disapproved",
                    "createAt": "2024-04-29T18:10:08.760Z",
                    "__v": 0
                },
                {
                    "_id": "6630a3f63c3f554c1579f64a",
                    "apptDate": "2024-04-28T17:00:00.000Z",
                    "user": "66309d2ccbe3cad43974dd18",
                    "coworking": "65e29f14ccf74188031ddc21",
                    "start": "11:00:00",
                    "end": "11:30:00",
                    "hasReview": "disapproved",
                    "createAt": "2024-04-30T07:55:34.821Z",
                    "__v": 0
                },
                {
                    "_id": "66310e781d82acec52466e36",
                    "apptDate": "2024-05-01T00:00:00.000Z",
                    "user": "66310e3f1d82acec52466e25",
                    "coworking": "65e29f14ccf74188031ddc21",
                    "start": "08:00:00",
                    "end": "09:00:00",
                    "hasReview": "no",
                    "createAt": "2024-04-30T15:30:00.875Z",
                    "__v": 0
                },
                {
                    "_id": "66310ea753567e57081fb35e",
                    "apptDate": "2024-05-01T00:00:00.000Z",
                    "user": "66310e3f1d82acec52466e25",
                    "coworking": "65e29f14ccf74188031ddc21",
                    "start": "12:00:00",
                    "end": "15:00:00",
                    "hasReview": "no",
                    "createAt": "2024-04-30T15:30:47.115Z",
                    "__v": 0
                }
            ],
            "id": "65e29f14ccf74188031ddc21"
        },
        {
            "_id": "65e2a05cccf74188031ddc29",
            "name": "Beatty and Harvey",
            "address": "806 Steuber Villages",
            "district": "Wolffstad",
            "province": "Lesotho",
            "postalcode": 10330,
            "telephone": "280-939-8764",
            "region": "กรุงเทพมหานคร (Bangkok)",
            "opentime": "08:00:00",
            "closetime": "18:00:00",
            "__v": 0,
            "picture": "https://drive.google.com/uc?export=download&id=1axrcPikhevjG5EhsgIoUBvwffNNcWMSa",
            "reservations": [
                {
                    "_id": "662dee2ef25eb6937ce03f86",
                    "apptDate": "2024-04-22T17:00:00.000Z",
                    "user": "662dede3f25eb6937ce03f5f",
                    "coworking": "65e2a05cccf74188031ddc29",
                    "start": "08:00:00",
                    "end": "12:00:00",
                    "hasReview": "disapproved",
                    "createAt": "2024-04-28T06:35:26.217Z",
                    "__v": 0
                },
                {
                    "_id": "662fb4e1396aca90f3e0e4ee",
                    "apptDate": "2024-04-29T00:00:00.000Z",
                    "user": "662fb3ef396aca90f3e0e4bb",
                    "coworking": "65e2a05cccf74188031ddc29",
                    "start": "14:00:00",
                    "end": "14:20:00",
                    "hasReview": "disapproved",
                    "createAt": "2024-04-29T14:55:29.855Z",
                    "__v": 0
                }
            ],
            "id": "65e2a05cccf74188031ddc29"
        },
        {
            "_id": "65e2a0fdccf74188031ddc38",
            "name": "BednarWard",
            "address": "706 Marquardt Highway",
            "district": "New Evie",
            "province": "Mali",
            "postalcode": 10330,
            "telephone": "410-749-0625",
            "region": "กรุงเทพมหานคร (Bangkok)",
            "opentime": "08:00:00",
            "closetime": "18:00:00",
            "__v": 0,
            "picture": "https://drive.google.com/uc?export=download&id=1ci1eTfpFFvvK1ymoy6krkmIn6r2bLmGC",
            "reservations": [
                {
                    "_id": "662e4f77ef1a687c5c907a8a",
                    "apptDate": "2024-04-27T00:00:00.000Z",
                    "user": "662dede3f25eb6937ce03f5f",
                    "coworking": "65e2a0fdccf74188031ddc38",
                    "start": "09:00:00",
                    "end": "11:00:00",
                    "hasReview": "disapproved",
                    "createAt": "2024-04-28T13:30:31.869Z",
                    "__v": 0
                },
                {
                    "_id": "662e615de705d3976d4afa5d",
                    "apptDate": "2024-04-21T17:00:00.000Z",
                    "user": "662e614ae705d3976d4afa4f",
                    "coworking": "65e2a0fdccf74188031ddc38",
                    "start": "08:00:00",
                    "end": "11:00:00",
                    "hasReview": "no",
                    "createAt": "2024-04-28T14:46:53.728Z",
                    "__v": 0
                },
                {
                    "_id": "662f6b34cf995f4be336f995",
                    "apptDate": "2024-04-24T00:00:00.000Z",
                    "user": "662f4a40392733a33577d020",
                    "coworking": "65e2a0fdccf74188031ddc38",
                    "start": "08:00:00",
                    "end": "10:00:00",
                    "hasReview": "no",
                    "createAt": "2024-04-29T09:41:08.497Z",
                    "__v": 0
                },
                {
                    "_id": "663097e83c3f554c1579f3b2",
                    "apptDate": "2024-04-29T17:00:00.000Z",
                    "user": "663097563c3f554c1579f3a1",
                    "coworking": "65e2a0fdccf74188031ddc38",
                    "start": "13:00:00",
                    "end": "14:00:00",
                    "hasReview": "no",
                    "createAt": "2024-04-30T07:04:08.170Z",
                    "__v": 0
                },
                {
                    "_id": "66309de8cbe3cad43974dd59",
                    "apptDate": "2024-04-29T00:00:00.000Z",
                    "user": "66309d2ccbe3cad43974dd18",
                    "coworking": "65e2a0fdccf74188031ddc38",
                    "start": "09:00:00",
                    "end": "10:00:00",
                    "hasReview": "disapproved",
                    "createAt": "2024-04-30T07:29:44.813Z",
                    "__v": 0
                },
                {
                    "_id": "66310a351a603155c3a3cf44",
                    "apptDate": "2024-04-30T00:00:00.000Z",
                    "user": "663109841a603155c3a3cf2c",
                    "coworking": "65e2a0fdccf74188031ddc38",
                    "start": "08:00:00",
                    "end": "10:00:00",
                    "hasReview": "pending",
                    "createAt": "2024-04-30T15:11:49.809Z",
                    "__v": 0
                }
            ],
            "id": "65e2a0fdccf74188031ddc38"
        },
        {
            "_id": "65e2a1abccf74188031ddc3c",
            "name": "Bruen and Sons",
            "address": "413 Watsica Manors",
            "district": "Mathildebury",
            "province": "Norway",
            "postalcode": 10330,
            "telephone": "424-266-7975",
            "region": "กรุงเทพมหานคร (Bangkok)",
            "opentime": "08:00:00",
            "closetime": "18:00:00",
            "__v": 0,
            "picture": "https://drive.google.com/uc?export=download&id=1HJ6LgR5ssU4PAAcH8FqjxsfnUN4PPfjJ",
            "reservations": [
                {
                    "_id": "662e616ae705d3976d4afa6b",
                    "apptDate": "2024-04-28T17:00:00.000Z",
                    "user": "662e614ae705d3976d4afa4f",
                    "coworking": "65e2a1abccf74188031ddc3c",
                    "start": "09:00:00",
                    "end": "10:00:00",
                    "hasReview": "no",
                    "createAt": "2024-04-28T14:47:06.808Z",
                    "__v": 0
                },
                {
                    "_id": "66309dfdf3361136ea4e61ee",
                    "apptDate": "2024-04-29T00:00:00.000Z",
                    "user": "66309d2ccbe3cad43974dd18",
                    "coworking": "65e2a1abccf74188031ddc3c",
                    "start": "10:00:00",
                    "end": "11:00:00",
                    "hasReview": "disapproved",
                    "createAt": "2024-04-30T07:30:05.432Z",
                    "__v": 0
                }
            ],
            "id": "65e2a1abccf74188031ddc3c"
        },
        {
            "_id": "65e2a201ccf74188031ddc3f",
            "name": "Bartoletti",
            "address": "894 Pietro Tunnel",
            "district": "Marvinport",
            "province": "Papua New Guinea",
            "postalcode": 10330,
            "telephone": "224-371-1670",
            "region": "กรุงเทพมหานคร (Bangkok)",
            "opentime": "08:00:00",
            "closetime": "18:00:00",
            "__v": 0,
            "picture": "https://drive.google.com/uc?export=download&id=1h2td1hvM55oWxTnqi17J1718qW7eGnLZ",
            "reservations": [
                {
                    "_id": "662dea964a047dc4e479e4f0",
                    "apptDate": "2024-04-22T00:00:00.000Z",
                    "user": "662dea794a047dc4e479e4dc",
                    "coworking": "65e2a201ccf74188031ddc3f",
                    "start": "09:00:00",
                    "end": "11:00:00",
                    "hasReview": "no",
                    "createAt": "2024-04-28T06:20:06.104Z",
                    "__v": 0
                }
            ],
            "id": "65e2a201ccf74188031ddc3f"
        },
        {
            "_id": "660274cf2e6002e952322da0",
            "name": "Samyan Coop",
            "address": "90786 Mohr Orchard",
            "district": "East Providence",
            "province": "Mexico",
            "postalcode": 10330,
            "telephone": "621-971-7325",
            "region": "กรุงเทพมหานคร (Bangkok)",
            "opentime": "08:00:00",
            "closetime": "18:00:00",
            "picture": "https://drive.google.com/uc?export=download&id=1nd7MAAksZQNmdTM0qo48rUwkw-BjGKPr",
            "__v": 0,
            "reservations": [
                {
                    "_id": "662fe7f3c99403715ceb29c9",
                    "apptDate": "2024-04-29T17:00:00.000Z",
                    "user": "662fcee0534b5136d4579ec0",
                    "coworking": "660274cf2e6002e952322da0",
                    "start": "08:00:00",
                    "end": "10:00:00",
                    "hasReview": "no",
                    "createAt": "2024-04-29T18:33:23.229Z",
                    "__v": 0
                },
                {
                    "_id": "663103a711dc548f7f66f71e",
                    "apptDate": "2024-04-30T00:00:00.000Z",
                    "user": "6630f92518fa11b6f922d71f",
                    "coworking": "660274cf2e6002e952322da0",
                    "start": "08:00:00",
                    "end": "10:00:00",
                    "hasReview": "no",
                    "createAt": "2024-04-30T14:43:51.460Z",
                    "__v": 0
                }
            ],
            "id": "660274cf2e6002e952322da0"
        },
        {
            "_id": "660277302e6002e952322da3",
            "name": "Nepenthes gracilis",
            "address": "77652 Ratke Lodge",
            "district": "New Erickachester",
            "province": "Namibia",
            "postalcode": 10330,
            "telephone": "969-423-9184",
            "region": "กรุงเทพมหานคร (Bangkok)",
            "opentime": "08:00:00",
            "closetime": "18:00:00",
            "picture": "https://drive.google.com/uc?export=download&id=1ysIK9Z76NzPpQv-QbcEuTdnvfdCUouwg",
            "__v": 0,
            "reservations": [
                {
                    "_id": "6630dff9edccceee911baf57",
                    "apptDate": "2024-05-01T00:00:00.000Z",
                    "user": "6630dfd1edccceee911baf47",
                    "coworking": "660277302e6002e952322da3",
                    "start": "08:00:00",
                    "end": "09:00:00",
                    "hasReview": "no",
                    "createAt": "2024-04-30T12:11:37.559Z",
                    "__v": 0
                },
                {
                    "_id": "6631526701f1627c6c5b487e",
                    "apptDate": "2024-04-30T00:00:00.000Z",
                    "user": "6631523b01f1627c6c5b4870",
                    "coworking": "660277302e6002e952322da3",
                    "start": "08:00:00",
                    "end": "10:00:00",
                    "hasReview": "no",
                    "createAt": "2024-04-30T20:19:51.278Z",
                    "__v": 0
                }
            ],
            "id": "660277302e6002e952322da3"
        },
        {
            "_id": "66027a78953fa33d3dce1fba",
            "name": "Joanna Co-working Space",
            "address": "587 Boyle Plaza",
            "district": "Harrisburg",
            "province": "Nauru",
            "postalcode": 10330,
            "telephone": "491-628-0891",
            "region": "กรุงเทพมหานคร (Bangkok)",
            "opentime": "08:00:00",
            "closetime": "18:00:00",
            "picture": "https://drive.google.com/uc?export=download&id=1p4SE0mmpE0EVhUERGSF9GGxXkZerEQwe",
            "__v": 0,
            "reservations": [
                {
                    "_id": "66308af33c3f554c1579ee4f",
                    "apptDate": "2024-04-29T17:00:00.000Z",
                    "user": "662fcee0534b5136d4579ec0",
                    "coworking": "66027a78953fa33d3dce1fba",
                    "start": "10:00:00",
                    "end": "11:00:00",
                    "hasReview": "no",
                    "createAt": "2024-04-30T06:08:51.091Z",
                    "__v": 0
                },
                {
                    "_id": "6631512501f1627c6c5b4862",
                    "apptDate": "2024-04-30T00:00:00.000Z",
                    "user": "66314daf01f1627c6c5b4832",
                    "coworking": "66027a78953fa33d3dce1fba",
                    "start": "08:08:00",
                    "end": "09:09:00",
                    "hasReview": "no",
                    "createAt": "2024-04-30T20:14:29.933Z",
                    "__v": 0
                }
            ],
            "id": "66027a78953fa33d3dce1fba"
        },
        {
            "_id": "66027d3c953fa33d3dce1fc0",
            "name": "Eddie Coop",
            "address": "4488 Sammy Plains",
            "district": "Baldwin Park",
            "province": "Cambodia",
            "postalcode": 10330,
            "telephone": "797-461-1426",
            "region": "กรุงเทพมหานคร (Bangkok)",
            "opentime": "08:00:00",
            "closetime": "18:00:00",
            "picture": "https://drive.google.com/uc?export=download&id=1o8OGdJx1WzHC-p2VJ0cYGDWj7hFnW2Qj",
            "__v": 0,
            "reservations": [],
            "id": "66027d3c953fa33d3dce1fc0"
        },
        {
            "_id": "66030ddb6a4d955dd5b01504",
            "name": "Wolf Coworking Space",
            "address": "705 Precious Neck",
            "district": "Neckless",
            "province": "Neck",
            "postalcode": 10330,
            "telephone": "0234567899",
            "region": "กรุงเทพมหานคร (Bangkok)",
            "opentime": "08:00:00",
            "closetime": "19:00:00",
            "picture": "https://drive.google.com/uc?export=download&id=11chznYqoK7-89CM89iWWOVJswsYe2EMp",
            "__v": 0,
            "reservations": [
                {
                    "_id": "662fc8c5ee677079d75be5be",
                    "apptDate": "2024-04-28T00:00:00.000Z",
                    "user": "662fc8a8ee677079d75be5b0",
                    "coworking": "66030ddb6a4d955dd5b01504",
                    "start": "10:00:00",
                    "end": "11:00:00",
                    "hasReview": "approved",
                    "createAt": "2024-04-29T16:20:21.107Z",
                    "__v": 0
                },
                {
                    "_id": "6630dfb458e07e47c0008bdc",
                    "apptDate": "2024-05-01T00:00:00.000Z",
                    "user": "6630d988cc2315cbdc51f4f4",
                    "coworking": "66030ddb6a4d955dd5b01504",
                    "start": "10:00:00",
                    "end": "14:00:00",
                    "hasReview": "no",
                    "createAt": "2024-04-30T12:10:28.968Z",
                    "__v": 0
                },
                {
                    "_id": "6630dfb5edccceee911baf42",
                    "apptDate": "2024-05-01T00:00:00.000Z",
                    "user": "6630d988cc2315cbdc51f4f4",
                    "coworking": "66030ddb6a4d955dd5b01504",
                    "start": "10:00:00",
                    "end": "14:00:00",
                    "hasReview": "no",
                    "createAt": "2024-04-30T12:10:29.416Z",
                    "__v": 0
                },
                {
                    "_id": "6631aadbff1bf4a75f541fa1",
                    "apptDate": "2024-04-30T00:00:00.000Z",
                    "user": "6631aa8f992837044b855581",
                    "coworking": "66030ddb6a4d955dd5b01504",
                    "start": "08:00:00",
                    "end": "10:00:00",
                    "hasReview": "pending",
                    "createAt": "2024-05-01T02:37:15.825Z",
                    "__v": 0
                }
            ],
            "id": "66030ddb6a4d955dd5b01504"
        }
    ]
};

// Jest mock for fetch
jest.mock("node-fetch", () =>
    jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockCoworking),
    })
);

describe("getCampgrounds", () => {
    afterEach(() => {
        jest.restoreAllMocks(); // Use jest.restoreAllMocks() to restore mocks
    });

    test("should return correct coworking data", async () => {
        const coworkingFetch = await getAllCoworkings();
        expect(coworkingFetch).toEqual(mockCoworking);
    });
});