Below are two programming problems. Choose one and only one of the problems and write a program that solves it.
Guidelines:
1.	Please use only Java. Do not use any external libraries except for unit testing libraries such as JUnit. Use Maven as your build tool.
2.	Each program should take a text file as input and output to the console. Example input is described below but your program should be able to handle any reasonable input.
3.	Include a README.md file that briefly describes your design and any assumptions you made.
4.	Treat this as if it were a professional work assignment - it does not need to be gold-plated, but we are looking for good design and quality code.
5.	We are more interested in structure and organization than in use of optimal algorithms.
6.	Zip up your completed project and email it winona.nixon@bytecubed.com - please include only source files, including pom.xml.
Problem 1: Teleportation System

You have discovered the secrets of teleportation and have several teleportation routes up and running. Each route
allows instantaneous travel from one city to another. All routes are two way: if you can teleport from city A
to city B, you can also teleport from city B to city A. You want to create a system to make it easier for you to
answer specific questions about your network. You should assume anyone using your network wants to travel only by teleportation.
Questions you must be able to answer:
1. What cities can I reach from city X with a maximum of N jumps?
2. Can someone get from city X to city Y?
3. Starting in city X, is it possible to travel in a loop (leave the city on one route and return on another, without traveling along the same route twice)?

Input to the program will be a list of teleportation routes, followed by a list of queries.
Example input:
Washington - Baltimore
Washington - Atlanta
Baltimore - Philadelphia
Philadelphia - New York
Los Angeles - San Francisco
San Francisco - Oakland
Los Angeles - Oakland
Seattle - New York
Seattle - Baltimore
cities from Seattle in 1 jumps
cities from Seattle in 2 jumps
can I teleport from New York to Atlanta
can I teleport from Oakland to Atlanta
loop possible from Oakland
loop possible from Washington

Example output:
cities from Seattle in 1 jumps: New York, Baltimore
cities from Seattle in 2 jumps: New York, Baltimore, Philadelphia, Washington
can I teleport from New York to Atlanta: yes
can I teleport from Oakland to Atlanta: no
loop possible from Oakland: yes
loop possible from Washington: no

Problem 2: Wedding Seating
You work for a wedding planner and are in charge of assigning seating for guests. You are given a list of tables (defined by table name - max capacity). You are also given a list of guest parties, along with the number in that party. Also noted is if a party dislikes one or more other parties. If possible, you should not seat parties at the same table with a party they dislike. If it is not possible to seat all parties at the same table, the program should return an error.
Example input:
tables: A-8 B-8 C-7 D-7
Thornton, party of 3
Garcia, party of 2
Owens, party of 6 dislikes Thornton, Taylor
Smith, party of 1 dislikes Garcia
Taylor, party of 5
Reese, party of 7
Example output:
Table A
Thornton, party of 3
Taylor, party of 5
Table B
Smith, party of 1
Owens, party of 6
Table C
Garcia, party of 2
Table D
Reese, party of 7

