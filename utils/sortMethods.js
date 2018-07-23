
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

exports.sortBySize = parties => {
  function compare(a,b) {
    if (a.size < b.size)
      return 1;
    if (a.size > b.size)
      return -1;
    return 0;
  }
  const partiesBySize = parties.sort(compare);
  return partiesBySize;
}

exports.firstSort = (tablesArray,dislikersArray) =>{
  const tables = tablesArray;
  const dislikers = dislikersArray;
  
  for (let i = 0; i<tables.length;i+=1){
    for (let j=0;j<dislikers.length;j+=1){
      if (tables[i].parties.length<1 
        && dislikers[j].size<=tables[i].size 
        && dislikers[j].seated===false 
      ){
        tables[i].parties.push(dislikers[j]);
        dislikers[j].seated=true;
        tables[i].seated += dislikers[j].size;
        if (dislikers[j].dislikes!=='none') dislikers[j].dislikes.forEach((dislike)=>tables[i].dontseat.push(dislike))
      }
    }
  }
  return [tables,dislikers]
}

exports.exactSort = (tablesArray,dislikersArray) =>{
  const tables = tablesArray;
  const dislikers = dislikersArray;
  for (let i = 0; i<tables.length;i+=1){
    for (let j=0;j<dislikers.length;j+=1){
      if (tables[i].size===dislikers[j].size 
        && dislikers[j].seated===false 
      ){
        tables[i].parties.push(dislikers[j]);
        dislikers[j].seated=true;
        tables[i].seated += dislikers[j].size;
        if (dislikers[j].dislikes!=='none') dislikers[j].dislikes.forEach((dislike)=>tables[i].dontseat.push(dislike))
      }
    }
  }
  return [tables,dislikers]
}


exports.secondSort = (tablesArray, partiesArray) => {
  const tables = tablesArray;
  const parties = partiesArray;
  let counter = 0;
  let escaped=0;
  while (parties.map((party)=>party.seated).includes(false)===true&&escaped<100){
  for (let i = 0; i < tables.length; i += 1) {
    counter = 0;
    
    let j = Math.floor(Math.random()*parties.length) 
      if (tables[i].seated + parties[j].size <= tables[i].size
        && parties[j].seated === false
        && tables[i].dontseat.includes(parties[j].name) === false
        && counter <1
      ) {
        tables[i].parties.push(parties[j]);
        parties[j].seated = true;
        tables[i].seated += parties[j].size;
        counter +=1;
        if (parties[j].dislikes !== 'none') parties[j].dislikes.forEach((dislike) => tables[i].dontseat.push(dislike))
      }
    }
  
  escaped +=1;
  }
  return [tables, parties]
}