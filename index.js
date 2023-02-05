require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const PhonebookEntry = require('./models/phonebookEntry');


const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method);
    console.log('Path: ', request.path);
    console.log('Body: ', request.body);
    console.log('--------------------');
    next();
};

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(express.static('build'));

//-------------------------------------------------------------------

app.get('/api/phonebook', (request, response, next) => {
    PhonebookEntry
        .find({})
        .then(allPhonebookEntries => response.json(allPhonebookEntries))
        .catch(error => next(error));
});

app.get('/api/phonebook/:phoneNumber', (request, response) => {
    const phoneNumber = request.params.phoneNumber;
    PhonebookEntry
        .findOne({ phoneNumber, })
        .then(entry => {
            if (entry) {
                response.json(entry);
            } else {
                response.status(404).end();
            };
        })
        .catch(error => next(error));
});

app.post('/api/phonebook', (request, response, next) => {
    const body = request.body;
    if (!body.name || !body.phoneNumber) {
        response.status(400).json({ error: 'missing name or phoneNumber' });
    } else {
        const newEntry = new PhonebookEntry({
            name: body.name,
            phoneNumber: body.phoneNumber
        });
        newEntry
            .save()
            .then(savedEntry => response.json(savedEntry))
            .catch(error => next(error));
    };
});

app.delete('/api/phonebook/:phoneNumber', (request, response) => {
    const phoneNumber = request.params.phoneNumber;
    PhonebookEntry
        .findOneAndRemove({ phoneNumber, })
        .then(result => {
            if (result) {
                response.status(200).send(phoneNumber)
            } else {
                response.status(404).end();
            };
        });
});

//-------------------------------------------------------------------

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.error(error.message);
    response.status(400).send({ error: 'malformatted id (phone number)'});
    next(error);
};
app.use(errorHandler);


//################## run server ##################

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Starting server on port ${PORT}...`);
});