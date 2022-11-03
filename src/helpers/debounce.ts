  /**
* Debounce function
* @param {*} callback 
* @param {*} delay 
* @returns 
*/
export const debounce = (callback : any, delay = 500) => {
 let timer : any;
 return (...args : any) => {
   clearTimeout(timer)
   timer = setTimeout(() => {
     callback(...args)
   }, delay)
 }
}