import {Section, Timeslot} from "../data/DataDefinition/SectionDD";
import {IndexSchedule} from "../data/DataDefinition/ScheduleDD";
import {hashSectionToInt} from "./hashStringToInt";

const BACKEND_BASE_URL: string = "interval-scheduling-api-lb-723202949.ca-central-1.elb.amazonaws.com:80"

export interface SolveStrategy {
    solve: (los: Section[][]) => Promise<IndexSchedule[]>;
}

type Interval = [number, number];
type IntervalBundle = Interval[];
type Choiceset = IntervalBundle[];

const DaysToMinutesMap = {
    "Mon": 24*60*0,
    "Tue": 24*60*1,
    "Wed": 24*60*2,
    "Thu": 24*60*3,
    "Fri": 24*60*4,
    "Sat": 24*60*5,
    "Sun": 24*60*6,
}

const convertToMinutesPastMondayAtMidnightInterval = (timeSlot: Timeslot): Interval => {
    return [DaysToMinutesMap[timeSlot.day] + timeSlot.start_time, DaysToMinutesMap[timeSlot.day] + timeSlot.end_time];
}

const convertToChoicesets = (lolos: Section[][]): Choiceset[] => {
    let choicesets: Choiceset[] = [];
    for (let los of lolos) {
        let chset: Choiceset = [];
        if (los.length === 0) {console.error("formed empty choiceset when attempting to solve");}
        for (let sect of los) {
            let bndl: IntervalBundle = [];
            for (let timeSlot of sect.schedule) {
                bndl.push(convertToMinutesPastMondayAtMidnightInterval(timeSlot));
            }
            chset.push(bndl);
        }
        choicesets.push(chset);
    }
    return choicesets;
}

const makeChoicesetIds = (lolos: Section[][]): Promise<number[]> => {
    let ids: Promise<number>[] = [];
    for (let los of lolos) {
        //assuming we won't have an empty choiceset
        ids.push(hashSectionToInt(los[0]));
    }
    return Promise.all(ids);
}

async function putChoiceSet(choiceset: Choiceset, id: number): Promise<number> {
    const urlToQuery: string = BACKEND_BASE_URL+"/choiceset/"+id;
    console.log(urlToQuery);
    const response = await fetch(urlToQuery, {
        method: "PUT",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        body: JSON.stringify(choiceset),
    });
    return response.status;
}

async function getSchedule(ids: number[]) {
    let queryParams: string[] = [];
    for (let id of ids) {
        queryParams.push("id="+id);
    }
    const urlToQuery: string = BACKEND_BASE_URL+"/schedule/?"+queryParams.join("&");
    console.log(urlToQuery);
    const response = await fetch(urlToQuery, {
        method: "GET",
        credentials: "same-origin",
        redirect: "follow",
    });
    return response
}

async function getScheduleOptimize(ids: number[]): Promise<IndexSchedule[]> {
    let queryParams: string[] = [];
    for (let id of ids) {
        queryParams.push("id="+id);
    }
    const urlToQuery: string = BACKEND_BASE_URL+"/schedule/optimize/?"+queryParams.join("&");
    console.log(urlToQuery);
    const response = await fetch(urlToQuery, {
        method: "GET",
        credentials: "same-origin",
        redirect: "follow",
    });
    if (response.status === 200) {
        return response.json();
    } else {
        return [];
    }
}


export const SolveStrategyBackend: SolveStrategy  = {
    solve: async (lolos: Section[][]): Promise<IndexSchedule[]> => {
        const choicesets: Choiceset[] = convertToChoicesets(lolos);
        const ids: number[] = await makeChoicesetIds(lolos);
        if (ids.length !== choicesets.length) {console.error("number of choicesets and number of choiceset ids should be equal");}
        let statusPromises: Promise<number>[]  = [];
        for (let i = 0; i < ids.length; i++) {
            statusPromises.push(putChoiceSet(choicesets[i], ids[i]));
        }
        return Promise.all(statusPromises).then((statuses) => {
            for (let status of statuses) {
                if (status !== 200) {return Promise.reject(status)}
            }
            return Promise.resolve(200);
        })
        .then((status) => getScheduleOptimize(ids))
        .catch((status) => {
            console.error("response status was: " + status)
            return [];
        })
    }
}



