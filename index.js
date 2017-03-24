const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const config = require('./config.json');
const passport = require('./passport'); // NOTE: THIS IS OUR OWN FILE, NOT THE PACKAGE
const usersRouter = require('./routes/usersRouter');
const mainRouter = require('./routes/mainRouter');

const app = express();

app.use(bodyParser.json())

app.use(session({
  secret: config.sessionSecret,
  saveUninitialized: false,
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', mainRouter);
app.use('/users', usersRouter);

app.listen(config.port, () => {
  console.log(`listening on port: ${config.port}`);
});
