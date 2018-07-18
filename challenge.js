const fs = require('fs');

const input = fs.readFileSync('./inputs/simple.txt','utf8')
// console.log(input)

// sorts party data into iteratable format
const partyArr = input
    .trim()
    .split('\r\n')
    .map(line=>line.split(' '))
    .filter(line=>line.includes('party'))
    .reduce((parties,line)=>{
        parties.push({
            name: line[0].slice(0,-1),
            size: parseInt(line[3],10),
            dislikes: line[4]==='dislikes'? line.slice(5,line.length) : 'none',
            seated: false
        })
        return parties
    },[])

// sorts table data into letter id and size
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
const addSeats = (array) =>{
    return array.reduce((sum,item)=>{
        sum += item.size;
        return sum;
    },0)
}
    
// function determines if there are enough seats for each guest, and returns false if not
const checkSeatingAmount = (tables,parties) => {
    const seatCount = addSeats(tables);
    const guestCount = addSeats(parties);
    // console.log(seatCount,guestCount)
    if (guestCount>seatCount){
        return false;
    } 
    return true;
}

const sortTables = (tables, parties) => {
    // console.log(tables)
    // console.log(parties)
    if (checkSeatingAmount(tables,parties)===false){
        return console.log(`There are not enough seats for every guest.`)
    }
    const partySort = parties;
    const tableSort= tables;
    
    for (let i=0; i <tableSort.length;i+=1){
        for (let j=0; j <partySort.length; j+=1){
            if (tableSort[i].size===partySort[j].size && partySort[j].seated===false){
                partySort[j].seated=true;
                tableSort[i].seated += partySort[j].size;
                tableSort[i].parties.push(partySort[j].name)
            }
        }
    }






    return console.log(partySort, tableSort)
}


sortTables(tableArr,partyArr)