import {CourseColorMap, CourseColorPair} from "../src/data/DataDefinition/CourseColorMap";
import {Course} from "../src/data/DataDefinition/SearchWordDD";

const ex = require("./constants");

function mkPair(color:number, course:Course) {
    let newPair:CourseColorPair = {
        color: color,
        course: course
    }
    return newPair;
}

test("create an empty CourseColorMap", () => {
    let testMap = new CourseColorMap(3);
    expect(testMap.numberOfColors).toEqual(3);
    expect(testMap.courseColors).toEqual([]);
    expect(testMap.leftover).toEqual([0,1,2]);
});

test("CourseColorMap insert four courses", () => {
    let testMap = new CourseColorMap(5);
    testMap.insert(ex.SWC1);
    testMap.insert(ex.SWC2);
    testMap.insert(ex.SWC3);
    testMap.insert(ex.SWC4);
    expect(testMap.numberOfColors).toEqual(5);
    expect(testMap.courseColors).toEqual([mkPair(0, ex.SWC1), mkPair(1, ex.SWC2), mkPair(2, ex.SWC3), mkPair(3, ex.SWC4)]);
    expect(testMap.leftover).toEqual([4]);
});

test("CourseColorMap insert four courses delete one", () => {
    let testMap = new CourseColorMap(5);
    testMap.insert(ex.SWC1);
    testMap.insert(ex.SWC2);
    testMap.insert(ex.SWC3);
    testMap.insert(ex.SWC4);
    testMap.delete(ex.SWC2);
    expect(testMap.numberOfColors).toEqual(5);
    expect(testMap.courseColors).toEqual([mkPair(0, ex.SWC1), mkPair(2, ex.SWC3), mkPair(3, ex.SWC4)]);
    expect(testMap.leftover).toEqual([4,1]);
});

test("CourseColorMap insert three courses replace one", () => {
    let testMap = new CourseColorMap(5);
    testMap.insert(ex.SWC1);
    testMap.insert(ex.SWC2);
    testMap.insert(ex.SWC3);
    testMap.replace(ex.SWC2, ex.SWC4);
    expect(testMap.numberOfColors).toEqual(5);
    expect(testMap.courseColors).toEqual([mkPair(0, ex.SWC1), mkPair(1, ex.SWC4), mkPair(2, ex.SWC3)]);
    expect(testMap.leftover).toEqual([3, 4]);
});

test("CourseColorMap insert four courses for number of colors being 2", () => {
    let testMap = new CourseColorMap(2);
    testMap.insert(ex.SWC1);
    testMap.insert(ex.SWC2);
    testMap.insert(ex.SWC3);
    testMap.insert(ex.SWC4);
    expect(testMap.numberOfColors).toEqual(2);
    expect(testMap.courseColors).toEqual([mkPair(0, ex.SWC1), mkPair(1, ex.SWC2), mkPair(0, ex.SWC3), mkPair(1, ex.SWC4)]);
    expect(testMap.leftover).toEqual([]);
});
