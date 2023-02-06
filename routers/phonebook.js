const phonebookRouter = require('express').Router();
const PhonebookEntry = require('../models/phonebookEntry');


phonebookRouter.get('/', (request, response, next) => {
    PhonebookEntry
        .find({})
        .then(allPhonebookEntries => response.json(allPhonebookEntries))
        .catch(error => next(error));
});

phonebookRouter.get('/:phoneNumber', (request, response) => {
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

phonebookRouter.post('/', (request, response, next) => {
    const { name, phoneNumber } = request.body;
    if (!name || !phoneNumber) {
        return response.status(400).json({ error: 'missing name or phoneNumber' });
    };
    if ((phoneNumber.charAt(3) !== '-') || (phoneNumber.charAt(7) !== '-')) {
        return response.status(400).json({ error: 'malformatted phonenumber'});
    };
    const newEntry = new PhonebookEntry({
        name,
        phoneNumber
    });
    newEntry
        .save()
        .then(savedEntry => response.json(savedEntry))
        .catch(error => next(error));
});

phonebookRouter.delete('/:phoneNumber', (request, response) => {
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

module.exports = phonebookRouter;