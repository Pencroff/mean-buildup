/**
 * Created by Pencroff on 08-Sep-15.
 */

/*global module: true, exports: true */

exports.server = {
    port: 8070,
    tokenSecret: 'bla-bla-bla',
    user: {
        name: 'Brad Pitt',
        login: 'brad-pitt',
        password: 'magic-password',
        logged: true
    },
    mongoConf: {
        login: 'user',
        password: 'password',
        server: 'db.mongolab.com',
        port: '27072',
        dbName: 'angular-buildup'
    },
    mongoUri: {
        $ref: 'server.mongoConf',
        $tmpl: 'mongodb://{login}:{password}@{server}:{port}/{dbName}'
    }
};