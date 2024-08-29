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