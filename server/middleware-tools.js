/**
 * Created by Pencroff on 14-Sep-15.
 */

var _ = require('lodash');

var uow = require('./data-uow');

exports.querySerializer = querySerializerFn;

exports.repoNameParser = repoNameParserFn;

exports.processError = processErrorFn;

function querySerializerFn(req, res, next) {
    var queryObj = {};
    _.forOwn(req.query, function(value, key) {
        if (_.isString(value)) {
            try {
                queryObj[key] = JSON.parse(value);
            } catch (err) {
                queryObj[key] = value;
            }
        } else if (_.isArray(value)) {
            queryObj[key] = _.map(value, function(item) {
                return JSON.parse(item);
            });
        }
    });
    req.queryObj = queryObj;
    next();
}

function repoNameParserFn(req, res, next, repoName) {
    var repo = uow.getRepo(repoName);
    if (repo) {
        req.repo = repo;
        req.uow = uow;
        next();
    } else {
        next(new Error('Resource ' + repoName + 'not available'));
    }
}

function processErrorFn (err, res) {
    if (err) {
        console.log(err.stack);
        res.status(500).json({
            success: false,
            msg: err.message
        });
    }
}
