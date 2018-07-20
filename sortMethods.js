const fs = require('fs');

const io = require('./utils/inputOutput.js')

const input = fs.readFileSync('./inputs/test2.txt','utf8')
// console.log(input)

// make calls to input processing methods
const partyArr = io.processParties(input);
const tableArr = io.processTables(input);

function seatGuest(table, party){
    party.
}

function checkConflict(table, party){
    if (party.dislikes==='none' && !table.dontseat.includes(party.name)){
        return true
    } else if (party.dislikes)
}



function sortGuests (tables,parties){
    
}
