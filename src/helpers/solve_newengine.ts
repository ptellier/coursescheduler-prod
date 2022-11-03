import { Schedule } from "../data/DataDefinition/ScheduleDD";
import { Section } from "../data/DataDefinition/SectionDD";
import { is_overlap_losections } from "./overlap";
import { calculateTimeGap, countFreeDays, findStartVariance, } from "./recommend";

/**
 * Sections chosen and sections remaining at each node in the search tree
 * @typedef {Object} Node
 * @property {Section[]} assigned - listof Section that are assigned
 * @property {Section[]} remain - listof Section remainng to be assigned
 */
interface Node {
  assigned: Section[];
  remain: Section[][];
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
export const solve = (los: Section[][]): Schedule[] => {
  const LIMIT = 50000 * 2 // cap to 100,000 potential results. 
  let n_wl: Node[] = []; //node worklist
  let node: Node; //current node
  let rsf: Schedule[] = [];
  let root: Node = {
    assigned: [],
    remain: los,
  };
  //let ii:number = 0;     
  n_wl.push(root);

  while (n_wl.length > 0 /*&& ii<10000*/) {
    if(rsf.length >= LIMIT){return rsf} //keep track of total number of loops
    node = n_wl.pop() as Node;

    if (node.remain.length === 0) {
      const timeGap = calculateTimeGap(node.assigned);
      const startVariance = findStartVariance(node.assigned);
      const numFreeDays = countFreeDays(node.assigned);

      rsf.push({
        sections: node.assigned,
        timeGap: timeGap,
        startVariance: startVariance,
        numFreeDays: numFreeDays,
      });
    } else {
      n_wl = n_wl.concat(next_nodes(node));
    }
  }
  return rsf.reverse();
};

/**
 * generates next nodes and filter out nodes with time-conflicted sections
 * @param node
 * @returns
 */
export const next_nodes = (node: Node): Node[] => {
  const assigned: Section[] = node.assigned;
  const [f_remain, ...r_remain] = node.remain;
  const generated_nodes: Node[] = f_remain.map((f_r) => ({
    assigned: [...assigned, f_r],
    remain: r_remain,
  }));

  return generated_nodes.filter((nd: Node) =>
    !is_overlap_losections(nd.assigned)
  );
};