const fs = require('fs');

const input = fs.readFileSync('./inputs/test.txt','utf8')
// console.log(input)

// proccesses party data into sortable format
const partyArr = input
    .trim()
    .split('\r\n')
    .map(line=>line.split(' '))
    .filter(line=>line.includes('party'))
    .reduce((parties,line)=>{
        parties.push({
            name: line[0].slice(0,-1),
            size: parseInt(line[3],10),
            dislikes: line[4]===('dislikes'||'Dislikes')? line.slice(5,line.length).map(dislike=>dislike.replace(',','')) : 'none',
            seated: false
        })
        return parties
    },[])

// proccesses table data into sortable format and assigns
const tableArr = input
    .trim()
    .split('\r\n')
    [0].split(' ')
    .reduce((tables,item)=>{
        if (item!=='tables:'){
            tables.push({
                id: item.substring(0,1),
                size: parseInt(item.substring(2),10),
                seated: 0,
                parties: []
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
    const partyString = table.parties.reduce((string,family)=>{
       string += family
       return string;
    }, '')
    for (let i=0; i<party.dislikes.length;i+=1){
        if (partyString.includes(party.dislikes[i])){
            return false
        } 
        
    }
    return true;
}

// function to sort guests into seating assignments
const sortGuests = (tables,parties) => {
    const tableSort = tables;
    const partySort = parties;
    console.log(tableSort.length,partySort.length)
    let escapeLoop =0;
    // while loop runs until all parties are seated, or until 10 iterations
    while (partySort.map(party=>party.seated).includes(false)){
        if (escapeLoop >10){
            // boolean here to determine if the while loop ran to completion for error handling below
            return [tableSort,partySort,true]
        }
        for (let i=0; i <tableSort.length;i+=1){
            for (let j=0; j <partySort.length; j+=1){
                // checks to make sure seating won't exceed table size, that the targetted party is not already seated
                // also checks to make sure no disliked
                 if (tableSort[i].seated+partySort[j].size<=tableSort[i].size 
                    && partySort[j].seated===false 
                    && checkDislikes(tableSort[i],partySort[j])===true
                    ){
                    partySort[j].seated=true;
                    tableSort[i].seated += partySort[j].size;
                    tableSort[i].parties.push(`${partySort[j].name}(${partySort[j].size})`)
                } 
            }

        }
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
    tableArray.map(table=>console.log(`    Table ${table.id} (${table.seated}/${table.size} seats filled) is seating ${table.parties.join(', ')}`))

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
    // console.log(tableArray)
    
    // console.log(partyArray)
    
    

    return 'sort done';
}

sortTables(tableArr,partyArr)