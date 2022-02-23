const cells_display = [
    {
        "id": "na",
        "name": "1",
        "height": 1.5,
        "start": 360,
        "end": 390,
        "is_occupied": false,
        "isNextMove": false
    },
    {
        "id": "na",
        "name": "2",
        "height": 1.5,
        "start": 380,
        "end": 420,
        "is_occupied": false,
        "isNextMove": false
    },
    {
        "id": "na",
        "name": "gap_420",
        "height": 1.5,
        "start": 420,
        "end": 450,
        "is_occupied": false,
        "isNextMove": false
    },
    {
        "id": "na",
        "name": "gap_450",
        "height": 1.5,
        "start": 450,
        "end": 480,
        "is_occupied": false,
        "isNextMove": false
    },
    {
        "id": "na",
        "name": "A",
        "height": 1.5,
        "start": 480,
        "end": 510,
        "is_occupied": false,
        "isNextMove": false
    },
    {
        "id": "na",
        "name": "B",
        "height": 1.5,
        "start": 500,
        "end": 540,
        "is_occupied": false,
        "isNextMove": false
    },
    {
        "id": "na",
        "name": "gap_540",
        "height": 1.5,
        "start": 540,
        "end": 570,
        "is_occupied": false,
        "isNextMove": false
    },
    {
        "id": "na",
        "name": "C",
        "height": 1.5,
        "start": 570,
        "end": 600,
        "is_occupied": false,
        "isNextMove": false
    },
    {
        "id": "na",
        "name": "D",
        "height": 1.5,
        "start": 580,
        "end": 630,
        "is_occupied": false,
        "isNextMove": false
    },
    {
        "id": "na",
        "name": "gap_630",
        "height": 1.5,
        "start": 630,
        "end": 660,
        "is_occupied": false,
        "isNextMove": false
    },
    {
        "id": "na",
        "name": "E",
        "height": 1.5,
        "start": 660,
        "end": 700,
        "is_occupied": false,
        "isNextMove": false
    },
    {
        "id": "na",
        "name": "F",
        "height": 1.5,
        "start": 690,
        "end": 720,
        "is_occupied": false,
        "isNextMove": false
    },
    {
        "id": "na",
        "name": "G",
        "height": 1.5,
        "start": 710,
        "end": 750,
        "is_occupied": false,
        "isNextMove": false
    },
    {
        "id": "na",
        "name": "H",
        "height": 1.5,
        "start": 749,
        "end": 800,
        "is_occupied": false,
        "isNextMove": false
    },
    // {
    //     "id": "na",
    //     "name": "gap_800",
    //     "height": 1.5,
    //     "start":800,
    //     "end": 830,
    //     "is_occupied": false,
    //     "isNextMove": false
    // },
]


// TODO make sure addition is continuous
// REQUIRES: cells is sorted array
// EFFECTS: group overlapping course schedules
const groupOverlap = (cells) => {
    let acc = [];
    let prev = cells[0];
    let addition = [];
    let record = [];

    for (let i=1; i < cells.length; i++) {
        if (overlaps(prev, cells[i])) {
            if (record.includes(prev)) {
                record.push(cells[i])

                addition.push(cells[i]);
            } else {
                record.push(prev)
                record.push(cells[i])

                addition.push(prev, cells[i]);
            }
        } else {
            if (addition.length === 0) {
                acc.push([prev])
            } else {
                acc.push(addition);
                addition = [];
            }
            if (i === cells.length - 1) { acc.push([cells[i]])}
        }
        
        prev = cells[i];
    }
    
    acc.push(addition);
    if (acc[acc.length - 1].length === 0) { acc.pop() }
    return acc;
}

// EFFECTS: return true if two cells overlaps
const overlaps = (c1, c2) => {
    let s1 = c1.start; let e1 = c1.end;
    let s2 = c2.start; let e2 = c2.end;
    return ((e2 > e1) && (s2 < e1)) || ((e2 <= e1) && (e2 > s1))
}

console.log(groupOverlap(cells_display));