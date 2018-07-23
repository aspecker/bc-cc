const fs = require('fs');

const io = require('./utils/inputOutput.js')
const seats = require('./utils/seatCount.js')
const sort = require ('./utils/sortMethods.js')

const input = fs.readFileSync('./inputs/test1.txt','utf8')
// console.log(input)

// make calls to input processing methods
const partyArr = io.processParties(input);
const tableArr = io.processTables(input);

// function to check if any existing seated parties at a table conflict with the party to be added
const checkDislikes = (table, party) => {
    // console.log(table.parties)
    // console.log(`${table.id} satparties: ${table.parties}`)
    // console.log(`${table.id} dontseat: ${table.dontseat}`)
    // console.log(`${party.name} dislikes${party.dislikes}`)
    // console.log(`table ${table.id} ${table.dontseat} name ${party.name} pd ${party.dislikes[0]}`)

    if (party.dislikes==='none'&&table.dontseat.includes(party.name)===false){
        return true
    } 
    else if (table.dontseat.includes(party.name)===true) {
        return false
    } 
    // else if (crossCompare(table.parties,party.dislikes)){
    //     return false
    // }
    // else if (table.dontseat.includes(party.dislikes[0])===true){
    else if (party.dislikes.map((dislike=>table.parties.every(seated=>seated!==dislike))).includes(false)){
        // console.log(`table ${table.id}  dontseat${table.dontseat}`)
        // console.log(`table ${table.id} 
        // ds ${table.dontseat}
        // parties ${table.parties}  
        // name ${party.name} 
        // pd ${party.dislikes[0]}`)
        return false
    }

    return true
}

// function to place the guest and alter fields accordingly
const seatGuest = (table,party) => {
    // console.log(`party: ${Object.keys(party)}`)
    // console.log(`table: ${Object.keys(table)}`)
    if (party.dislikes!=='none') {
        // console.log(table.dontseat)
        party.dislikes.forEach((dislike)=>table.dontseat.push(dislike))
        if (!table.dontseat.includes(party.name)) table.dontseat.push(party.name)
    }
    party.seated=true;
    table.seated += party.size;
    table.parties.push(party)
}

// function to sort guests into seating assignments
const sortGuests = (tables,parties) => {
    let tableSort = tables;
    let partySort = parties;
    let escapeLoop = 0;
    // while loop runs until all parties are seated, or until a certain number of iterations
    while (partySort.map(party=>party.seated).includes(false)){

        tableSort.forEach((table)=>{
            partySort.forEach((party)=>{
                // checks to make sure seating won't exceed table size, that the targetted party is not already seated
                // also checks to make sure no dislike conflicts
                // console.log(table.parties)
                if (checkDislikes(table,party)===true){
                    seatGuest(table,party)
                } 
            })

        })
    }
    // boolean here to indicate that while loop did not run to completion, so all guests are successfully sat
     return [tableSort,partySort,false]
}


// core function to sort 
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
    let tableArray;
    let partyArray;
    let escaped

    const likers = parties.filter(party=>party.dislikes==='none')
    let dislikers = sort.sortByDislikes(parties);
    // console.log(dislikers)
    // tableArray = 
    [tableArray, dislikers] = sort.firstSort(tables,dislikers);
    partyArray = [...dislikers,...likers];
    [tableArray,partyArray] = sort.secondSort(tableArray,partyArray)
    
    
    // [tableArray, partyArray,escaped] = sortGuests(tables,parties);
    
    // displaying output to the console
    io.outputSeating(tableArray,partyArray,escaped)

    // console.log(tableArray)
    // console.log(partyArray)
    // console.log(tableArray[0].parties)
    return 'sort done';
}

sortTables(tableArr,partyArr)