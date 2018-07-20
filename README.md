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
* that .txt files are CRLF, not LF
    * if LF is default, please change the .split argument on line 9 and 25 to the appropriate characters(`\n`) over (`\r\n`) instead 
* dislikes mean a party outright refuses to sit with the disliked party
    * the program would rather leave a party unplaced than place two disliked together

