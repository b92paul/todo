let express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;
	path = require('path');

// set view render engine
app.set('views', path.join(__dirname, 'src/pug'));
app.set('view engine', 'pug');

let db = require('./db');
passport.use(new LocalStrategy(
  function(username, password, done) {
    db.users.getUser(username, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
			console.log(user);
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
	console.log(user.username);
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  db.users.getUser(username, function (err, user) {
    done(err, user);
  });
});

app.use('/static', express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'asdf234y987', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.render('index', {user:req.user});
});

app.post('/login', passport.authenticate('local', {
	successRedirect: '/success',
	failureRedirect: '/',
}));

app.get('/success', (req, res) => {
  console.log(req.user);
	res.render('success', {user: req.user})
})

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

app.listen(5000);
