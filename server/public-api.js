/**
 * Created by Pencroff on 10-Sep-15.
 */

var express = require('express');
var publicApi = express.Router();
var tools = require('./middleware-tools');

module.exports = publicApi;

publicApi.use(tools.querySerializer);

publicApi.get('/json', function (req, res) {
    return res.status(200).json({ message: 'Public Api - JSON' });
});

publicApi.param('repo', tools.repoNameParser);

// get list should support query
publicApi.get('/:repo', function (req, res) {
    console.log(req);
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
publicApi.get('/:repo/:id', function (req, res) {
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

// create new booking
publicApi.post('/:repo', function (req, res) {
    if('booking' === req.params.repo) {
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
    } else {
        res.status(404).json({
            msg: 'API not available!'
        })
    }
});