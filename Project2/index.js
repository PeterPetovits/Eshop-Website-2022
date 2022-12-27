const express = require('express');
const path = require('path');
const {v4: uuidv4} = require('uuid');
const app = express();
const port = 3000;

const MongoClient = require('mongodb').MongoClient;

var dbUserName = encodeURIComponent("peter");
var dbPassword = encodeURIComponent("peter11");

const uri = `mongodb+srv://${dbUserName}:${dbPassword}@cluster0.5a2u7mx.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

app.listen(port);

/* 
    Serve static content from directory "public",
    it will be accessible under path /, 
    e.g. http://localhost:8080/index.html
*/
app.use(express.static('public'));

// parse url-encoded content from body
app.use(express.urlencoded({ extended: false }));

// parse application/json content from body
app.use(express.json());

// serve index.html as content root
app.get('/', function(req, res){
    var options = {
        root: path.join(__dirname, 'public')
    }

    res.sendFile('index.html', options, function(err){
        console.log(err)
    })
})

app.get('/login-service', async function(req, res){
   let username = req.query.userName;
   let password = req.query.passWord;

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
   .then(user => {
    if(user.length == 1){
        var jsonResponse = {"ResponseCode": 200, "sessionId" : uuidv4()};
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(jsonResponse);
    }else{
        var jsonResponse = {"ResponseCode": 500};
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json(jsonResponse);
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

app.post('/cart-item-service', async function(req, res){
    let title = req.query.title;
    let cost = req.query.cost;
    let image = req.query.image;
    let username = req.query.userName;
    let sessionId = req.query.sessionId;

    client
    .connect()
    .then(() =>{
        const collection = client.db("eshop-db").collection("cart");

        item = {
            productTitle: title,
            productCost : cost,
            productImage: image,
            productUsername: username,
            productSessionId: sessionId
        }

        return collection.insertOne(item);
    })
    .then(result =>{
        var jsonResponse = {"ResponseCode": 200};
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(jsonResponse);
    })
    .catch(err => {
        console.log(err);
    })
    .finally(() => {
        console.log("Closing connection");
        client.close();
    })
})

app.get('/cart-size-service', async function(req, res){
    let username = req.query.userName;
    let sessionId = req.query.sessionId;

    client
    .connect()
    .then(() =>{
        const collection = client.db("eshop-db").collection("cart");

        return collection.find({$or: [{productUsername: username}, {productSessionId: sessionId}]});
    })
    .then(cursor => cursor.toArray())
    .then(result =>{
        var jsonResponse = {"ResponseCode": 200, "size" : result.length};
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(jsonResponse);
    })
    .catch(err => {
        console.log(err);
    })
    .finally(() => {
        console.log("Closing connection");
        client.close();
    })
})