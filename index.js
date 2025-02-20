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

function findCommonElements(array1, array2) {
    /*
    * Returns list of elements present in both array1 and array2
    * */
    const set1 = new Set(array1);
    return array2.filter((el) => set1.has(el));
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

function utf8ToBase64(utf8String) {
    /*
    * Accepts string with characters inside UTF-8 range (outside the Latin1 range  )
    * and generagets Base64 string.
    */
    // Convert UTF-8 string to bytes
    let utf8Bytes = new TextEncoder().encode(utf8String);

    // Convert bytes to binary string
    let binaryString = '';
    utf8Bytes.forEach(byte => {
        binaryString += String.fromCharCode(byte);
    });

    // Encode binary string to Base64
    return btoa(binaryString);
}

function base64ToUtf8(base64) {
    /*
    * Accepts base64 encoded string and decodes it to UTF-8 string.
    */
    // Decode Base64 to a binary string (bytes)
    let binaryString = atob(base64);

    // Convert binary string to an array of character codes
    let bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    // Decode UTF-8 bytes into a string
    let utf8Decoder = new TextDecoder('utf-8');
    return utf8Decoder.decode(bytes);
}

function findInArray(array, what) {
    /*
    *   Fast search through array. It only works when looking for simple types.
    * */
    const arL = array.length-1
    if(arL < 1){
        return false
    }
    for (let i = arL; i>=0; i--) {
        if(array[i] == what){
            return true
        }
    }
    return false
}

function findMinMax(array) {
    /*
    * Function quickly finds MIN and MAX element in array.
    * Function returns false if array is empty
    * */
    const arL = array.length
    if(arL === 0){
        return false
    }
    let tmin = array[0]
    let tmax = array[1]

    if(arL % 2 !== 0){
        array.push(tmin)
    }
    for (let i = 0; i < arL; i += 2) {
        let a = array[i]
        let b = array[i + 1]

        // Ensure both elements are numbers
        if (isNaN(a) || isNaN(b)) {
            continue
        }

        if (a < b) {
            tmin = Math.min(tmin, a)
            tmax = Math.max(tmax, b)
        } else {
            tmin = Math.min(tmin, b)
            tmax = Math.max(tmax, a)
        }
    }

    return [tmin, tmax]
}

function compareFloats(a, b, epsilon=Number.EPSILON) {
    /*
    *   Returns true if numbers a and b are inside of epsilon tolerance.
    * */
    return Math.abs(a-b) < epsilon
}

function uuid(format = [8, 4, 4, 4, 12]) {
    /*
    * Generates UUID string with a given format. Default format is 8-4-4-4-12
        xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
      You can use your own format. For example [3, 3, 3] would return uuid in format xxx-xxx-xxx
    */
    let s = "";
    const formatLen = format.length;
    for (let e = 0; e < formatLen; e++) {
        for (let i = 0; i < format[e]; i++) {
            // Generate a random number between 0 and 15, convert it to hex, and remove the "0x" prefix
            s += Math.floor(Math.random() * 16).toString(16);
        }
        if (e + 1 < format.length) {
            s += "-";
        }
    }
    return s;
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

    let s = "asdfŽĐŠĆČ_:;*?=)$€öä¨iöáéíóăěę"
    let b64 = utf8ToBase64(s)

    if(isSame(s, base64ToUtf8(b64))){
        console.log('Base64 Decoder/Encoder :: PASSED')
    } else {
        console.log('Base64 Decoder/Encoder :: FAILED')
    }

    let exp
    let act

    act = findMinMax([2, 3, 5, 7, 11, 13, 17, 19, 23, 29])
    exp = [2, 29]
    console.log(`Got ${act} :: Expected ${exp}`)

    act = compareFloats(100000.1+0.2, 100000.3)
    exp = true
    console.log(`Got ${act} :: Expected ${exp}`)

    const array1 = [1, 2, 3, 4, 5];
    const array2 = [4, 5, 6, 7, 8];
    act = findCommonElements(array1, array2);
    exp = [4, 5]
    console.log(`Got ${act} :: Expected ${exp}`)
}

runTests()