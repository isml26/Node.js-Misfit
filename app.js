const express = require("express");
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo');
const methodOverride = require("method-override");
const pageRoute = require('./routes/pageRoute');
const userRoute = require('./routes/userRoute');
const workoutRoute = require('./routes/workoutRoute');
const session = require('express-session');
const URL = "mongodb+srv://admin123:admin123@cluster0.02slt.mongodb.net/misfit?retryWrites=true&w=majority"
const app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded



app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(session({
  secret: 'kunefe',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: URL })
}));
//Global variable for keep user logged in
global.userIN = null;
app.use('*',(req,res,next)=>{
  userIN = req.session.userID;
  next();
});
app.use(methodOverride('_method', {
  methods: ['POST', 'GET']
}));

const PORT = process.env.PORT || 3000 ;

app.use('/',pageRoute);
app.use('/users',userRoute);
app.use('/workouts',workoutRoute);

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connected Successfully");
});


app.listen(PORT, (req, res) => {
    console.log(`App started on ${PORT}`);
});