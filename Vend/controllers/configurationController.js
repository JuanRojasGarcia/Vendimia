const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Configuration = mongoose.model('Configuration');


router.get('/', (req, res) => {
    res.render("configuration/add", {
        viewTitle: "Configuration"
    })
});

router.post('/', (req, res) =>{
        InsertConfiguration(req, res);
});

function InsertConfiguration(req, res){
    var configuration = new Configuration();
    configuration.financerate = req.body.financerate;
    configuration.downpayment = req.body.downpayment;
    configuration.deadline = req.body.deadline;
    configuration.save((err,doc) =>{
        if (!err)
            res.redirect('/');
        else {
            if (err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("configuration/add", {
                    viewTitle: "Insert configuration",
                    configuration: req.body
                });
            }
            else
            console.log("Error during record insertion : " + err);
        }
    });

}

function DeleteConfiguration(req, res){
    Configuration.findOneAndDelete({ _id: req.body._id}, req.body, { new: true}, (err,doc) =>{
        if(err){
            console.log(err);
        }
        else{
            res.json(result)
        }
    });
}

router.get('/list', (req, res) => {
   Configuration.find((err, docs) => {
       if (!err) {
           res.render("configuration/list", {
               list: docs
           });
       }
       else {
           console.log('error in retrieving configuration list :' + err);
       }
   });
});

// Delete Customer
router.get('/delete/:id', (req, res) => {
    Configuration.findByIdAndDelete(req.params.id, (err, doc) =>{
        if(!err){
            res.redirect('/');
        }
        else{ console.log('Error in configuration delete:' + err);}
    });
});

function handleValidationError(err,body){
    for(field in err.errors)
    {
        switch (err.errors[field].path){
            case 'financerate':
                body['financerateError'] = err.errors[field].message;
                break;
            case 'downpayment':
                body['downpaymentError'] = err.errors[field].message;
                break;
            case 'deadline':
                body['deadlineError'] = err.errors[field].message;
                break;           
        }
    }
}

// function UpdateArticle(req, res){
//     Configuration.findOneAndUpdate({ _id: req.body._id}, req.body, { new: true}, (err,doc) =>{
//         if (!err) { res.redirect('configuration/list');}
//         else{
//             if(err.name == 'validationError'){
//                 handleValidationError(err, req.body);
//                 res.render("configuration/add", {
//                     viewTitle: 'Update configuration',
//                     configuration: req.body
//                 });
//             }
//             else
//                 console.log('Error during record update: ' + err);
//         }
//     });
// }

// Update Customer
// router.get('/:id', (req, res) => {
//     Configuration.findById(req.params.id, (err, doc) => {
//         if(!err){
//             res.render("configuration/add", {
//                 viewTitle: "Update configuration",
//                 configuration: doc
//             });
//         }
//     });
// });

// see Customer
// router.get('/see/:id', (req, res) => {
//     Configuration.findById(req.params.id, (err, doc) => {
//         if(!err){
//             res.render("configuration/see", {
//                 viewTitle: "view configuration",
//                 configuration: doc
//             });
//         }
//     });
// });





module.exports = router;