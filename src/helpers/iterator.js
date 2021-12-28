const { access } = require("fs");

const numbers = [1, 2, 3]


const data = [
    {"name": "1"},
    {"name": "2"},
    {"name": "3"},
    {"name": "4"},
    {"name": "5"},
    {"name": "6"},
    {"name": "7"},
    {"name": "8"},
    {"name": "9"},
    {"name": "10"},
    {"name": "11"},
    {"name": "12"},
    {"name": "13"},
    {"name": "14"},
    {"name": "16"},
    {"name": "17"},
    {"name": "18"},
    {"name": "19"},
    {"name": "20"},
]

let acc = []
/**
 * @brief : Heap's algorithm for permutating an array
 * @param callbackFunction: this function gets called for each permutation
 * @return : void
 * @props : This code is based on the algorithm stated on https://en.wikipedia.org/wiki/Heap%27s_algorithm
 **/
 function permute(inputArr, callbackFunction) {
    function swap(array, index1, index2){
      let tmp = array[index1];
      array[index1] = array[index2];
      array[index2] = tmp;
    }
    let array = inputArr;
    let n = array.length;
    //c is an encoding of the stack state. c[k] encodes the for-loop counter for when generate(k+1, array) is called
    let c = Array(n);
  
    for (let i = 0; i < n; i += 1){
        c[i] = 0;
    }
  
    callbackFunction(array);
  
    //i acts similarly to the stack pointer
    let i = 0;
    while (i < n) {
        if (c[i] < i) {
            if (i % 2 == 0) {
                swap(array, 0, i);
            } else {
                swap(array, c[i], i);
            }
  
            callbackFunction(array);
  
            //Swap has occurred ending the for-loop. Simulate the increment of the for-loop counter
            c[i] += 1;
            //Simulate recursive call reaching the base case by bringing the pointer to the base case analog in the array
            i = 0;
        } else {
            //Calling generate(i+1, array) has ended as the for-loop terminated. Reset the state and simulate popping the stack by incrementing the pointer.
            c[i] = 0;
            i += 1;
        }
    }
  }


permute(data, (arr => acc.push(arr)))

console.log(acc)


for (const d of data) {
    console.l
}
