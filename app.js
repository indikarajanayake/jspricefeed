
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');
  

var app = module.exports = express.createServer();

var ArticleProvider = require('./article_provider.js').ArticleProvider;


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

//app.get('/', routes.index);


var users=[{name:'indika',email:'indika.@gamil.com'},
		   {name:'indika',email:'indika.@gamil.com'},
		   {name:'indika',email:'indika.@gamil.com'},
		   {name:'indika',email:'indika.@gamil.com'},
		   {name:'indika',email:'indika.@gamil.com'}				
			]





app.get('/', function(req, res){
    res.render('index',{users:users});
});



app.get('/users',function(req,res){
	res.render('users',{users:users});
});

var articleProvider= new ArticleProvider();



app.get('/article', function(req, res){
    articleProvider.findAll( function(error,docs){
        res.render('article', { locals: {
            title: 'Blog',
            articles:docs
            }
        });
    })
});



app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
