import React from "react";
import { Section } from "../data/DataDefinition/SectionDD";

/**
 * Sections chosen and sections remaining at each node in the search tree
 * @typedef {Object} Node
 * @property {Section[]} assigned - listof Section that are assigned
 * @property {Section[]} remain - listof Section remainng to be assigned
 */
 interface Node {
    assigned: Section[]
    remain: Section[][]
}
/**
 * @example a single node contains:
 * 1. assigned = [ COMM388-LectureA, ]
 * 2. remain = [
*                  [CPSC121-LectureA, CPSC121-LectureB]
*                  [CPSC121-LabA, CPSC121-LabB, CPSC121-LabC]
*                  [CPSC121-TutorialA, CPSC121-TutorialB]
*                  [CPSC110-LectureA, CPSC121-LectureB]
*                  [CPSC110-LabA, CPSC121-LabB]
 *             ]
 */


/**
 * solve function for los
 * at each iteration,
 * 1. take node from n_wl
 * 2. add to rsf if completed (empty? node.remain)
 * 3. otherwise generate next nodes and push to n_wl 
 * @param los 
 * @returns 
 */
export const solve = (los: Section[][]): Section[][] => {
    // const og_los = los       /*keep track of original list of sections */ no longer needed
    let n_wl: Node[] = [];   //node worklist
    let node: Node;          //current node
    let rsf: Section[][] = [];
    let root:Node = { assigned: [], remain: los }
    //let ii:number = 0;     //keep track of total number of loops
    n_wl.push(root);


    while (n_wl.length > 0 /*&& ii<10000*/) {
        node = n_wl.pop() as Node;
        
        if (node.remain.length === 0) {
            rsf.push(node.assigned)
        } else {
            n_wl = n_wl.concat(next_nodes(node));
        }
    };
    return rsf.reverse();
}

/**
 * generates next nodes and filter out nodes with time-conflicted sections
 * @param node 
 * @returns 
 */
const next_nodes = (node: Node): Node[] => {
    const assigned = node.assigned               // ["A"]
    const [f_remain, ...r_remain] = node.remain  // [[1,2] [3,4]]
    const generated_nodes = f_remain.map(f_r => (
        { assigned: [...assigned, f_r], remain: r_remain }
        )
    )

    //TODO: apply time conflicting filter here:
    //const filtered_nodes = ...filter_time_conflicted()

    //TODO: implement optional courses choices
    // 

    return generated_nodes
};