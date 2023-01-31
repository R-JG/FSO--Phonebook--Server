const phonebookData = [
    { 
      "name": "Arto Hellas", 
      "phoneNumber": "040-123-0456"
    },
    { 
      "name": "Ada Lovelace", 
      "phoneNumber": "395-443-3523"
    },
    { 
      "name": "Dan Abramov", 
      "phoneNumber": "122-433-4345"
    },
    { 
      "name": "Mary Poppendieck", 
      "phoneNumber": "396-234-3122"
    }
];
//################################################

const express = require('express');
const app = express();

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>');
});

app.get('/api/phonebook', (request, response) => {
    response.send(phonebookData);
});



//################## run server ##################
const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Starting server on port ${PORT}...`);
});