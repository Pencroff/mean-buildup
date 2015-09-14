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
            res.status(200).json(result);
        })
        .catch(function(err) {
            console.log(err.stack);
            res.status(500).json({
                success: false,
                msg: err.message
            });
        });
});

// get item
protectedApi.get('/:repo/:id', function (req, res) {
    req.repo.find(req.params.id)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            console.log(err.stack);
            res.status(500).json({
                success: false,
                msg: err.message
            });
        });
});

// create item
protectedApi.post('/:repo', function (req, res) {
    req.repo.create(req.body)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            console.log(err.stack);
            res.status(500).json({
                success: false,
                msg: err.message
            });
        });
});

// update item
protectedApi.put('/:repo/:id', function (req, res) {
    req.repo.update(req.params.id, req.body)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            console.log(err.stack);
            res.status(500).json({
                success: false,
                msg: err.message
            });
        });
});

// delete item
protectedApi.delete('/:repo/:id', function (req, res) {
    req.repo.destroy(req.params.id)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            console.log(err.stack);
            res.status(500).json({
                success: false,
                msg: err.message
            });
        });
});