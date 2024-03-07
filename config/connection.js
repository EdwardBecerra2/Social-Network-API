const mongoose = require('mongoose');

mongoose.connect(
    process.env.MongoDb_URI || 'mongodb://localhost:27017/social-network',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

module.set('debug', true);

module.exports = mongoose.connection;
