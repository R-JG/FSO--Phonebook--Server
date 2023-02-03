let phonebookData = [
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

const cors = require('cors');
const express = require('express');
const app = express();

const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method);
    console.log('Path: ', request.path);
    console.log('Body: ', request.body);
    console.log('--------------------');
    next();
};

app.use(cors());
app.use(express.json());
app.use(express.static('build'));
app.use(requestLogger);

app.get('/api/phonebook', (request, response) => {
    response.send(phonebookData);
});

app.get('/api/phonebook/:phoneNumber', (request, response) => {
    const phoneNumber = request.params.phoneNumber;
    const phonebookEntry = phonebookData.find(entry => 
        entry.phoneNumber === phoneNumber
    );
    if (phonebookEntry) {
        response.json(phonebookEntry);
    } else {
        response.status(404).end();
    };
});

app.post('/api/phonebook', (request, response) => {
    const newEntry = request.body;
    if (!newEntry.name || !newEntry.phoneNumber) {
        response.status(400).json({ error: 'missing name or phoneNumber' });
    } else {
        phonebookData = phonebookData.concat(newEntry);
        response.json(newEntry);
    };
});

app.delete('/api/phonebook/:phoneNumber', (request, response) => {
    const phoneNumber = request.params.phoneNumber;
    phonebookData = phonebookData.filter(entry => 
        entry.phoneNumber !== phoneNumber
    );
    response.send(phoneNumber);
});



//################## run server ##################
const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Starting server on port ${PORT}...`);
});