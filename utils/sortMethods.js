
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

exports.firstSort = (tables,dislikers) =>{
  tables.forEach((table)=>{
    dislikers.forEach((disliker)=>{
      if (table.parties===[]
          && disliker.size<=table.size
          && disliker.seated===false
          ){
            table.parties.push(disliker.name)
            console.log(disliker.name)
          }
    })
  })
  return (tables,dislikers)
}