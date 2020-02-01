const mongoose = require('mongoose');

var customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required'
    },
    lastnameone: {
        type: String,
        required: 'This field is required'
    },
    lastnametwo: {
        type: String,
        required: 'This field is required'
    },
    rfc: {
        type: String,
        required: 'This field is required'
    },

});

mongoose.model('Customer', customerSchema);