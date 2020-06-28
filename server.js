const express = require("express");
const logger = require('morgan');
const bodyParser = require('body-parser'); 
const admin = require('firebase-admin');

const app = express();

app.use(logger('dev'));

app.set('view engine', 'ejs');

app.use(express.static('views'));
app.set('views', __dirname + "/views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

// Firebase Admin
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-test-8ccf1.firebaseio.com"
});

const isAuthinticated = (req, res, next) => {

    next();
}


// ROUTES
app.get('/', (req, res) => {
    res.render("home");
});

app.post('/', (req, res)=>{
    console.log(req.body.breakfast);
    res.render("breakfast", {data: req.body.breakfast});
})

app.get('/authenticated', isAuthinticated, (req, res) => {

})

const port = process.env.PORT || 3000;

app.listen(3000, () => console.log("Running on " + port));