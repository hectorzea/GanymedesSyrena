//env
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// puerto
process.env.PORT = process.env.PORT || 3001;

//MONGODB CONNECTION
let DatabaseURL;
DatabaseURL = process.env.NODE_ENV === 'dev' ? 'mongodb://localhost:27017/sirena_db' : process.env.remoteURL
process.env.DATABASEURL = DatabaseURL;