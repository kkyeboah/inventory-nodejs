'use strict';

const Hapi = require('hapi');
const mongoose = require('mongoose');
const populate = require('./populate');

const Routes = require('./routes');

const server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3000 });

const dbUrl = process.env.MONGODB || 'mongodb://localhost/inventory-node';

server.route(Routes);
mongoose.Promise = global.Promise;

mongoose.connect(dbUrl, {}, (mongooseErr) => {
    if (mongooseErr) {
        throw mongooseErr;
    } else {
        server.start(function (err) {

            if (err) {
                throw err;
            }
            console.log(`Server running at: ${server.info.uri}`);
        });
        populate();
    }
});

