let express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

let db = require('./db');
passport.use(new LocalStrategy(
  function(username, password, done) {
    db.users.getUser(username, function (err, pass) {
      if (err) { return done(err); }
      if (!pass) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (password !== pass) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, true);
    });
  }
));

app.use('/static', express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/public/index.html');
});

app.post('/login', passport.authenticate('local', {
	successRedirect: '/success',
	failureRedirect: '/',
	session: false // login without session!
}));

app.get('/success', (req, res) => {
  res.sendFile(__dirname+'/public/success.html');
})

app.listen(5000);
