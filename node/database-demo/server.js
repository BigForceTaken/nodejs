const express = require('express'),
    mongodb = require('mongodb'),
    cookieParser =  require('cookie-parser'),
    session = require('express-session');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
app.use(session())

app.set('view engine', 'jade')

app.listen(3000)