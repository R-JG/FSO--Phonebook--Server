const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { MONGO_URI } = require('./utils/config');
const { infoLog, errorLog } = require('./utils/logger');
const middleware = require('./utils/middleware');
const phonebookRouter = require('./routers/phonebook');
const app = express();


infoLog(`connecting to MongoDB at: ${MONGO_URI}...`);
mongoose.set('strictQuery', false);
mongoose
    .connect(MONGO_URI)
    .then(() => infoLog('connected to MongoDB'))
    .catch(error => errorLog('error connecting to MongoDB: ', error.message)
);


app.use(cors());
app.use(middleware.requestLogger);
app.use(express.static('build'));
app.use(express.json());

app.use('/api/phonebook', phonebookRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;