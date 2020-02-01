const mongoose = require('mongoose');
var configurationSchema = new mongoose.Schema({
    financerate: {
        type: String,
        required: 'This field is required'
    },
    downpayment: {
        type: String,
        required: 'This field is required'
    },
    deadline: {
        type: String,
        required: 'This field is required'
    },
});

mongoose.model('Configuration', configurationSchema);