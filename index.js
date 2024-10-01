function arrayDiff(arr1, arr2) {
    /*
    * returns the difference between two arrays
    * */
    const set2 = new Set(arr2);
    const union = new Set([...arr1, ...arr2])
    const intersect = new Set([...arr1].filter(x => set2.has(x)))
    const difference = new Set([...union].filter(x => !intersect.has(x)));

    return [...difference];
}

function parseDiff(arr1, arr2, key){
    /*
    *  Accepts two arrays of objects and a key.
    *  Key is used to identify what value of object should be checked for the difference.
    *  Function returns an object with 4 values
    *  - removedKeys : what keys were removed from arr1
    *  - addedKeys : what keys were added in arr2
    *  - removed : what objects were removed from arr1
    *  - added : what objects were added in arr2
    * */
    const keys1 = arr1.map((x) => x[key].toString())
    const keys2 = arr2.map((x) => x[key].toString())
    const set1 = new Set(keys1)
    const set2 = new Set(keys2)
    const removedKeys = new Set([...set1].filter(x => !set2.has(x)))
    const addedKeys = new Set([...set2].filter(x => !set1.has(x)))
    const removed = arr1.filter((x) => removedKeys.has(x[key]))
    const added = arr2.filter((x) => addedKeys.has(x[key]))

    return {
        removedKeys: [...removedKeys],
        addedKeys: [...addedKeys],
        removed: removed,
        added: added
    }
}

function isSame(a, b){
    /*
    * Function compares two simple datatypes if they match (number, string, boolean)
    * Types of a and b have to match
    * */

    if(typeof a === "string" && typeof b === "string"){
        if(a.localeCompare(b) == 0){
            return true
        }
    }
    if(typeof a === "number" && typeof b === "number") {
        return a == b
    }

    return a == b
}

function deepFind(needle, haystack, key=null){
    /*
    * Accepts a needle and a haystack. It checks if needle exists in a haystack.
    * Haystack can be an array or array of arrays, or array of objects.
    * If key = null, then it will check for simple datatypes (number, string, boolean)
    * If key is not null, it will check for an object's property
    * */
    let foundTheNeedle = false
    function search(n, h){

        const s = h.length
        let el
        for(let i=0; i<s; i++) {
            el = h[i]
            if(Array.isArray((el))){
                search(n, el)
            }
            if(key !== null && el instanceof Object){
                if(el.hasOwnProperty(key) && isSame(el[key], needle)){
                    foundTheNeedle = true
                }
            }
            else if(key === null && !(el instanceof Object)){
                if(isSame(el, needle)){
                    foundTheNeedle = true
                }
            }
        }
    }

    search(needle, haystack)
    return foundTheNeedle
}




/***********************/
/******* TESTS *********/
/***********************/
function runTests(){
    const a = [{a: 'a', b: 1}, {a: 'b', b: 2}]
    const b = [{a: 'a', b: 1}, {a: 'c', b: 3}]
    let ret = parseDiff(a, b, 'a')
    let expc = {
        removedKeys: [ 'b' ],
        addedKeys: [ 'c' ],
        removed: [ { a: 'b', b: 2 } ],
        added: [ { a: 'c', b: 3 } ]
    }
    //console.log('PARSE DIFF TEST')
    //console.log(ret)
    //console.log(expc)


    const n = "findMe"
    const h1 = ["test", "not Me", 2, true, ["test", "not Me", 2, true], {"theKesy": "findsMe"}, "findMe"]
    const h2 = ["test", "not Me", 2, true, ["test", "not Me", 2, true], {"theKey": "findMe"}]
    const h3 = ["test", "not Me", 2, true, ["test", "not Me", 2, true, {"theKey": "findMe"}]]
    const h4 = ["test", "not Me", 2, true, ["test", "not Me", 2, true, {"notTheKey": "findMee"}]]

    ret = deepFind(n, h1)
    if(ret){
        console.log('Deepfind test 1 :: PASSED')
    } else {
        console.log('Deepfind test 1 :: FAILED')
    }

    ret = deepFind(n, h2, "theKey")
    if(ret){
        console.log('Deepfind test 2 :: PASSED')
    } else {
        console.log('Deepfind test 2 :: FAILED')
    }

    ret = deepFind(n, h3, "theKey")
    if(ret){
        console.log('Deepfind test 2 :: PASSED')
    } else {
        console.log('Deepfind test 2 :: FAILED')
    }

    ret = deepFind(n, h4, "theKey")
    if(!ret){
        console.log('Deepfind test 2 :: PASSED')
    } else {
        console.log('Deepfind test 2 :: FAILED')
    }
}

runTests()
