

/**
 * for each lecture combinations, produce respective combinations with all labs and tutorials
 * TODO: Need to filter out time-conflicted labs, tutorials
 * @param lectures 
 * @param non_lectures 
 * @returns 
 */
//  const solve_loop = (llos)=> {
//     let rsf = [];
//     for (const los of llos) {
//       rsf = solve([los], rsf)
//     }
//     return rsf;
//   };
const solve_loop = (llos) => {
    let rsf = solve([llos.pop()], []);
    for (const los of llos) {
        rsf = rsf.reduce((result, r) =>
            result.concat(solve([los], r)),
            []);
    }
    return rsf;
};

const solve = (los, rsf_init) => {
    let n_wl = [];   //node worklist
    let node         //current node
    let rsf = [];
    let root = { assigned: rsf_init, remain: los }
    //let ii:number = 0;     //keep track of total number of loops
    n_wl.push(root);


    while (n_wl.length > 0 /*&& ii<10000*/) {
        node = n_wl.pop();

        if (node.remain.length === 0) {
            rsf.push(node.assigned)
        } else {
            n_wl = n_wl.concat(next_nodes(node));
        }
    };
    return rsf.reverse();
}

const next_nodes = (node) => {
    const assigned = node.assigned               // ["A"]
    const [f_remain, ...r_remain] = node.remain  // [[1,2] [3,4]]
    const generated_nodes = f_remain.map(f_r => (
        { assigned: [...assigned, f_r], remain: r_remain }
    )
    )
    return generated_nodes
};


const testdata = [
    ["A", "B"],
    [1, 2],
    [3, 4],
]

const result_of_first_solve = [
    ["110-lec-1", "110-lec-2"],
    ["110-lab-1", "110-lab-2"],
    ["121-lec-1", "121-lec-2"],
]
const CPSC221 = []

console.log(solve_loop(testdata))


null