/**
 * Created by Pencroff on 13-Sep-15.
 */

var conf = require('kea-config');
var dbUri = conf.get('server.mongoUri');

var JSData = require('js-data');
var DSMongoDBAdapter = require('js-data-mongodb');

var context = new JSData.DS({
    keepChangeHistory: false,
    resetHistoryOnInject: false,
    cacheResponse: false,
    ignoreMissing: true,
    upsert: false,
    bypassCache: true,
    findInverseLinks: false,
    findHasMany: false,
    findBelongsTo: false,
    findHasOne: false,
    notify: false,
    log: false
});
var adapter = new DSMongoDBAdapter(dbUri);

// "store" will now use the MongoDB adapter for all async operations
context.registerAdapter('mongodb', adapter, { default: true });

var repoCache = {};

module.exports = {
    context: context,
    getRepo: getRepoFn,
    utils: context.utils
};

repoCache.room = context.defineResource({
    name: 'room',
    idAttribute: '_id',
    table: 'rooms'
});

repoCache.booking = context.defineResource({
    name: 'booking',
    idAttribute: '_id',
    table: 'bookings'
});



function getRepoFn(name){
    return repoCache[name];
}
