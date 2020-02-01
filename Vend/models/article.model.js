const mongoose = require('mongoose');
var articleSchema = new mongoose.Schema({
    description: {
        type: String,
        required: 'This field is required'
    },
    model: {
        type: String,
    },
    price: {
        type: String,
        required: 'This field is required'
    },
    stock: {
        type: String,
        required: 'This field is required'
    },

});

mongoose.model('Article', articleSchema);