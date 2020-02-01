const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Sales = mongoose.model('Sales');
const Customer = mongoose.model('Customer');

router.get('/', (req, res) => {
    res.render("sales/add", {
        viewTitle: "Insert Sale"
    });
});

// router.post('/sales', (req, res) => {
//     Sales.insertOne(req.body, (err, result) => {
//         if(err)
//             console.log();
//         else{
//             res.json({result : result, document : result.ops[0]})
//         }
//     });
// });

// router.post('/', (req, res) =>{
//         insertSale(req, res);
// });

// app.post('/sale', (req, res) =>{
//     const sales = new Sales({
//         customer: req.body.customerID,
//         total: req.body.total,
//         date: req.body.date,
//     });
//     sales.save().then(result =>{
//         console.log(result);
//         res.status(201).json(result);
//     }).catch(err =>{
//         console.log(err);
//         res.status(5000).json({
//             error: err
//         });
//     });
    
// });

router.post('/', (req, res) =>{
    const sales = new Sales({
        customer: req.body.customer,
        customername: req.body.customername,
        total: req.body.total,
        date: req.body.date,
    })
    sales.save().then(result =>{
        console.log(result);
        res.status(201).json(result);
    }).catch(err =>{
        console.log(err);
        res.status(5000).json({
            error: err
        })
    })  
})

// function insertSale(req, res){
//     var sales = new Sales();
//     sales._id = mongoose.Types.ObjectId();
//     Sales.customer = req.body.customer;
//     sales.total = req.body.total;
//     sales.date = req.body.date;
//     sales.save((err,doc) =>{
//         if (!err)
//             res.redirect('sales/list');
//         else {
//             if (err.name == 'ValidationError'){
//                 handleValidationError(err, req.body);
//                 res.render("sales/add", {
//                     viewTitle: "Insert sale",
//                     sales: req.body
//                 });
//             }
//             else
//             console.log("Error during record insertion : " + err);
//         }
//     });

// }

router.get('/list', (req, res) => {
    Sales.find((err, docs) => {
       if (!err) {
           res.render("sales/list", {
               list: docs
           });
       }
       else {
           console.log('error in retrieving Article list :' + err);
       }
   });
});





// function handleValidationError(err,body){
//     for(field in err.errors)
//     {
//         switch (err.errors[field].path){
//             case 'description':
//                 body['descriptionError'] = err.errors[field].message;
//                 break;
//             case 'price':
//                 body['priceError'] = err.errors[field].message;
//                 break;
//             case 'stock':
//                 body['stockError'] = err.errors[field].message;
//                 break;           
//         }
//     }
// }

// function UpdateSale(req, res){
//     Sales.findOneAndUpdate({ _id: req.body._id}, req.body, { new: true}, (err,doc) =>{
//         if (!err) { res.redirect('sales/list');}
//         else{
//             if(err.name == 'validationError'){
//                 handleValidationError(err, req.body);
//                 res.render("sales/add", {
//                     viewTitle: 'Update Sale',
//                     sales: req.body
//                 });
//             }
//             else
//                 console.log('Error during record update: ' + err);
//         }
//     });
// }

// Update Customer
router.get('/:id', (req, res) => {
    Sales.findById(req.params.id, (err, doc) => {
        if(!err){
            res.render("sales/add", {
                viewTitle: "Update Sale",
                sales: doc
            });
        }
    });
});

// see Customer
// router.get('/see/:id', (req, res) => {
//     Article.findById(req.params.id, (err, doc) => {
//         if(!err){
//             res.render("sale/see", {
//                 viewTitle: "view Article",
//                 article: doc
//             });
//         }
//     });
// });

// Delete Customer
router.get('/delete/:id', (req, res) => {
    Sales.findByIdAndDelete(req.params.id, (err, doc) =>{
        if(!err){
            res.redirect('/sales/list');
        }
        else{ console.log('Error in article delete:' + err);}
    });
});




module.exports = router;