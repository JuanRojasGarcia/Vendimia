const mongoose = require('mongoose');
var salesSchema = new mongoose.Schema({
    customer: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Customer', require: true
    }],
    customername: [{
        type: mongoose.Schema.Types.String, ref: 'Customer', require: true
    }],
    total: {
        type: Number
    },
    date: {
        type: String
    },

});



mongoose.model('Sales', salesSchema);