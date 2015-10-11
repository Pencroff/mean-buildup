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
        login: 'johnny-depp',
        password: 'johnny-depp',
        server: 'ds055872.mongolab.com',
        port: '55872',
        dbName: 'angular-buildup'
    },
    mongoUri: {
        $ref: 'server.mongoConf',
        $tmpl: 'mongodb://{login}:{password}@{server}:{port}/{dbName}'
    }
};