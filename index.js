const express = require('express'); // load express module
const nedb = require("nedb-promises"); // load nedb module
const QueryString = require('qs');

const app = express(); // init app
const db = nedb.create('myfile.jsonl'); // init db




app.use(express.static('public')); // enable static routing
app.use(express.json());


app.post('/data',(req,res)=>{
    // store data, return id
    const doc = req.body;
    db.insertOne({data: doc.data})
    .then(doc=>(res.send({_id:doc._id})));
   });


app.get('/data/:id',(req,res)=>{
    // return doc with given id
    const id = req.params.id;
    db.findOne({_id:id})
    .then(doc=>{res.send({data:doc.data, _id:doc._id})});
   });

app.patch('/data/:id',(req,res)=>{
    // update doc with given id
    const id = req.params.id;
    const doc = req.body;
    db.update({_id:id},{$set :doc})
    .then(doc=>{ 
        if (doc === 1)res.send("Updated successfully");
        else res.send("No document found with that id");});
   });


app.delete('/data/:id',(req,res)=>{
    // delete doc with given id.
    const id = req.params.id;
    db.remove({_id:id});

});
app.get('/data',(req,res)=>{
    // return all docs
    db.find({})
    .then(docs=>{res.send(docs)});
});



// default route
app.all('*',(req,res)=>{res.status(404).send('Invalid URL.')});
// start server
app.listen( 3000, ()=>console.log('server started…') );