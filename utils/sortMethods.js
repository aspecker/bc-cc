
exports.sortByDislikes = parties => {
    const dislikers = parties.filter(party=>party.dislikes!=='none');
    function compare(a,b) {
        if (a.dislikes.length < b.dislikes.length)
          return 1;
        if (a.dislikes.length > b.dislikes.length)
          return -1;
        return 0;
      }
      
      return dislikers.sort(compare);
}

exports.firstSort = (tablesArray,dislikersArray) =>{
  let tables = tablesArray;
  let dislikers = dislikersArray;
  for (let i = 0; i<tables.length;i+=1){
    for (let j=0;j<dislikers.length;j+=1){
      if (tables[i].parties.length<1 
        && dislikers[j].size<=tables[i].size 
        && dislikers[j].seated===false
        
      ){
        tables[i].parties.push(dislikers[j]);
        dislikers[j].seated=true;
        tables[i].seated += dislikers[j].size;
        dislikers[j].dislikes.forEach((dislike)=>tables[i].dontseat.push(dislike))
      }
    }
  }
  return [tables,dislikers]
}

exports.secondSort = (tablesArray,partiesArray) =>{
  let tables = tablesArray;
  let parties = partiesArray;
  while (parties.map((party)=>party.seated).includes(false)===true){
    for (let i = 0; i<tables.length;i+=1){
      for (let j=0;j<parties.length;j+=1){
        if (tables[i].seated+parties[j].size<=tables[i].size
          && parties[j].seated===false
          && tables[i].dontseat.includes(parties[j].name)===false){
            tables[i].parties.push(parties[j]);
            parties[j].seated=true;
            tables[i].seated += parties[j].size;
            if (parties[j].dislikes !=='none') parties[j].dislikes.forEach((dislike)=>tables[i].dontseat.push(dislike))
          }
        }
      }
    }
      return [tables,parties]
    }