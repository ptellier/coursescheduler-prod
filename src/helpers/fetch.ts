import { SearchWord } from "../data/DataDefinition/SearchWordDD";

// Functions in this file fetches data from Course API 

/**
 * fetches sections that corresponds to given sw
 * @param sw; i.e CPSC/110
 */
export const fetchSection = async(sw: SearchWord) => {
    const url = `https://api.ubccourses.com/section/${sw}/?realtime=1`
    const res = await fetch(url)
    const data = await res.json()
    return data
}
