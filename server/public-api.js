/**
 * Created by Pencroff on 10-Sep-15.
 */

var express = require('express');
var publicApi = express.Router();

module.exports = publicApi;

publicApi.get('/json', function (req, res) {
    return res.status(200).json({ message: 'Public Api - JSON' });
});
