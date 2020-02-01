const mongoose = require('mongoose');
var configurationSchema = new mongoose.Schema({
    financerate: {
        type: String
    },
    downpayment: {
        type: String
    },
    deadline: {
        type: String
    },

});

mongoose.model('Configuration', configurationSchema);