import {Course} from "./SearchWordDD";

export interface CourseColorPair {
    course: Course;
    color: number;
}

function makeArrayFrom1ton(n:number): number[] {
    return Array(n).fill(0).map((val, i) => i);
}

export class CourseColorMap {

    readonly numberOfColors: number;
    courseColors: CourseColorPair[]; //list that matches colors with courses to color GUI
    leftover: number[]; //records the color indices left that can be used to form new color pairs

    // EFFECTS: construct the map with no color indices assigned to courses yet and leftover as themeColors
    constructor(numberOfColorIndices: number) {
        this.numberOfColors = numberOfColorIndices;
        this.leftover = makeArrayFrom1ton(numberOfColorIndices);
        this.courseColors = [];
    }

    // EFFECTS: insert a CourseColorPair into courseColors using the first color in leftover after removing it
    // MODIFIES: this
    insert(course:Course) {
        if(this.leftover.length === 0) {
            this.leftover = makeArrayFrom1ton(this.numberOfColors);
        }
        let newPair:CourseColorPair = {
            course: course,
            color: this.leftover.shift() as number //cause we just made sure it won't return undefined
        }
        this.courseColors.push(newPair);
    }

    // EFFECTS: insert a CourseColorPair into courseColors using the first color in leftover after removing it
    // MODIFIES: this
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

    // EFFECTS: replace a course in coloursColours by searching for it in the pairs by Course SearchWord
    // MODIFIES: this
    replace(toReplace:Course, replacement:Course) {
        for (let i = 0; i < this.courseColors.length; i++) {
            if (this.courseColors[i].course.sw === toReplace.sw) {
                this.courseColors[i].course = replacement;
                return;
            }
        }
        throw new Error("Could not find course in CourseColorMap to replace!!!");
    }

    // for testing objects of this type
    checkEquals(numColors: number, courseColors_sws: string[], courseColors_colors: number[], leftovers: number[]) {
        if (courseColors_sws.length !== this.courseColors.length
            || courseColors_colors.length !== this.courseColors.length
            || this.leftover.length !== leftovers.length
            || this.numberOfColors !== numColors) {
            return false;
        }
        for (let i = 0; i < this.courseColors.length; i++) {
            if (courseColors_sws[i] !== this.courseColors[i].course.sw
                || courseColors_colors[i] !== this.courseColors[i].color) {
                return false;
            }
        }
        for (let i = 0; i < this.leftover.length; i++) {
            if (this.leftover[i] !== leftovers[i]) {
                return false;
            }
        }
        return true;
    }


}

