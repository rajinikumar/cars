var parentArray = [1, 'a', 2, 'b', 3];
var childArray1 = [1, 2, 3];
var childArray2 = [1, 'a', 3];
var childArray3 = [1, 2, 3,5];

function checkArrayInArray(parentArray, childArray){
    return childArray.every(function (val) { 
        return parentArray.indexOf(val) >= 0; 
    });
}

var check1 = checkArrayInArray(parentArray, childArray1);
var check2 = checkArrayInArray(parentArray, childArray2);
var check3 = checkArrayInArray(parentArray, childArray3);
console.log("check 1 -->", check1);
console.log("check 2 -->", check2);
console.log("check 3 -->", check3);
// var isSuperset = arr2.every(function (val) { return arr1.indexOf(val) >= 0; });
// console.log("Should be true -> " + isSuperset);

// arr1 = ['a', 2, 'b', 3];
// arr2 = [1, 2, 3];

// isSuperset = arr2.every(function (val) { return arr1.indexOf(val) >= 0; });
// console.log("Should be false -> " + isSuperset);