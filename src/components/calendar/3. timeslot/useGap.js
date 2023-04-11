// console.log("Find Gap's starting times:")
// const timeData = [660, 690, 720, 750, 780, 840, 870, 900, 930]
// const MINSTART = 660
// const MAXEND = 960

// const timeData = []
// const MINSTART = 630
// const MAXEND = 720
/**
 * times     = [660, 690, 720, 750, 780, ~ 840, 870, 900, 930] => {780 : 2}
 * min_start = 660
 * max_end   = 960
 * start_gap = {min_start : times[0] - min_start 
 * end_gap.  = {times[times.length - 1]   : min_end - times[times.length - 1] 
 * 
 * 
 * ==> {780:2, 930:1}
 */


/**
 * REQUIRES: occupiedTimes cannot be not empty
 * EFFECTS: return a list of gap times
 * INVARIANT: given occupiedTimes should be in order of start then end
 * NOTE: this function uses two pointers that check whether times have gaps
 *       between them. If there is gap, add the starting time of the gap
 *       into the hashmap, or 'hashGap' as key, and number of gaps as value
 * @param {*} times 
 * @param {*} minStartTime 
 * @param {*} maxEndTime 
 * @returns {HashMap} ex) {780:2, 930:1}
 */
export const getGapTimes = (occupiedTimes, minStartTime, maxEndTime) => {
    const INTERVAL = 30
    let left = 0, right = 1
    let hashGaps = {};

    while (occupiedTimes[left] || occupiedTimes[right]) {
        const intvr = occupiedTimes[right] - occupiedTimes[left]
        if (intvr > INTERVAL) {
            // put gap's starting time : count of gap
            // into the hashmap, hashGaps.
            hashGaps[occupiedTimes[left]] = (intvr / INTERVAL) 
        }
        left ++;
        right ++;
    }
    const startInserted = getStartGap(hashGaps, minStartTime, occupiedTimes, INTERVAL)
    return getEndGap(startInserted, maxEndTime, occupiedTimes, INTERVAL)
}

/**
 * MODIFIES: hashGaps
 * EFFECTS: insert the gap of minStartTime ~ first occupied time
 *          into the hasGaps, if exists. Then, return the hashGaps
 * @param {*} hashGaps 
 * @param {*} minStartTime 
 * @param {*} times 
 * @param {*} INTERVAL 
 * @returns 
 */
const getStartGap = (hashGaps, minStartTime, times, INTERVAL) => {
    const intvr = times[0] - minStartTime
    if (intvr === 0) return hashGaps
    hashGaps[minStartTime] = intvr / INTERVAL
    return hashGaps
}

/**
  * MODIFIES: hashGaps
  * EFFECTS: insert the gap of minStartTime ~ first occupied time,
  *          into the hasGaps, if exists. Then return the hashGaps
 * @param {*} hashGaps 
 * @param {*} maxEndTime 
 * @param {*} times 
 * @param {*} INTERVAL 
 * @returns 
 */
const getEndGap = (hashGaps, maxEndTime, times, INTERVAL) => {
    const intvr = maxEndTime - times[times.length - 1]
    if (intvr === 0) return hashGaps
    hashGaps[times[times.length - 1]] = intvr / INTERVAL
    return hashGaps
}

/**
 * EFFECTS: convert given hashGaps into a list of gap timeslots
 * @param {*} hashGaps 
 * @returns 
 */
export const gapTimesToTimeSlots = (hashGaps) => {
    let result = []
    for (let [key, value] of Object.entries(hashGaps)) {
        const gapSlot = { 
            type: "gap",
            start_time: parseInt(key), 
            end_time: parseInt(key) + (30 * value ) 
        }
        result.push(gapSlot)
    }
    return result;
}