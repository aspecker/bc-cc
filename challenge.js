const fs = require('fs');


const inputArr = fs.readFileSync('input.txt','utf8')
    .trim()
    .split('\r\n')
    .map(line=>line.split(' '))

const tableArr = inputArr.filter(line=>line.includes('tables:'))

const partyArr = inputArr.filter(line=>line.includes('party'))



console.log(tableArr);
console.log(partyArr);
