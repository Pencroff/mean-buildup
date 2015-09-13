/**
 * Created by Pencroff on 10-Sep-15.
 */

var conf = require('kea-config');
var Promise = require('bluebird');
var jwt = require('jsonwebtoken');

exports.middleware = middlewareFn;

exports.loginUser = loginUserFn;
exports.logoutUser = logoutUserFn;
exports.verifyToken = verifyTokenFn;

function middlewareFn(req, res, next) {
    var token = req.body.token || req.params.token || req.headers['x-access-token'];
    verifyTokenFn(token)
        .then(function(tokenInfo) {
            req.tokenInfo = tokenInfo;
            next();
        })
        .catch(function(err) {
            return res.status(403).json(err);
        });
}

function loginUserFn(loginData) {
    var user = conf.get('server.user');
    return new Promise(function(resolve, reject) {
        if (user.login === loginData.login &&
            user.password === loginData.password) {
            delete user.password;
            return signTokenFn(user)
                .then(function(token) {
                    conf.set('server.user.logged', true);
                    resolve({
                        name: user.name,
                        login: user.login,
                        token: token
                    });
                });
        } else {
            reject({
                msg: 'Access denied.'
            })
        }
    });
}

function logoutUserFn(tokenInfo) {
    return new Promise(function(resolve, reject) {
        conf.set('server.user.logged', false);
        resolve({
            msg: 'User logged out'
        })
    });
}

function signTokenFn(data) {
    var tokenSecret = conf.get('server.tokenSecret'),
        token;
    return new Promise(function(resolve, reject) {
        try {
            token = jwt.sign(data, tokenSecret, {
                expiresInMinutes: 1440 // expires in 24 hours
            });
            resolve(token)
        } catch (err) {
            reject(err);
        }
    });
}

function verifyTokenFn(token) {
    var tokenSecret = conf.get('server.tokenSecret'),
        user = conf.get('server.user'),
        errMsg = {
            msg: 'Token not valid'
        };
    return new Promise(function(resolve, reject) {
        if (!user.logged) {
            return reject(errMsg);
        }
        jwt.verify(token, tokenSecret, function(err, decoded) {
            if (err) {
                reject(errMsg);
            } else {
                resolve(decoded);
            }
        });
    });
}
