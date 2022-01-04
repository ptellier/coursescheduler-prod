import React from "react";
import { ListOfSection, Section } from "../src/data/DataDefinition/SectionDD";
import {SolveOptions, PredData, Pred} from "../src/data/DataDefinition/SolveOptionsDD";
import {crit1_not_same_time} from "./optional"


/**
 * Sections chosen and sections remaining at each node in the search tree
 * @typedef {Object} Node
 * @property {ListOfSection} assigned - listof Section that are assigned
 * @property {ListOfSection} remain - listof Section remainng to be assigned
 */
interface Node {
  assigned: ListOfSection;
  remain: ListOfSection;
}

/**
 * produce all of the valid (listof sections) that can be taken
 * valid schedule means:
 * 1. All sections in assigned are unique
 * 2. All sections in assinged satisfy user's required courses
 * @param {ListOfSection} los
 * @returns {ListOfSection[]}
 */
export const solve = (los: ListOfSection): ListOfSection[] => {
  const next_nodes = (node: Node): Node[] => {
    return [pick(node), skip(node)].filter((nd) => {
      return goodSchedule(nd) && crit1_not_same_time(nd.assigned)});
  };
  /**
   * produce true if given' node's assigned satisfy conditions
   * @param {Node} node
   * @returns {Boolean}
   */
  const goodSchedule = (node: Node): Boolean => {
    return !isDuplicateSection(node.assigned); // CPSC 121-lecture,  CPSC 121-Lab, CPSC 121-Lab ,_ filtered out
    //complete(node.assigned, og_los)
  };

  /**
   * pick the first section of remain and place it in assigned
   * @param {Node} node
   * @returns {Node}
   */
  const pick = (node: Node): Node => {
    const [first, ...rest] = node.remain;
    return { assigned: [first, ...node.assigned], remain: rest };
  };
  /**
   * skip the first section of remain
   * @param {Node} node
   * @returns {Node}
   */
  const skip = (node: Node): Node => {
    const [first, ...rest] = node.remain;
    return { assigned: node.assigned, remain: rest };
  };

  const og_los = los; /*keep track of original list of sections */
  let n_wl: Node[] = []; //node worklist
  let node: Node; //current node
  let rsf: ListOfSection[] = [];
  let root: Node = { assigned: [], remain: los };
  //let ii:number = 0; //keep track of total number of loops
  n_wl.push(root);

  while (n_wl.length > 0 /*&& ii<10000*/) {
    node = n_wl.pop() as Node;
    if (complete(node.assigned, og_los)) {
      //solution??
      rsf.push(node.assigned);
      if (node.remain.length > 0) {
        n_wl = n_wl.concat(next_nodes(node));
      }
    } else {
      if (node.remain.length > 0) {
        n_wl = n_wl.concat(next_nodes(node));
      } //else {do nothing (discards node)}
    }
    //nii=+ ii;
  }
  //console.log(rsf);
  return rsf;
};


/**
 * find the most optimized course schedule based on criteria
 * @param {Section[]} sections - sections to schedule
 * @param {PredData[]} predData - the schedule criteria in order of priority
 * @param {SolveOptions} opt - specifies data and details for criteria
 * @todo
 */
function final_idea_for_solve(
  los: Section[],
  predData: PredData[],
  opt: SolveOptions
) {

  const crits: Pred[] = predData.map((pd: PredData) => {
    if (typeof pd.optKey === "string") {
      let key = pd.optKey as keyof SolveOptions;
      let closure: Pred = (loc: Section[]) => {
        return pd.pred(loc, opt[key]);
      };
      return closure;
    } else {
      return pd.pred;
    }
  });

  const next_nodes = (node: Node): Node[] => {
    return [pick(node), skip(node)].filter((nd) => {
      return goodSchedule(nd) && crit1_not_same_time(nd.assigned)});
  };
  /**
   * produce true if given' node's assigned satisfy conditions
   * @param {Node} node
   * @returns {Boolean}
   */
  const goodSchedule = (node: Node): Boolean => {
    return !isDuplicateSection(node.assigned); // CPSC 121-lecture,  CPSC 121-Lab, CPSC 121-Lab ,_ filtered out
    //complete(node.assigned, og_los)
  };

  /**
   * pick the first section of remain and place it in assigned
   * @param {Node} node
   * @returns {Node}
   */
  const pick = (node: Node): Node => {
    const [first, ...rest] = node.remain;
    return { assigned: [first, ...node.assigned], remain: rest };
  };
  /**
   * skip the first section of remain
   * @param {Node} node
   * @returns {Node}
   */
  const skip = (node: Node): Node => {
    const [first, ...rest] = node.remain;
    return { assigned: node.assigned, remain: rest };
  };

  const og_los = los; /*keep track of original list of sections */
  let n_wl: Node[] = []; //node worklist
  let node: Node; //current node
  let rsf: ListOfSection[] = [];
  let root: Node = { assigned: [], remain: los };
  //let ii:number = 0; //keep track of total number of loops
  n_wl.push(root);

  while (n_wl.length > 0 /*&& ii<10000*/) {
    node = n_wl.pop() as Node;
    
    if (crits.every((predi:Pred) => predi(node.assigned))) {
      //solution??
      rsf.push(node.assigned);
      if (node.remain.length > 0) {
        n_wl = n_wl.concat(next_nodes(node));
      }
    } else {
      if (node.remain.length > 0) {
        n_wl = n_wl.concat(next_nodes(node));
      } //else {do nothing (discards node)}
    }
    //nii=+ ii;
  }
  //console.log(rsf);
  return rsf.reverse();
}

/**
 * produce true if sections have duplicate, false otherwise
 * CPSC121 Lecture101, CPSC121 Lecture102 will produce true
 * CPSC121 Lecture101, CPSC210 Lecture102 will produce false
 * @param {ListOfSection} los
 * @returns {Boolean}
 */
export const isDuplicateSection = (los: ListOfSection): Boolean => {
  const isDuplicateSection = (los: ListOfSection): Boolean => {
    const [first, ...rest] = los;
    if (empty(los)) {
      return false;
    } else {
      if (rest.some((s) => matchCourse(s, first))) {
        // using ormap
        return true;
      } else {
        return isDuplicateSection(rest);
      }
    }
  };
  if (empty(los)) {
    return false;
  } else {
    return isDuplicateSection(los);
  }
};

/**
 * produce true if all necessary lectures are included in assigned
 * @param {ListOfSection} assigned
 * @param {ListOfSection} og_los
 * @returns {Boolean}
 */
export const complete = (
  assigned: ListOfSection,
  og_los: ListOfSection
): Boolean => {
  const included = (og_s: Section) => {
    return !assigned.some((a) => matchCourse(a, og_s));
  };
  return empty(og_los.filter((og_s) => included(og_s)));
};

/**
 * produce true if s1 and s2 equal in subject, course, ...TODO more items
 * @param {Section} s1
 * @param {Section} s2
 * @returns {Boolean}
 */
export const matchCourse = (s1: Section, s2: Section): Boolean => {
  return (
    s1.subject === s2.subject && // CPSC
    s1.course === s2.course && // 121
    s1.activity === s2.activity
  );
};

/**
 * produce true if given array is empty
 */
export const empty = (l: any[]): Boolean => {
  return l.length === 0;
};
