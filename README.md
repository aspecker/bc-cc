# BC-CC 

## Instructions
* requires node.js 
* place any new inputs into inputs directory, or use existing inputs
* to change data input, changed the path of fs.readFileSync on line 7 of weddingSort.js
* navigate to directory in terminal
* run `node weddingSort.js` or `npm start`

## Assumptions
* input is in format of 
```
tables: A-{int} B-{int} C-{int} D-{int} etc.
{PartyName}, party of {size} dislikes {Enemy1}, {Enemy 2}, etc.
{PartyName2}, party of {size}
etc.
```
* no trailing spaces follow the last entry on any line

* that .txt files are CRLF line endings, not LF
    * if LF is default, please change the .split argument on line 9 and 25 to the appropriate characters(`\n`) over (`\r\n`) instead 

* dislikes mean a party outright refuses to sit with the disliked party
    * the program would rather leave a party unplaced than place two disliked together

* certain extreme data relationships can break the model and prevent proper sorting
    * table sizes, party configurations and attitudes were assumed to be reasonable for the environment

### Design
* process input into arrays of objects holding identifying information as well as sorting data
* check for edge cases
* run sort algorithm many times or until successful sort
    * first sort - place parties with most dislikes across as many tables as possible
    * second sort - fills any remaining empty tables with the largest remaining parties
    * third sort - randomized iteration to fill remaining spots 

