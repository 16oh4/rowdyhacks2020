

const sucJSON = (message, data) => {
    return JSON.stringify({
        message,
        data
    })
}

exports.helloWorld = (req, res) => {
    console.log('helloworld!');
    return res.status(200).send(sucJSON('Hello world!', {value: 'something'}));
}