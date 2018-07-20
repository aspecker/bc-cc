const fs = require('fs');

const io = require('./inputOutput.js')
const seats = require('./seatCount.js')

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
    else if (party.dislikes.map((dislike=>table.dontseat.includes(dislike))).includes(true)){
        // console.log(`table ${table.id}  dontseat${table.dontseat}`)
        console.log(`table ${table.id} 
        ds ${table.dontseat}
        parties ${table.parties}  
        name ${party.name} 
        pd ${party.dislikes[0]}`)
        return false
    }

    return true
}

// function to place the guest and alter fields accordingly
const seatGuest = (table,party) => {
    console.log(`party: ${Object.keys(party)}`)
    console.log(`table: ${Object.keys(table)}`)
    if (party.dislikes!=='none') {
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
        if (escapeLoop >30){
            // boolean here to determine if the while loop ran to completion for error handling below
            return [tableSort,partySort,true]
        }
        partySort.forEach((party)=>{
            tableSort.forEach((table)=>{
                if (table.seated===table.size || party.seated===true || table.seated+party.size>table.size){
                    return
                }
                // checks to make sure seating won't exceed table size, that the targetted party is not already seated
                // also checks to make sure no dislike conflicts
                // console.log(table.parties)
                if (checkDislikes(table,party)===true){
                    seatGuest(table,party)
                } 
            })

        })
        escapeLoop +=1
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
    // declare variables to caputre the sorted table array, guest array
    // escaped variable is used to tell whether the sort was finished or not, by 
    let escaped;
    let tableArray;
    let partyArray;
    [tableArray, partyArray,escaped] = sortGuests(tables,parties);
    
    // displaying output to the console
    io.outputSeating(tableArray,partyArray,escaped)

    console.log(tableArray)
    // console.log(partyArray)
    // console.log(tableArray[0].parties)
    return 'sort done';
}

sortTables(tableArr,partyArr)