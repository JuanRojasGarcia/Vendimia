const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

router.get('/', (req, res) => {
    res.render("customer/addOrEdit", {
        viewTitle: "Insert Customer"
    });
});

router.post('/', (req, res) =>{
    if(req.body._id == '')
        insertRecord(req, res);
    else
        UpdateRecord(req, res);

});





function insertRecord(req, res){
    var customer = new Customer();
    customer.name = req.body.name;
    customer.lastnameone = req.body.lastnameone;
    customer.lastnametwo = req.body.lastnametwo;
    customer.rfc = req.body.rfc;
    customer.save((err,doc) =>{
        if (!err)
            res.redirect('customer/list');
        else {
            if (err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("customer/addOrEdit", {
                    viewTitle: "Insert Customer",
                    customer: req.body
                });
            }
            else
            console.log("Error during record insertion : " + err);
        }
    });

}

router.get('/list', (req, res) => {
   Customer.find((err, docs) => {
       if (!err) {
           res.render("customer/list", {
               list: docs
           });
       }
       else {
           console.log('error in retrieving customer list :' + err);
       }
   });
});

function handleValidationError(err,body){
    for(field in err.errors)
    {
        switch (err.errors[field].path){
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
            case 'lastnameone':
                body['lastnameoneError'] = err.errors[field].message;
                break;
            case 'lastnametwo':
                body['lastnametwoError'] = err.errors[field].message;
                break;
            case 'rfc':
                body['rfcError'] = err.errors[field].message;
                break;           
        }
    }
}

function UpdateRecord(req, res){
    Customer.findOneAndUpdate({ _id: req.body._id}, req.body, { new: true}, (err,doc) =>{
        if (!err) { res.redirect('customer/list');}
        else{
            if(err.name == 'validationError'){
                handleValidationError(err, req.body);
                res.render("customer/addOrEdit", {
                    viewTitle: 'Update Customer',
                    customer: req.body
                });
            }
            else
                console.log('Error during record update: ' + err);
        }
    });
}

// Update Customer
router.get('/:id', (req, res) => {
    Customer.findById(req.params.id, (err, doc) => {
        if(!err){
            res.render("customer/addOrEdit", {
                viewTitle: "Update Customer",
                customer: doc
            });
        }
    });
});

// see Customer
router.get('/see/:id', (req, res) => {
    Customer.findById(req.params.id, (err, doc) => {
        if(!err){
            res.render("customer/see", {
                viewTitle: "view Customer",
                customer: doc
            });
        }
    });
});

// Delete Customer
router.get('/delete/:id', (req, res) => {
    Customer.findByIdAndDelete(req.params.id, (err, doc) =>{
        if(!err){
            res.redirect('/customer/list');
        }
        else{ console.log('Error in customer delete:' + err);}
    });
});

module.exports = router;