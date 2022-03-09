const express = require('express');
const api = require('./api');
const app = express();

module.exports = (models) => {
    app.use(express.json());
    app.use('/api', api(models));

    app.use(function(err, req, res, next) {
        console.error(err.message ? err : err.stack);
        let status = err.status || 500;
        let message = err.message || 'Something broke!';
        res.status(status).send(message);
    });

    app.listen(4000);
}
