// function to check whether there are enough total seats for each guest
// returns true if there are enough seats, false if not
exports.checkSeatingAmount = (tables,parties)=>{
    function addSeats(array){ 
        const seatCount = array.reduce((sum,item)=>{
            sum += item.size;
             return sum
        },0)
        return seatCount
    }
    const seatCount = addSeats(tables);
    const guestCount = addSeats(parties);
    if (guestCount>seatCount){
        return false;
    } 
    return true;
}

// function to check whether the largest table can seat the largest party
// returns true if there are enough seats at the table for the party, false if not
exports.checkLargestTable = (tables,parties) => {
    const tableSizeArr = tables.map(x=>x.size)
    const partySizeArr = parties.map(x=>x.size)
    if (Math.max(...partySizeArr)>Math.max(...tableSizeArr)){
        return false
    }
    return true;
}