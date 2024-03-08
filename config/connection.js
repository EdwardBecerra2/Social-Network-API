const mongoose = require('mongoose');

mongoose.connect( 'mongodb://localhost:27017/socialnetworkdb',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
);

module.set('debug', true);

module.exports = mongoose.connection;
