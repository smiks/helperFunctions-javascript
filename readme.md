# Javascript helper functions

---

#### These are some functions I wrote when I needed them.

- #### arrayDiff(arr1, arr2) - returns the difference between two arrays
- #### parseDiff(arr1, arr2, key) - parses difference between two arrays of objects (what is added and what is removed)
- #### isSame(a, b) - returns true if a and b are the same value (it datatypes have to match)
- #### deepFind(needle, haystack, key=null) - returns true/false if needle is in the haystack or not.
    It can check for values of objects too.
- #### utf8ToBase64(utf8String) - encodes UTF-8 string to base64 (useful when getting 'characters outside of the Latin1' range error)
- #### base64ToUtf8(base64) - decodes base64 back to UTF-8 string