"use strict";

var makePerson = function (persArr) {

    //Deklaration av variabler
    var result = { };
    var i, j, k;

    //Math-max och Math-min funktioner (http://www.devcurry.com/2011/10/javascript-max-min-array.html)
    Array.prototype.max = function () {
        return Math.max.apply(Math, this);
    };
    Array.prototype.min = function () {
        return Math.min.apply(Math, this);
    };

    //Inläsning av "age" i persArr till ageArray
    var ageArray = [];

    for (i = 0; i < persArr.length; i += 1) {
        ageArray.push(persArr[i].age);
    }

    //Uträkning av medelålder (http://www.comptechdoc.org/independent/web/cgi/javamanual/javafunctions.html)
    var arrayLength = ageArray.length;
    var sum = 0;

    for (j = 0; j < arrayLength; j += 1) {
        sum += ageArray[j];
    }
    var average = sum / arrayLength;
    result.averageAge = Math.round(average);

    //Anrop till Math-max och Math-min funktioner för att få ut högsta och lägsta ålder (http://www.devcurry.com/2011/10/javascript-max-min-array.html)
    result.maxAge = ageArray.max();
    result.minAge = ageArray.min();

    //Inläsning av "name" i persArr till nameArray
    var nameArray = [];

    for (k = 0; k < persArr.length; k += 1) {
        nameArray.push(persArr[k].name);
    }

    //Sortering av namn (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
    nameArray.sort(function (a, b) {
        return a.localeCompare(b);
    });

    //Utskrift av namn separerade med komma och mellanslag
    result.names = nameArray.join(', ');

    return result;
}
var persArr = [{ name: "John Häggerud", age: 37 }, { name: "Johan Leitet", age: 36 }, { name: "Mats Loock", age: 46}];

var result = makePerson(persArr);

console.log(result);
