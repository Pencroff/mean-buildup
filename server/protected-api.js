/**
 * Created by Pencroff on 10-Sep-15.
 */

var express = require('express');
var protectedApi = express.Router();
var tokenManager = require('./auth-manager');

module.exports = protectedApi;

protectedApi.use(tokenManager.middleware);

protectedApi.get('/json', function (req, res) {
    return res.status(200).json({ message: 'Protected Api - JSON' });
});