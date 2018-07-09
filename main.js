require('dotenv').config();

const app       = require('./bootstrap/app');
const express   = require('express');
const appConfig = require('./configs/app');

// TODO: add a log system (bole)

app.listen(appConfig.express.port, (err) => {
    if (err) {
        console.log(err);
        process.exit(10);
    }

    console.log('Server is running on http://localhost:' + appConfig.express.port);
});
