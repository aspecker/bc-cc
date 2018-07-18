const fs = require('fs');

const partyArr = fs.readFileSync('input.txt','utf8')
    .trim()
    .split('\r\n')
    .map(line=>line.split(' '))
    .filter(line=>line.includes('party'))
    .reduce((parties,line)=>{
        parties.push({
            name: line[0].slice(0,-1),
            size: parseInt(line[3],10),
            dislikes: line[4]==='dislikes'? line.slice(5,line.length) : 'none'
        })
        return parties
    },[])

const tableArr = fs.readFileSync('input.txt','utf8')
    .trim()
    .split('\r\n')
    [0].split(' ')
    .reduce((tables,item)=>{
        if (item!=='tables:'){
            tables.push({
                id: item.substring(0,1),
                size: item.substring(2)
            }) 
        }
        return tables
    }, [])
    

// console.log(partyArr)
// console.log(tableArr)

const sortTables = (tables, parties) => {
    console.log(tables,parties)
}

sortTables(tableArr,partyArr)