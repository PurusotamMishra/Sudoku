// index.js

const readline = require('readline');
const validateQuery = require('./validateQuery');

// Create an interface for input and output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to prompt user and validate query
function promptUserForQuery() {
    rl.question('Please enter your SQL query: ', (query) => {
        const result = validateQuery(query);
        console.log(result.message);
        rl.close();
    });
}

// Start the prompt
promptUserForQuery();
