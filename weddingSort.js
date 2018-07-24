const fs = require('fs');

const io = require('./utils/inputOutput.js')
const seats = require('./utils/seatCount.js')
const sort = require ('./utils/sortMethods.js')

const input = fs.readFileSync('./inputs/test2.txt','utf8');
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
    // declaring variables to contain sorted responses, counters and inital values
    let tableArray = tables;
    let partyArray = parties; 
    let loopCount = 0;
    const startingTables = tables;
    const startingParties = parties;

    // while loop continues until all parties are able to be seated
    while (partyArray.map((party)=>party.seated).includes(false)===true) {
        // escape condition to prevent infinite loops on certain statistically impossible inputs
        if (loopCount >2000){
        const sorted = false
        return io.outputSeating(tableArray,partyArray,sorted)
        }
            // calls main sort function inside of the while loop
            [tableArray,partyArray,loopCount] = sort.runSorts(startingTables,startingParties,loopCount)
        }

    return io.outputSeating(tableArray,partyArray);
}

// calls function to begin program
sortTables(tableArr,partyArr)