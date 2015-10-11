/**
 * Created by Pencroff on 10-Sep-15.
 */

var express = require('express');
var protectedApi = express.Router();
var tokenManager = require('./auth-manager');

var tools = require('./middleware-tools');

module.exports = protectedApi;

protectedApi.use(tokenManager.middleware);

protectedApi.use(tools.querySerializer);


protectedApi.get('/json', function (req, res) {
    return res.status(200).json({ message: 'Protected Api - JSON' });
});

protectedApi.param('repo', tools.repoNameParser);

// get list should support query
protectedApi.get('/:repo', function (req, res) {
    req.repo
        .findAll(req.queryObj)
        .then(function(result) {
            console.log('Get list - then', req.repo.name);
            res.status(200).json({
                success: true,
                data: result
            });
        })
        .catch(function(err) {
            tools.processError(err, res);
        });
});

// get item
protectedApi.get('/:repo/:id', function (req, res) {
    req.repo.find(req.params.id)
        .then(function(result) {
            res.status(200).json({
                success: true,
                data: result
            });
        })
        .catch(function(err) {
            tools.processError(err, res);
        });
});

// create item
protectedApi.post('/:repo', function (req, res) {
    req.repo.create(req.body)
        .then(function(result) {
            res.status(200).json({
                success: true,
                data: result
            });
        })
        .catch(function(err) {
            tools.processError(err, res);
        });
});

// update item
protectedApi.put('/:repo/:id', function (req, res) {
    req.repo.update(req.params.id, req.body)
        .then(function(result) {
            res.status(200).json({
                success: true,
                data: result
            });
        })
        .catch(function(err) {
            tools.processError(err, res);
        });
});

// delete item
protectedApi.delete('/:repo/:id', function (req, res) {
    req.repo.destroy(req.params.id)
        .then(function() {
            res.status(200).json({
                success: true,
                destroyed: req.params.id
            });
        })
        .catch(function(err) {
            tools.processError(err, res);
        });
});