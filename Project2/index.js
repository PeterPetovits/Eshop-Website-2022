const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

const MongoClient = require('mongodb').MongoClient;

const dbUserName = process.env.mongo_user;
const dbPassword = process.env.mongo_pwd;

const uri = `mongodb+srv://${dbUserName}:${dbPassword}@cluster0.5a2u7mx.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {useNewUrlParser: true, userUnifiedTopology: true});

app.listen(port)

/* 
    Serve static content from directory "public",
    it will be accessible under path /, 
    e.g. http://localhost:8080/index.html
*/
app.use(express.static('public'))

// parse url-encoded content from body
app.use(express.urlencoded({ extended: false }))

// parse application/json content from body
app.use(express.json())

// serve index.html as content root
app.get('/', function(req, res){

    var options = {
        root: path.join(__dirname, 'public')
    }

    res.sendFile('index.html', options, function(err){
        console.log(err)
    })
})

app.get('/login-service', function(req, res){
   let username = req.query.userName;
   let password = req.query.passWord;

   client
   .connect()
   .then(() =>{
        const collection = client.db("eshop-db")
        .collection("users");

        console.log("connection ok")
        //find query
   })
   .catch(err =>{
        console.log(err);
   })
   .finally(() =>{
        console.log("Closing connection")
        client.close();
   })
   
})