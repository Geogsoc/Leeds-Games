Project Title - NCGAME 2021

This application allows the access of data in a database of game reviews and will support the end users to post a review of a game and share their experiences of how they found it. Fellow users can gain access to the reviews and sort by various ways such as date and title and can filter by category type. If the current user also has an opinion on the review they can post a comment linked to the review and vote for it as a quality game. In turn votes can be made for the comment to show agreement (or disagreement) with the comment by other users.

If you would like to try it out for yourself here is a link to the hosted version and details of each available endpoint.

https://ncgame2021.herokuapp.com/api

To clone the project please click the green code tab and click the copy symbol.
Open a terminal and type git clone and paste the URL you have just copied and press enter.

The dependencies required for this project are dotenv, express, pg and p-gformat. They can be installed via the following terminal command.

npm install dotenv express pg pg-format

The project requires two .env files to switch between the test and the development data.

1. env.development with PGDATABASE=nc_games written inside
2. env.test with PGDATABASE=nc_games_test written inside

The following minimum version requirements are needed:
Node.js 7.16.0 and Postgres 8.7.1

To setup the database the following script can be run npm setup-dbs

The endpoints of the project can be tested with the following script npm test
