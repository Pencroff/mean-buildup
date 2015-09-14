/**
 * Created by Pencroff on 14-Sep-15.
 */

var uow = require('./data-uow');

exports.querySerializer = querySerializerFn;

exports.repoNameParser = repoNameParserFn;

function querySerializerFn(req, res, next) {
    var queryObj = {},
        keys = Object.keys(req.query),
        len = keys.length,
        str, i, obj;
    for (i = 0; i < len; i += 1) {
        str = req.query[keys[i]];
        try {
            obj = JSON.parse(str);
            queryObj[keys[i]] = obj;
        } catch(err) { }
    }
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
};