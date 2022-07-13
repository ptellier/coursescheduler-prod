import {Course} from "./SearchWordDD";

interface CourseColorPair {
    course: Course;
    color: number;
}

function makeArrayFrom1ton(n:number): number[] {
    return Array(n).fill(0).map((val, i) => i);
}

class CourseColorMap {

    numberOfColors: number;
    courseColors: CourseColorPair[]; //list that matches colors with courses to color GUI
    leftover: number[]; //records the color indices left that can be used to form new color pairs

    // EFFECTS: construct the map with no color indices assigned to courses yet and leftover as themeColors
    constructor(numberOfColorIndices: number) {
        this.numberOfColors = numberOfColorIndices;
        this.leftover = makeArrayFrom1ton(numberOfColorIndices);
        this.courseColors = [];
    }

    insert(course:Course) {
        if(this.leftover.length === 0) {
            this.leftover = makeArrayFrom1ton(this.numberOfColors);
        }
        let newPair:CourseColorPair = {
            course: course,
            color: this.leftover.pop()
        }
        this.courseColors.push(newPair);
    }

    delete(toDelete:Course) {
        for (let i = 0; i < this.courseColors.length; i++) {
            if (this.courseColors[i].course.sw === toDelete.sw) {
                this.leftover.push(this.courseColors[i].color);
                this.courseColors.splice(i,1);
                return;
            }
        }
        throw new Error("Could not find course in CourseColorMap to delete!!!");
    }

    replace(toReplace:Course, replacement:Course) {
        for (let i = 0; i < this.courseColors.length; i++) {
            if (this.courseColors[i].course.sw === toReplace.sw) {
                this.courseColors[i].course = replacement;
                return;
            }
        }
        throw new Error("Could not find course in CourseColorMap to replace!!!");
    }
}

