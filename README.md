# BC-CC 

## Instructions
* requires node.js and npm
* install fs package for reading the .txt file
* place any new inputs into inputs directory
* to change data input, changed the path of fs.readFileSync on line 3
* navigate to directory in terminal
* run node weddingSort.js

## Assumptions
* input is in format of 
```
tables: A-{int} B-{int} C-{int} D-{int} etc.
{PartyName}, party of {size} dislikes {Enemy1}, {Enemy 2}, etc.
{PartyName2}, party of {size}
etc.
```
* no trailing spaces follow the last entry on any line
*  line return of text input must be LF.
    * if a different carriage return symbol is used (comment in console.log on line 4 to check)
    * please change the .split argument on line 9 and 25 to the appropriate characters
* dislikes mean a party outright refuses to sit with the disliked party
    * the program would rather leave a party unplaced than place two disliked together

