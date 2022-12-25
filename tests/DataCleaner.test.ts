import React from "react";
import { checkSectionWithoutName } from "../src/api/DataCleaner";

const sections_213 = [
    {
        "id": "c965370a-b616-40f3-8acb-e1534cde19eb",
        "status": "Blocked",
        "name": "CPSC 213 101",
        "subject": "CPSC",
        "course": "213",
        "section": "101",
        "activity": "Lecture",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 840,
                "end_time": 930,
                "day": "Tue",
                "term": "1"
            },
            {
                "start_time": 840,
                "end_time": 930,
                "day": "Thu",
                "term": "1"
            }
        ]
    },
    {
        "id": "4627acc2-1e62-4a60-af7b-fb0ca503ab2d",
        "status": "Full",
        "name": "CPSC 213 L1A",
        "subject": "CPSC",
        "course": "213",
        "section": "L1A",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 930,
                "end_time": 990,
                "day": "Tue",
                "term": "1"
            },
            {
                "start_time": 930,
                "end_time": 1050,
                "day": "Thu",
                "term": "1"
            }
        ]
    },
    {
        "id": "33949630-de19-41ac-988b-ec7f08775d32",
        "status": "Full",
        "name": "CPSC 213 L1B",
        "subject": "CPSC",
        "course": "213",
        "section": "L1B",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 720,
                "end_time": 780,
                "day": "Tue",
                "term": "1"
            }
        ]
    },
    {
        "id": "e0b6769d-1b76-4907-a35c-20e9f6df6bb8",
        "status": "",
        "name": "",
        "subject": "",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 660,
                "end_time": 780,
                "day": "Fri",
                "term": "1"
            }
        ]
    },
    {
        "id": "19f9661b-b214-4853-a1e4-168f8ce8e6d5",
        "status": "Available",
        "name": "CPSC 213 L1C",
        "subject": "CPSC",
        "course": "213",
        "section": "L1C",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 780,
                "end_time": 840,
                "day": "Tue",
                "term": "1"
            },
            {
                "start_time": 780,
                "end_time": 900,
                "day": "Fri",
                "term": "1"
            }
        ]
    },
    {
        "id": "dd064d06-8752-4ce1-8be1-227531166418",
        "status": "Full",
        "name": "CPSC 213 L1D",
        "subject": "CPSC",
        "course": "213",
        "section": "L1D",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 840,
                "end_time": 900,
                "day": "Mon",
                "term": "1"
            }
        ]
    },
    {
        "id": "74aa65ce-40b6-4745-9ac4-ec769c42db28",
        "status": "",
        "name": "",
        "subject": "",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 780,
                "end_time": 900,
                "day": "Wed",
                "term": "1"
            }
        ]
    },
    {
        "id": "123627c3-b4e2-4d82-960f-0fdb832c7810",
        "status": "Full",
        "name": "CPSC 213 L1E",
        "subject": "CPSC",
        "course": "213",
        "section": "L1E",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 1110,
                "end_time": 1170,
                "day": "Tue",
                "term": "1"
            },
            {
                "start_time": 1110,
                "end_time": 1230,
                "day": "Thu",
                "term": "1"
            }
        ]
    },
    {
        "id": "2b5e3035-6f52-44a3-aa5e-5605872792fd",
        "status": "Full",
        "name": "CPSC 213 L1F",
        "subject": "CPSC",
        "course": "213",
        "section": "L1F",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 540,
                "end_time": 600,
                "day": "Tue",
                "term": "1"
            }
        ]
    },
    {
        "id": "5c67e23f-fdd0-48eb-95ce-ebde0955bbfe",
        "status": "",
        "name": "",
        "subject": "",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 540,
                "end_time": 660,
                "day": "Fri",
                "term": "1"
            }
        ]
    },
    {
        "id": "17101c56-7471-421d-94c2-1782c6a5ca56",
        "status": "Full",
        "name": "CPSC 213 L1G",
        "subject": "CPSC",
        "course": "213",
        "section": "L1G",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 660,
                "end_time": 720,
                "day": "Mon",
                "term": "1"
            },
            {
                "start_time": 900,
                "end_time": 1020,
                "day": "Wed",
                "term": "1"
            }
        ]
    },
    {
        "id": "78c5eea8-4f40-4f3c-8a7f-7d6fd9bf91cf",
        "status": "Available",
        "name": "CPSC 213 L1H",
        "subject": "CPSC",
        "course": "213",
        "section": "L1H",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 1020,
                "end_time": 1080,
                "day": "Mon",
                "term": "1"
            }
        ]
    },
    {
        "id": "4f4778fa-4d62-40ea-9741-4b7ffab4461c",
        "status": "",
        "name": "",
        "subject": "",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 1020,
                "end_time": 1140,
                "day": "Wed",
                "term": "1"
            }
        ]
    },
    {
        "id": "3c159d51-573e-4cf9-8287-1346f2f9f880",
        "status": "Full",
        "name": "CPSC 213 L1K",
        "subject": "CPSC",
        "course": "213",
        "section": "L1K",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 720,
                "end_time": 780,
                "day": "Mon",
                "term": "1"
            },
            {
                "start_time": 660,
                "end_time": 780,
                "day": "Wed",
                "term": "1"
            }
        ]
    },
    {
        "id": "ce2b5279-6718-42ca-9313-5059ffd51cc3",
        "status": "Full",
        "name": "CPSC 213 L1M",
        "subject": "CPSC",
        "course": "213",
        "section": "L1M",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 540,
                "end_time": 600,
                "day": "Mon",
                "term": "1"
            }
        ]
    },
    {
        "id": "62b9b589-bab3-4874-ae47-f7b18f10577f",
        "status": "",
        "name": "",
        "subject": "",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 540,
                "end_time": 660,
                "day": "Wed",
                "term": "1"
            }
        ]
    },
    {
        "id": "84ac87c1-2dee-45f1-a18c-c7b690360e9e",
        "status": "Full",
        "name": "CPSC 213 L1N",
        "subject": "CPSC",
        "course": "213",
        "section": "L1N",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 780,
                "end_time": 840,
                "day": "Mon",
                "term": "1"
            },
            {
                "start_time": 900,
                "end_time": 1020,
                "day": "Fri",
                "term": "1"
            }
        ]
    },
    {
        "id": "ed2c46ca-4e7c-42ae-a6db-4bdb3cddfc43",
        "status": "Blocked",
        "name": "CPSC 213 L1P",
        "subject": "CPSC",
        "course": "213",
        "section": "L1P",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 600,
                "end_time": 660,
                "day": "Tue",
                "term": "1"
            }
        ]
    },
    {
        "id": "41ea85e7-2aee-49a7-9619-032b371f4780",
        "status": "",
        "name": "",
        "subject": "",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 540,
                "end_time": 660,
                "day": "Thu",
                "term": "1"
            }
        ]
    },
    {
        "id": "0d20122f-0b86-4e37-be01-2c21b1aa1b21",
        "status": "Blocked",
        "name": "CPSC 213 L1R",
        "subject": "CPSC",
        "course": "213",
        "section": "L1R",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 660,
                "end_time": 720,
                "day": "Tue",
                "term": "1"
            },
            {
                "start_time": 660,
                "end_time": 780,
                "day": "Thu",
                "term": "1"
            }
        ]
    },
    {
        "id": "d5e17171-fe21-4912-83ff-d10ed753de3e",
        "status": "Blocked",
        "name": "CPSC 213 102",
        "subject": "CPSC",
        "course": "213",
        "section": "102",
        "activity": "Lecture",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 1020,
                "end_time": 1110,
                "day": "Tue",
                "term": "1"
            },
            {
                "start_time": 1020,
                "end_time": 1110,
                "day": "Thu",
                "term": "1"
            }
        ]
    },
    {
        "id": "04b87ca3-ecb9-4ea0-930f-a8c0a89b1802",
        "status": "Full",
        "name": "CPSC 213 L1A",
        "subject": "CPSC",
        "course": "213",
        "section": "L1A",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 930,
                "end_time": 990,
                "day": "Tue",
                "term": "1"
            },
            {
                "start_time": 930,
                "end_time": 1050,
                "day": "Thu",
                "term": "1"
            }
        ]
    },
    {
        "id": "271f09eb-cbae-46f6-85b9-8bda3158a20e",
        "status": "Full",
        "name": "CPSC 213 L1B",
        "subject": "CPSC",
        "course": "213",
        "section": "L1B",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 720,
                "end_time": 780,
                "day": "Tue",
                "term": "1"
            }
        ]
    },
    {
        "id": "b74c85db-c350-4fb0-af6e-6b46bf84d265",
        "status": "",
        "name": "",
        "subject": "",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 660,
                "end_time": 780,
                "day": "Fri",
                "term": "1"
            }
        ]
    },
    {
        "id": "237f6b9d-b15e-4539-adea-0887875480a4",
        "status": "Available",
        "name": "CPSC 213 L1C",
        "subject": "CPSC",
        "course": "213",
        "section": "L1C",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 780,
                "end_time": 840,
                "day": "Tue",
                "term": "1"
            },
            {
                "start_time": 780,
                "end_time": 900,
                "day": "Fri",
                "term": "1"
            }
        ]
    },
    {
        "id": "afce4733-400a-48c5-aa65-0060d6e4781b",
        "status": "Full",
        "name": "CPSC 213 L1D",
        "subject": "CPSC",
        "course": "213",
        "section": "L1D",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 840,
                "end_time": 900,
                "day": "Mon",
                "term": "1"
            }
        ]
    },
    {
        "id": "de0f7fc0-a771-4aa3-8e2d-0187aed070fc",
        "status": "",
        "name": "",
        "subject": "",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 780,
                "end_time": 900,
                "day": "Wed",
                "term": "1"
            }
        ]
    },
    {
        "id": "6738ce5f-92ab-4896-aa00-ad450a6fbb97",
        "status": "Full",
        "name": "CPSC 213 L1E",
        "subject": "CPSC",
        "course": "213",
        "section": "L1E",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 1110,
                "end_time": 1170,
                "day": "Tue",
                "term": "1"
            },
            {
                "start_time": 1110,
                "end_time": 1230,
                "day": "Thu",
                "term": "1"
            }
        ]
    },
    {
        "id": "1ea53a90-95cd-4c32-a207-60d565a2d0b7",
        "status": "Full",
        "name": "CPSC 213 L1F",
        "subject": "CPSC",
        "course": "213",
        "section": "L1F",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 540,
                "end_time": 600,
                "day": "Tue",
                "term": "1"
            }
        ]
    },
    {
        "id": "5add7dd3-684c-4f24-a6c2-95de8826051e",
        "status": "",
        "name": "",
        "subject": "",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 540,
                "end_time": 660,
                "day": "Fri",
                "term": "1"
            }
        ]
    },
    {
        "id": "85b9c365-e0fc-4b32-ab20-7bc37fe05871",
        "status": "Full",
        "name": "CPSC 213 L1G",
        "subject": "CPSC",
        "course": "213",
        "section": "L1G",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 660,
                "end_time": 720,
                "day": "Mon",
                "term": "1"
            },
            {
                "start_time": 900,
                "end_time": 1020,
                "day": "Wed",
                "term": "1"
            }
        ]
    },
    {
        "id": "d60d3b00-edf4-498e-b1e8-887a43724950",
        "status": "Available",
        "name": "CPSC 213 L1H",
        "subject": "CPSC",
        "course": "213",
        "section": "L1H",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 1020,
                "end_time": 1080,
                "day": "Mon",
                "term": "1"
            }
        ]
    },
    {
        "id": "f9f70126-0b81-416b-883a-7dfcae089f1b",
        "status": "",
        "name": "",
        "subject": "",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 1020,
                "end_time": 1140,
                "day": "Wed",
                "term": "1"
            }
        ]
    },
    {
        "id": "6de47a11-cb48-418c-a367-34936d63f14c",
        "status": "Full",
        "name": "CPSC 213 L1K",
        "subject": "CPSC",
        "course": "213",
        "section": "L1K",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 720,
                "end_time": 780,
                "day": "Mon",
                "term": "1"
            },
            {
                "start_time": 660,
                "end_time": 780,
                "day": "Wed",
                "term": "1"
            }
        ]
    },
    {
        "id": "470cae7d-050a-43a0-ab0c-849ba402721a",
        "status": "Full",
        "name": "CPSC 213 L1M",
        "subject": "CPSC",
        "course": "213",
        "section": "L1M",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 540,
                "end_time": 600,
                "day": "Mon",
                "term": "1"
            }
        ]
    },
    {
        "id": "3cabce5d-5276-47ac-a518-6488c6e3c2df",
        "status": "",
        "name": "",
        "subject": "",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 540,
                "end_time": 660,
                "day": "Wed",
                "term": "1"
            }
        ]
    },
    {
        "id": "00b0f3f1-944b-4b5c-828b-92a8966737f2",
        "status": "Full",
        "name": "CPSC 213 L1N",
        "subject": "CPSC",
        "course": "213",
        "section": "L1N",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 780,
                "end_time": 840,
                "day": "Mon",
                "term": "1"
            },
            {
                "start_time": 900,
                "end_time": 1020,
                "day": "Fri",
                "term": "1"
            }
        ]
    },
    {
        "id": "7699d166-e8b5-49a9-bcb3-ed3a6d2296f4",
        "status": "Blocked",
        "name": "CPSC 213 L1P",
        "subject": "CPSC",
        "course": "213",
        "section": "L1P",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 600,
                "end_time": 660,
                "day": "Tue",
                "term": "1"
            }
        ]
    },
    {
        "id": "e1f2cd4b-f7cb-4d20-9b4e-ebe182b6061b",
        "status": "",
        "name": "",
        "subject": "",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 540,
                "end_time": 660,
                "day": "Thu",
                "term": "1"
            }
        ]
    },
    {
        "id": "e732cede-f84e-43c1-ae1e-de72c93f7a81",
        "status": "Blocked",
        "name": "CPSC 213 L1R",
        "subject": "CPSC",
        "course": "213",
        "section": "L1R",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 660,
                "end_time": 720,
                "day": "Tue",
                "term": "1"
            },
            {
                "start_time": 660,
                "end_time": 780,
                "day": "Thu",
                "term": "1"
            }
        ]
    },
    {
        "id": "cd7297f0-49db-4112-a247-cd44c9e3a6c9",
        "status": "Blocked",
        "name": "CPSC 213 1W1",
        "subject": "CPSC",
        "course": "213",
        "section": "1W1",
        "activity": "Waiting List",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 840,
                "end_time": 930,
                "day": "Tue",
                "term": "1"
            },
            {
                "start_time": 840,
                "end_time": 930,
                "day": "Thu",
                "term": "1"
            }
        ]
    },
    {
        "id": "153e94dc-e2df-4701-88b6-04bbdbe987ed",
        "status": "Blocked",
        "name": "CPSC 213 1W2",
        "subject": "CPSC",
        "course": "213",
        "section": "1W2",
        "activity": "Waiting List",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 1020,
                "end_time": 1110,
                "day": "Tue",
                "term": "1"
            },
            {
                "start_time": 1020,
                "end_time": 1110,
                "day": "Thu",
                "term": "1"
            }
        ]
    }
]

const sections_213_clean = [
    {
        "id": "c965370a-b616-40f3-8acb-e1534cde19eb",
        "status": "Blocked",
        "name": "CPSC 213 101",
        "subject": "CPSC",
        "course": "213",
        "section": "101",
        "activity": "Lecture",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 840,
                "end_time": 930,
                "day": "Tue",
                "term": "1"
            },
            {
                "start_time": 840,
                "end_time": 930,
                "day": "Thu",
                "term": "1"
            }
        ]
    },
    {
        "id": "4627acc2-1e62-4a60-af7b-fb0ca503ab2d",
        "status": "Full",
        "name": "CPSC 213 L1A",
        "subject": "CPSC",
        "course": "213",
        "section": "L1A",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 930,
                "end_time": 990,
                "day": "Tue",
                "term": "1"
            },
            {
                "start_time": 930,
                "end_time": 1050,
                "day": "Thu",
                "term": "1"
            }
        ]
    },
    {
        "id": "33949630-de19-41ac-988b-ec7f08775d32",
        "status": "Full",
        "name": "CPSC 213 L1B",
        "subject": "CPSC",
        "course": "213",
        "section": "L1B",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 720,
                "end_time": 780,
                "day": "Tue",
                "term": "1"
            }
        ]
    },
    {
        "id": "e0b6769d-1b76-4907-a35c-20e9f6df6bb8",
        "status": "",
        "name": "",
        "subject": "",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 660,
                "end_time": 780,
                "day": "Fri",
                "term": "1"
            }
        ]
    },
    {
        "id": "19f9661b-b214-4853-a1e4-168f8ce8e6d5",
        "status": "Available",
        "name": "CPSC 213 L1C",
        "subject": "CPSC",
        "course": "213",
        "section": "L1C",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 780,
                "end_time": 840,
                "day": "Tue",
                "term": "1"
            },
            {
                "start_time": 780,
                "end_time": 900,
                "day": "Fri",
                "term": "1"
            }
        ]
    },
    {
        "id": "dd064d06-8752-4ce1-8be1-227531166418",
        "status": "Full",
        "name": "CPSC 213 L1D",
        "subject": "CPSC",
        "course": "213",
        "section": "L1D",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 840,
                "end_time": 900,
                "day": "Mon",
                "term": "1"
            }
        ]
    },
    {
        "id": "74aa65ce-40b6-4745-9ac4-ec769c42db28",
        "status": "",
        "name": "",
        "subject": "",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 780,
                "end_time": 900,
                "day": "Wed",
                "term": "1"
            }
        ]
    },
    {
        "id": "123627c3-b4e2-4d82-960f-0fdb832c7810",
        "status": "Full",
        "name": "CPSC 213 L1E",
        "subject": "CPSC",
        "course": "213",
        "section": "L1E",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 1110,
                "end_time": 1170,
                "day": "Tue",
                "term": "1"
            },
            {
                "start_time": 1110,
                "end_time": 1230,
                "day": "Thu",
                "term": "1"
            }
        ]
    },
    {
        "id": "2b5e3035-6f52-44a3-aa5e-5605872792fd",
        "status": "Full",
        "name": "CPSC 213 L1F",
        "subject": "CPSC",
        "course": "213",
        "section": "L1F",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 540,
                "end_time": 600,
                "day": "Tue",
                "term": "1"
            }
        ]
    },
    {
        "id": "5c67e23f-fdd0-48eb-95ce-ebde0955bbfe",
        "status": "",
        "name": "",
        "subject": "",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 540,
                "end_time": 660,
                "day": "Fri",
                "term": "1"
            }
        ]
    },
    {
        "id": "17101c56-7471-421d-94c2-1782c6a5ca56",
        "status": "Full",
        "name": "CPSC 213 L1G",
        "subject": "CPSC",
        "course": "213",
        "section": "L1G",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 660,
                "end_time": 720,
                "day": "Mon",
                "term": "1"
            },
            {
                "start_time": 900,
                "end_time": 1020,
                "day": "Wed",
                "term": "1"
            }
        ]
    },
    {
        "id": "78c5eea8-4f40-4f3c-8a7f-7d6fd9bf91cf",
        "status": "Available",
        "name": "CPSC 213 L1H",
        "subject": "CPSC",
        "course": "213",
        "section": "L1H",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 1020,
                "end_time": 1080,
                "day": "Mon",
                "term": "1"
            }
        ]
    },
    {
        "id": "4f4778fa-4d62-40ea-9741-4b7ffab4461c",
        "status": "",
        "name": "",
        "subject": "",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 1020,
                "end_time": 1140,
                "day": "Wed",
                "term": "1"
            }
        ]
    },
    {
        "id": "3c159d51-573e-4cf9-8287-1346f2f9f880",
        "status": "Full",
        "name": "CPSC 213 L1K",
        "subject": "CPSC",
        "course": "213",
        "section": "L1K",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 720,
                "end_time": 780,
                "day": "Mon",
                "term": "1"
            },
            {
                "start_time": 660,
                "end_time": 780,
                "day": "Wed",
                "term": "1"
            }
        ]
    },
    {
        "id": "ce2b5279-6718-42ca-9313-5059ffd51cc3",
        "status": "Full",
        "name": "CPSC 213 L1M",
        "subject": "CPSC",
        "course": "213",
        "section": "L1M",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 540,
                "end_time": 600,
                "day": "Mon",
                "term": "1"
            }
        ]
    },
    {
        "id": "62b9b589-bab3-4874-ae47-f7b18f10577f",
        "status": "",
        "name": "",
        "subject": "",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 540,
                "end_time": 660,
                "day": "Wed",
                "term": "1"
            }
        ]
    },
    {
        "id": "84ac87c1-2dee-45f1-a18c-c7b690360e9e",
        "status": "Full",
        "name": "CPSC 213 L1N",
        "subject": "CPSC",
        "course": "213",
        "section": "L1N",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 780,
                "end_time": 840,
                "day": "Mon",
                "term": "1"
            },
            {
                "start_time": 900,
                "end_time": 1020,
                "day": "Fri",
                "term": "1"
            }
        ]
    },
    {
        "id": "ed2c46ca-4e7c-42ae-a6db-4bdb3cddfc43",
        "status": "Blocked",
        "name": "CPSC 213 L1P",
        "subject": "CPSC",
        "course": "213",
        "section": "L1P",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 600,
                "end_time": 660,
                "day": "Tue",
                "term": "1"
            }
        ]
    },
    {
        "id": "41ea85e7-2aee-49a7-9619-032b371f4780",
        "status": "",
        "name": "",
        "subject": "",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 540,
                "end_time": 660,
                "day": "Thu",
                "term": "1"
            }
        ]
    },
    {
        "id": "0d20122f-0b86-4e37-be01-2c21b1aa1b21",
        "status": "Blocked",
        "name": "CPSC 213 L1R",
        "subject": "CPSC",
        "course": "213",
        "section": "L1R",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 660,
                "end_time": 720,
                "day": "Tue",
                "term": "1"
            },
            {
                "start_time": 660,
                "end_time": 780,
                "day": "Thu",
                "term": "1"
            }
        ]
    },
    {
        "id": "d5e17171-fe21-4912-83ff-d10ed753de3e",
        "status": "Blocked",
        "name": "CPSC 213 102",
        "subject": "CPSC",
        "course": "213",
        "section": "102",
        "activity": "Lecture",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 1020,
                "end_time": 1110,
                "day": "Tue",
                "term": "1"
            },
            {
                "start_time": 1020,
                "end_time": 1110,
                "day": "Thu",
                "term": "1"
            }
        ]
    },
    {
        "id": "04b87ca3-ecb9-4ea0-930f-a8c0a89b1802",
        "status": "Full",
        "name": "CPSC 213 L1A",
        "subject": "CPSC",
        "course": "213",
        "section": "L1A",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 930,
                "end_time": 990,
                "day": "Tue",
                "term": "1"
            },
            {
                "start_time": 930,
                "end_time": 1050,
                "day": "Thu",
                "term": "1"
            }
        ]
    },
    {
        "id": "271f09eb-cbae-46f6-85b9-8bda3158a20e",
        "status": "Full",
        "name": "CPSC 213 L1B",
        "subject": "CPSC",
        "course": "213",
        "section": "L1B",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 720,
                "end_time": 780,
                "day": "Tue",
                "term": "1"
            }
        ]
    },
    {
        "id": "b74c85db-c350-4fb0-af6e-6b46bf84d265",
        "status": "",
        "name": "",
        "subject": "",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 660,
                "end_time": 780,
                "day": "Fri",
                "term": "1"
            }
        ]
    },
    {
        "id": "237f6b9d-b15e-4539-adea-0887875480a4",
        "status": "Available",
        "name": "CPSC 213 L1C",
        "subject": "CPSC",
        "course": "213",
        "section": "L1C",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 780,
                "end_time": 840,
                "day": "Tue",
                "term": "1"
            },
            {
                "start_time": 780,
                "end_time": 900,
                "day": "Fri",
                "term": "1"
            }
        ]
    },
    {
        "id": "afce4733-400a-48c5-aa65-0060d6e4781b",
        "status": "Full",
        "name": "CPSC 213 L1D",
        "subject": "CPSC",
        "course": "213",
        "section": "L1D",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 840,
                "end_time": 900,
                "day": "Mon",
                "term": "1"
            }
        ]
    },
    {
        "id": "de0f7fc0-a771-4aa3-8e2d-0187aed070fc",
        "status": "",
        "name": "",
        "subject": "",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 780,
                "end_time": 900,
                "day": "Wed",
                "term": "1"
            }
        ]
    },
    {
        "id": "6738ce5f-92ab-4896-aa00-ad450a6fbb97",
        "status": "Full",
        "name": "CPSC 213 L1E",
        "subject": "CPSC",
        "course": "213",
        "section": "L1E",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 1110,
                "end_time": 1170,
                "day": "Tue",
                "term": "1"
            },
            {
                "start_time": 1110,
                "end_time": 1230,
                "day": "Thu",
                "term": "1"
            }
        ]
    },
    {
        "id": "1ea53a90-95cd-4c32-a207-60d565a2d0b7",
        "status": "Full",
        "name": "CPSC 213 L1F",
        "subject": "CPSC",
        "course": "213",
        "section": "L1F",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 540,
                "end_time": 600,
                "day": "Tue",
                "term": "1"
            }
        ]
    },
    {
        "id": "5add7dd3-684c-4f24-a6c2-95de8826051e",
        "status": "",
        "name": "",
        "subject": "",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 540,
                "end_time": 660,
                "day": "Fri",
                "term": "1"
            }
        ]
    },
    {
        "id": "85b9c365-e0fc-4b32-ab20-7bc37fe05871",
        "status": "Full",
        "name": "CPSC 213 L1G",
        "subject": "CPSC",
        "course": "213",
        "section": "L1G",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 660,
                "end_time": 720,
                "day": "Mon",
                "term": "1"
            },
            {
                "start_time": 900,
                "end_time": 1020,
                "day": "Wed",
                "term": "1"
            }
        ]
    },
    {
        "id": "d60d3b00-edf4-498e-b1e8-887a43724950",
        "status": "Available",
        "name": "CPSC 213 L1H",
        "subject": "CPSC",
        "course": "213",
        "section": "L1H",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 1020,
                "end_time": 1080,
                "day": "Mon",
                "term": "1"
            }
        ]
    },
    {
        "id": "f9f70126-0b81-416b-883a-7dfcae089f1b",
        "status": "",
        "name": "",
        "subject": "",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 1020,
                "end_time": 1140,
                "day": "Wed",
                "term": "1"
            }
        ]
    },
    {
        "id": "6de47a11-cb48-418c-a367-34936d63f14c",
        "status": "Full",
        "name": "CPSC 213 L1K",
        "subject": "CPSC",
        "course": "213",
        "section": "L1K",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 720,
                "end_time": 780,
                "day": "Mon",
                "term": "1"
            },
            {
                "start_time": 660,
                "end_time": 780,
                "day": "Wed",
                "term": "1"
            }
        ]
    },
    {
        "id": "470cae7d-050a-43a0-ab0c-849ba402721a",
        "status": "Full",
        "name": "CPSC 213 L1M",
        "subject": "CPSC",
        "course": "213",
        "section": "L1M",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 540,
                "end_time": 600,
                "day": "Mon",
                "term": "1"
            }
        ]
    },
    {
        "id": "3cabce5d-5276-47ac-a518-6488c6e3c2df",
        "status": "",
        "name": "",
        "subject": "",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 540,
                "end_time": 660,
                "day": "Wed",
                "term": "1"
            }
        ]
    },
    {
        "id": "00b0f3f1-944b-4b5c-828b-92a8966737f2",
        "status": "Full",
        "name": "CPSC 213 L1N",
        "subject": "CPSC",
        "course": "213",
        "section": "L1N",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 780,
                "end_time": 840,
                "day": "Mon",
                "term": "1"
            },
            {
                "start_time": 900,
                "end_time": 1020,
                "day": "Fri",
                "term": "1"
            }
        ]
    },
    {
        "id": "7699d166-e8b5-49a9-bcb3-ed3a6d2296f4",
        "status": "Blocked",
        "name": "CPSC 213 L1P",
        "subject": "CPSC",
        "course": "213",
        "section": "L1P",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 600,
                "end_time": 660,
                "day": "Tue",
                "term": "1"
            }
        ]
    },
    {
        "id": "e1f2cd4b-f7cb-4d20-9b4e-ebe182b6061b",
        "status": "",
        "name": "",
        "subject": "",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 540,
                "end_time": 660,
                "day": "Thu",
                "term": "1"
            }
        ]
    },
    {
        "id": "e732cede-f84e-43c1-ae1e-de72c93f7a81",
        "status": "Blocked",
        "name": "CPSC 213 L1R",
        "subject": "CPSC",
        "course": "213",
        "section": "L1R",
        "activity": "Laboratory",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 660,
                "end_time": 720,
                "day": "Tue",
                "term": "1"
            },
            {
                "start_time": 660,
                "end_time": 780,
                "day": "Thu",
                "term": "1"
            }
        ]
    },
    {
        "id": "cd7297f0-49db-4112-a247-cd44c9e3a6c9",
        "status": "Blocked",
        "name": "CPSC 213 1W1",
        "subject": "CPSC",
        "course": "213",
        "section": "1W1",
        "activity": "Waiting List",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 840,
                "end_time": 930,
                "day": "Tue",
                "term": "1"
            },
            {
                "start_time": 840,
                "end_time": 930,
                "day": "Thu",
                "term": "1"
            }
        ]
    },
    {
        "id": "153e94dc-e2df-4701-88b6-04bbdbe987ed",
        "status": "Blocked",
        "name": "CPSC 213 1W2",
        "subject": "CPSC",
        "course": "213",
        "section": "1W2",
        "activity": "Waiting List",
        "term": "1",
        "mode": "In-Person",
        "schedule": [
            {
                "start_time": 1020,
                "end_time": 1110,
                "day": "Tue",
                "term": "1"
            },
            {
                "start_time": 1020,
                "end_time": 1110,
                "day": "Thu",
                "term": "1"
            }
        ]
    }
]
test("Test: Merge seperate schedule for 213", () => {
    expect(checkSectionWithoutName(sections_213)).toEqual()
})