/**
 * Created by Pencroff on 13-Sep-15.
 */

var express = require('express');
var authApi = express.Router();

var tokenManager = require('./auth-manager');

module.exports = authApi;

authApi.post('/login', function (req, res) {
    tokenManager
        .loginUser(req.body)
        .then(function(msg) {
            return res.status(200).json(msg);
        })
        .catch(function(err) {
            return res.status(403).json(err);
        });
});

authApi.use(tokenManager.middleware);

authApi.post('/logout', function (req, res) {
    tokenManager
        .logoutUser(req.tokenInfo)
        .then(function(msg) {
            return res.status(200).json(msg);
        });
});

authApi.post('/verify', function (req, res) {
    return res.status(200).send(req.tokenInfo);
});