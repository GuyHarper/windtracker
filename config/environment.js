const port = process.env.PORT || 4000;
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/angular-auth';
const secret = process.env.SECRET || 'shh';

module.exports = { port, dbURI, secret };
