const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Vend', {useNewUrlParser: true}, (err) => {
    if (!err) { console.log('Mongo Connection succeeeded.') }
    else { console.log('Error in Db Connection : ' + err)}
});



require('./customer.model');
require('./article.model');
require('./configuration.model');
require('./sales.model');

