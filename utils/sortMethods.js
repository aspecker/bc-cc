
// function sorts party array into just those with dislikes and orders them by number of dislikes
const sortByDislikes = parties => {
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

// sorts table or party array by size, largest to smallest
const sortBySize = parties => {
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

// function used to change object values based to reflect parties being seated at tables
function seatGuests(tables,parties,i,j) {
  tables[i].parties.push(parties[j]);
  parties[j].seated=true;
  tables[i].seated += parties[j].size;
  if (parties[j].dislikes!=='none') parties[j].dislikes.forEach((dislike)=>tables[i].dontseat.push(dislike))
}

// the first sort places the parties with dislikes into unique arrays
const firstSort = (tablesArray,dislikersArray) =>{
  const tables = tablesArray;
  const dislikers = dislikersArray;
  
  for (let i = 0; i<tables.length;i+=1){
    for (let j=0;j<dislikers.length;j+=1){
      if (tables[i].parties.length<1 
        && dislikers[j].size<=tables[i].size 
        && dislikers[j].seated===false 
      ){
        seatGuests(tables,dislikers,i,j)
      }
    }
  }
  return [tables,dislikers]
}

// randomized matching after initial two sorts are conducted
// iterated repeatedly to try and find a match
// counter variable attempts to place a party at each table in sequence if possible
const secondSort = (tablesArray, partiesArray) => {
  const tables = tablesArray;
  const parties = partiesArray;
  let counter = 0;
  let escaped=0;
  while (parties.map((party)=>party.seated).includes(false)===true&&escaped<200){
  for (let i = 0; i < tables.length; i += 1) {
    counter = 0;
    const j = Math.floor(Math.random()*parties.length) 
      if (tables[i].seated + parties[j].size <= tables[i].size
        && parties[j].seated === false
        && tables[i].dontseat.includes(parties[j].name) === false
        && counter <1
      ) {
        seatGuests(tables,parties,i,j)
      }
    }
  
  escaped +=1;
  }
  return [tables, parties]
}

// wrapper sort function to contain all the other sort methods
exports.runSorts = (tables,parties,loopCount) => {
    let tableArray = tables;
    let partyArray = parties;
    let loops = loopCount;

    // first the table array is sorted largest to smallest
    tableArray = sortBySize(tableArray);
    console.log(tableArray)

    // seperate party array into ones with dislikes and not
    const likers = sortBySize(partyArray).filter(party=>party.dislikes==='none');
    let dislikers = sortByDislikes(partyArray);

    // perform the initial sort with just dislikers to reduce seating conflicts, spreading them into different tables
    [tableArray, dislikers] = firstSort(tableArray,dislikers);

    // rejoin original full array and sort by size
    partyArray = [...dislikers,...likers];
    partyArray = sortBySize(partyArray);

    // runs first sort again to ensure no empty tables
    [tableArray,partyArray] = firstSort(tableArray,partyArray);
    // runs the second sorting algorithm which attempts to find matching sort through randomized iteration
    [tableArray,partyArray] = secondSort(tableArray,partyArray);
    
    // counter
    loops+=1
    return [tableArray,partyArray,loops]

}