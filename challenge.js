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
    

console.log(partyArr)
