const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const app = express();
// store config variables in dotenv
require('dotenv').config();
schema = require('./schema/mongoDBSchema'); // uncomment this for MONGODB
//schema = require('./schema/mysqlDBSchema'); // uncomment this for MYSQL // MYSQL version is not WORKING yet, will update in near future release v1.1.9

// ****** Set up default mongoose connection START ****** //
const mongoose = require('mongoose');
var mongoDB = process.env.mongoDBMLABURL; // cloud hosted MongoDB
//var mongoDB = process.env.mongoDBLocalURL; // locally hosted MongoDB
mongoose.connect(mongoDB);

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => {
    console.log('conneted to MONGODB- ElishERP database');
});
// ****** Set up default mongoose connection END ****** //

// ****** allow cross-origin requests code START ****** //
//app.use(cors()); // uncomment this to enable all CORS and delete cors(corsOptions) in below code
var allowedOrigins = process.env.allowedOrigins.split(',');
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
// ****** allow cross-origin requests code END ****** //

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: false
}));
app.use('/alivetracking', graphqlHTTP({
    schema,
    graphiql: false
}));
app.use('/', (req, res) => res.send("Welcome ElishERP User"));
app.listen(process.env.PORT, () => console.log('Elish Enterprise Server is ready on localhost:' + process.env.GRAPHQLPORT));
