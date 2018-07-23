const fs = require('fs');

const io = require('./utils/inputOutput.js')
const seats = require('./utils/seatCount.js')
const sort = require ('./utils/sortMethods.js')

const input = fs.readFileSync('./inputs/test.txt','utf8')
// console.log(input)

// make calls to input processing methods
const partyArr = io.processParties(input);
const tableArr = io.processTables(input);

// function that is called to begin sorting
const sortTables = (tables, parties) => {
    // checking if there are enough total seats
    if (seats.checkSeatingAmount(tables,parties)===false){
        return console.log(`    
        The sort could not be completed because there are not enough total seats for every guest.
        Please add additional seats or tables and try again.
        `)
    } // checking if the largest table can seat the largst party
    if (seats.checkLargestTable(tables,parties)===false){
        return console.log(`
        The largest table cannot seat the largest party.
        Please increase the size of the largest table.
        `)
    }
    // declaring variables
    let tableArray=tables;
    let partyArray=parties;

    // const likers = parties.filter(party=>party.dislikes==='none')
    // let dislikers = sort.sortByDislikes(parties);

    [tableArray,partyArray] = sort.exactSort(tableArray,partyArray);
    const likers =sort.sortBySize(partyArray).filter(party=>party.dislikes==='none');
    let dislikers = sort.sortByDislikes(partyArray);
    [tableArray, dislikers] = sort.firstSort(tableArray,dislikers);
    partyArray = [...dislikers,...likers];
    [tableArray,partyArray] = sort.firstSort(tableArray,partyArray);
    [tableArray,partyArray] = sort.secondSort(tableArray,partyArray);
    // [tableArray,partyArray] = sort.thirdSort(tableArray,partyArray);
    
    
    // displaying output to the console based on whether all guests were seated or not
    if (partyArray.map((party)=>party.seated).includes(false)===true) {
        const sorted = false
        io.outputSeating(tableArray,partyArray,sorted)
    } else {
        io.outputSeating(tableArray,partyArray)
    }
    
    

    return 'sort done';
}

sortTables(tableArr,partyArr)