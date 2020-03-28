
const { admin, firebase } = require('./firebase');
const {parsePhoneNumber} = require('libphonenumber-js');

const sucJSON = (message, data) => {
    return JSON.stringify({
        message,
        data
    })
}

const errJSON = (error, data) => {
    return JSON.stringify({
        error,
        data
    })
}

exports.helloWorld = (req, res) => {
    console.log('helloworld!');
    return res.status(200).send(sucJSON('Hello world!', {value: 'something'}));
}

const phoneRegex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

exports.checkPhoneNumber = async (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    let parsedNum;

    if(!phoneNumber.match(phoneRegex) || !phoneNumber) {
        return res.status(400).send(errJSON('Invalid phone number', {}));
    }

    try {
        parsedNum = parsePhoneNumber(phoneNumber, 'US').number;
    }
    catch (error) {
        console.log(error)
        return res.status(400).send(errJSON('Invalid phone number', error));
    }

    console.log('Got phone number: ' + req.body);
    console.log('Got parsednum: ' + parsedNum);

    admin.auth().getUserByPhoneNumber(parsedNum)
    .then(userRecord => {
        console.log(JSON.stringify(userRecord));
        return res.status(400).send(errJSON('User already exists', error));
    })
    .catch(error => {
        // console.log(error);
        return res.status(200).send(sucJSON('User does not exist', error));
    });
}