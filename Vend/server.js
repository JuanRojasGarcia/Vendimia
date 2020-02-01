require('./models/db');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const customerController = require('./controllers/customerController');
const articleController = require('./controllers/articleController');
const principalController = require('./controllers/principalController');
const configurationController = require('./controllers/configurationController');
const salesController = require('./controllers/salesController');
const Sales = mongoose.model('Sales');
const Customer = mongoose.model('Customer');
const Configuration = mongoose.model('Configuration');
const Article = mongoose.model('Article');
 
var app = express();

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'hbs');

 app.listen(3000, () =>{
     console.log('Express server started at port : 3000');
 });

 app.use('/customer', customerController);
 app.use('/article', articleController);
 app.use('/', principalController);
 app.use('/configuration', configurationController);
 app.use('/sales', salesController);

 
app.get('/getSales', (req, res) => {
    Sales.find()
    .exec()
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
});



app.get('/getCustomers', (req, res) => {
    Customer.find()
    .exec()
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        }); 
    });
});

app.get('/getCustomer/:id', (req, res) => {
    Customer.findById(req.params.id, (err, doc) => {
        if(err){
            console.log(err);
            
        }
        else{
            console.log(doc);
            res.json(doc)
        }
    });
});


app.put('/sale/customerSuggestion/', (req, res) => {
    const userInput = req.body.name
    const length = userInput.length
    Customer.find({
        $expr : {
            $eq : [ 
                userInput,
                {$substr : [
                    {$concat : ["$name", " ", "$lastnameone", " ", "$lastnametwo"]},
                    0,
                    length
                    ]
                }
            ] 
        } 
    })
    .then(docs =>{
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});




app.get('/getConfig', (req, res) => {
    Configuration.find()
    .exec()
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
});

app.get('/getArticle', (req, res) => {
    Article.find()
    .exec()
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
});

// app.get('/getArticle/:id', (req, res) => {
//     Article.find(req.params.id, (err, doc) => {
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log(doc);
//             res.json(doc)
//         }
//     });
// });


app.get('/getArticle/:id', (req, res) => {
    const articleID = req.params.id
    Article.find({_id: articleID})
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
})

app.put('/articleStock/:id', (req, res) => {
    Article.findOneAndUpdate({ _id: req.body._id}, req.body, { new: true}, (err,result) =>{
        if(err){
            console.log(err);
        }
        else{
            res.json(result)
        }
    });
});

app.put('/sale/articleSuggestion', (req, res) => {
    const userInput = req.body.description
    const length = userInput.length
    Article.find({
        $expr : {
            $eq : [ 
                userInput,
                {$substr : [
                    '$description',
                    0,
                    length
                    ]
                }
            ] 
        } 
    })
    .then(docs =>{
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});


