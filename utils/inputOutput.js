// function to process the input from .txt into an array of objects
exports.processParties = (input)=>{
    const partyArr = input
        .trim()
        .split('\r\n')
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
    return partyArr
}
// function to process the input into an array of table objects
exports.processTables = (input)=> {
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
                    parties: [],
                    dontseat: []
                }) 
            }
            return tables
        }, [])
    return tableArr
}

// function to display the seating arrangement and guest list in the console
exports.outputSeating = (tableArray,partyArray,escaped) =>{
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
}
