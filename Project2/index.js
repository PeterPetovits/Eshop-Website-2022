const express = require('express');
const path = require('path');
const {v4: uuidv4} = require('uuid');
const app = express();
const port = 8080;

const MongoClient = require('mongodb').MongoClient;

var dbUserName = encodeURIComponent("peter");
var dbPassword = encodeURIComponent("peter11");

const uri = `mongodb+srv://${dbUserName}:${dbPassword}@cluster0.5a2u7mx.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

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

   console.log("login service ok")

   client
   .connect()
   .then(() =>{
        const collection = client.db("eshop-db").collection("users");
        
        let query = {username, password};

        let options = {
            sort: {username: 1},
            projection: {
                _id: 0, username: 1, password: 1
            }
        }

        return collection.find(query, options);
   })
   .then(cursor => cursor.toArray())
   .then(user =>{
        if(user.length == 1){
            let jsonResponse = {"sessionId": uuidv4(), "statusCode": 200};
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(jsonResponse));
        }else{
            let jsonResponse = {"statusCode": 504};
            res.setHeader('Content-Type', 'application/json');
            res.end(jsonResponse);
        }
   })
   .catch(err =>{
        console.log(err);
   })
   .finally(() =>{
        console.log("Closing connection")
        client.close();
   })
})