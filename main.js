const express = require('express');
const path = require('path');

/* project constants */
const SERVE_HOST = 3000;

/* the app */
const app = express();

/* routes */
app.use(require('./routes/routes'));

/* serve */
app.listen(SERVE_HOST, () => console.log("Server is running on localhost:" + SERVE_HOST));
