const fs = require('fs');

const input = fs.readFileSync('./inputs/input.txt','utf8')
// console.log(input)

// proccesses party data into sortable format
const partyArr = input
    .trim()
    .split('\n')
    .map(line=>line.split(' '))
    .filter(line=>line.includes('party'))
    .reduce((parties,line)=>{
        parties.push({
            name: line[0].slice(0,-1),
            size: parseInt(line[3],10),
            dislikes: line[4]===('dislikes')? line.slice(5,line.length).map(dislike=>dislike.replace(',','')) : 'none',
            seated: false
        })
        return parties
    },[])

// proccesses table data into sortable format and assigns
const tableArr = input
    .trim()
    .split('\n')
    [0].split(' ')
    .reduce((tables,item)=>{
        if (item!=='tables:'){
            tables.push({
                id: item.substring(0,1),
                size: parseInt(item.substring(2),10),
                seated: 0,
                parties: [],
                dontseat: []
            }) 
        }
        return tables
    }, [])

// function to add amount of seats in an array
function addSeats(array){ 
    const seatCount = array.reduce((sum,item)=>{
        sum += item.size;
         return sum
    },0)
    return seatCount
}
    
// function determines if there are enough seats for each guest, and returns false if not
const checkSeatingAmount = (tables,parties) => {
    const seatCount = addSeats(tables);
    const guestCount = addSeats(parties);
    if (guestCount>seatCount){
        return false;
    } 
    return true;
}

// determines if the largest table is large enough for the largest party
const checkLargestTable = (tables,parties) => {
    const tableSizeArr = tables.map(x=>x.size)
    const partySizeArr = parties.map(x=>x.size)
    if (Math.max(...partySizeArr)>Math.max(...tableSizeArr)){
        return false
    }
    return true;
}

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
    const tableSort = tables;
    const partySort = parties;
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
    if (checkSeatingAmount(tables,parties)===false){
        return console.log(`    
        The sort could not be completed because there are not enough total seats for every guest.
        Please add additional seats or tables and try again.
        `)
    } // checking if the largest table can seat the largst party
    if (checkLargestTable(tables,parties)===false){
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
    console.log('\n')
    console.log(`   Guest List: `)
    partyArray.map(party=>console.log(`    ${party.name}, party of ${party.size}. ${party.dislikes==='none'?'':`Dislikes ${party.dislikes.join(', ')}` }`))
    console.log('\n')
    console.log(`   Seating Arrangement`)
    tableArray.map(table=>console.log(`    Table ${table.id} (${table.seated}/${table.size} seats filled) is seating ${table.parties.map(party=>party.name).join(', ')}`))

    // error condition if all guests were not able to be sorted
    if (escaped===true){
        console.log('\n')
        console.log(`   We were unable to sort all of your guests due to seating preferences or table seating design. \n    Please adjust the amount of seats and/or tables.`)
        console.log(`   
    The following parties remain unseated:`)
        partyArray.filter(party=>party.seated===false).map(party=> console.log(`    ${party.name}, party of ${party.size} ${party.dislikes==='none'?'':`Dislikes ${party.dislikes.join(', ')}` }`))
    } else {
        console.log(`
        All guests seated successfully.`)
    }
    console.log(tableArray)
    // console.log(partyArray)
    // console.log(tableArray[0].parties)
    return 'sort done';
}

sortTables(tableArr,partyArr)