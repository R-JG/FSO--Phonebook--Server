const mongoose = require('mongoose');

const url = process.env.MONGO_URI;

console.log(`connecting to MongoDB at: ${url}...`);

mongoose.set('strictQuery', false);

mongoose
    .connect(url)
    .then(result => console.log('connected to MongoDB'))
    .catch(error => console.log('error connecting to MongoDB: ', error.message));

const phonebookEntrySchema = new mongoose.Schema({
    name: String,
    phoneNumber: String
});

phonebookEntrySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const PhonebookEntry = mongoose.model('PhonebookEntry', phonebookEntrySchema);

module.exports = PhonebookEntry;