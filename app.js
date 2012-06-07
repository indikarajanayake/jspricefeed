
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/pricefeed');
  

var app = module.exports = express.createServer();

var PriceProvider = require('./priceprovider.js').PriceProvider;


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.home);




app.post('/', routes.home_post_handler);

// display the list of item
app.get('/price', routes.symbols);
// show individual item
app.get('/price/:id', routes.symbol);



var priceProvider= new PriceProvider();

app.get('/logout', function(req, res) {
    // delete the session variable
    delete req.session.username;
    // redirect user to homepage
    res.redirect('/');
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});