const mongoose = require('mongoose');

const phonebookEntrySchema = new mongoose.Schema({
    name: { 
        type: String, 
        minLength: 1, 
        required: true 
    },
    phoneNumber: { 
        type: String, 
        required: true, 
        minLength: 12,
        maxLength: 12
    }
});

phonebookEntrySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const PhonebookEntry = mongoose.model('PhonebookEntry', phonebookEntrySchema);

module.exports = PhonebookEntry;