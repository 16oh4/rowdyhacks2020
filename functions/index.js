const functions = require('firebase-functions');
const cors = require('cors');
const app = require('express')();
app.use(cors());

// https://us-central1-team1604-e68a9.cloudfunctions.net/api
// http://localhost:5001/team1604-e68a9/us-central1/api

const {
    helloWorld
} = require('./users');

app.get('/helloWorld', helloWorld);

exports.api = functions.https.onRequest(app);