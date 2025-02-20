# Javascript helper functions

---

#### These are some functions I wrote when I needed them.

- #### arrayDiff(arr1, arr2)
returns the difference between two arrays

- #### parseDiff(arr1, arr2, key)
parses difference between two arrays of objects (what is added and what is removed)

- #### findCommonElements(array1, array2)
Returns list of elements present in both array1 and array2

- #### isSame(a, b)
returns true if a and b are the same value (it datatypes have to match)

- #### deepFind(needle, haystack, key=null)
returns true/false if needle is in the haystack or not.
It can check for values of objects too.

- #### utf8ToBase64(utf8String)
encodes UTF-8 string to base64 (useful when getting 'characters outside of the Latin1' range error)

- #### base64ToUtf8(base64)
decodes base64 back to UTF-8 string

- #### findInArray(array, what)
Fast search through array. It only works when looking for simple types.

- #### findMinMax(array)
Returns both MIN and MAX value of the array

- #### compareFloats(floatA, floatB, [epsilon])
Returns true if numbers floatA and floatB are inside of epsilon tolerance.

- #### uuid(format = [8, 4, 4, 4, 12])
Generates UUID string with a given format. Default format is 8-4-4-4-12
xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
You can use your own format. For example [3, 3, 3] would return uuid in format xxx-xxx-xxx