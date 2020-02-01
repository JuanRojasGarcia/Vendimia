const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Article = mongoose.model('Article');

router.get('/', (req, res) => {
    Article.find((err, docs) => {
        if (!err) {
            res.render("article/list", {
                list: docs
            });
        }
        else {
            console.log('error in retrieving Article list :' + err);
        }
    });
});



router.post('/', (req, res) =>{
    if(req.body._id == '')
        insertArticle(req, res);
    else
        UpdateArticle(req, res);

});

function insertArticle(req, res){
    var article = new Article();
    article.description = req.body.description;
    article.model = req.body.model;
    article.price = req.body.price;
    article.stock = req.body.stock;
    article.save((err,doc) =>{
        if (!err)
            res.redirect('/article');
        else {
            if (err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("article/addOrEdit", {
                    viewTitle: "New Article",
                    article: req.body
                });
            }
            else
            console.log("Error during record insertion : " + err);
        }
    });

}

router.get('/new', (req, res) => {
    res.render("article/addOrEdit", {
        viewTitle: "New Article"
    });
});



function handleValidationError(err,body){
    for(field in err.errors)
    {
        switch (err.errors[field].path){
            case 'description':
                body['descriptionError'] = err.errors[field].message;
                break;
            case 'price':
                body['priceError'] = err.errors[field].message;
                break;
            case 'stock':
                body['stockError'] = err.errors[field].message;
                break;           
        }
    }
}

function UpdateArticle(req, res){
    Article.findOneAndUpdate({ _id: req.body._id}, req.body, { new: true}, (err,doc) =>{
        if (!err) { res.redirect('/article');}
        else{
            if(err.name == 'validationError'){
                handleValidationError(err, req.body);
                res.render("article/addOrEdit", {
                    viewTitle: 'Update Article',
                    article: req.body
                });
            }
            else
                console.log('Error during record update: ' + err);
        }
    });
}

// Update Customer
router.get('/:id', (req, res) => {
    Article.findById(req.params.id, (err, doc) => {
        if(!err){
            res.render("article/addOrEdit", {
                viewTitle: "Update Article",
                article: doc
            });
        }
    });
});

// see Customer
router.get('/see/:id', (req, res) => {
    Article.findById(req.params.id, (err, doc) => {
        if(!err){
            res.render("article/see", {
                viewTitle: "view Article",
                article: doc
            });
        }
    });
});

// Delete Customer
router.get('/delete/:id', (req, res) => {
    Article.findByIdAndDelete(req.params.id, (err, doc) =>{
        if(!err){
            res.redirect('/article');
        }
        else{ console.log('Error in article delete:' + err);}
    });
});

module.exports = router;