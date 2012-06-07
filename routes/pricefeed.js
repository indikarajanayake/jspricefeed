// handler for homepage
exports.home = function(req, res) {
	
    // if user is not logged in, ask them to login
    if (typeof req.session.username == 'undefined') res.render('home', { title: 'Ninja Store'});
    // if user is logged in already, take them straight to the items list
    else res.redirect('/price');
};

// handler for form submitted from homepage
exports.home_post_handler = function(req, res) {
	
    // if the username is not submitted, give it a default of "Anonymous"
    username = req.body.username || 'Anonymous';
    // store the username as a session variable
    req.session.username = username;
    // redirect the user to homepage
    res.redirect('/');
};


var symbols = {
    EMMAR:{name:'EMMAR', min:100,max:1000},
    DFM:{name:'DFM', min:690,max:1000},
    JKSC:{name:'JKCS', min:250,max:1000},
    TRE:{name:'TRE', min:900,max:1000},
    TR:{name:'TR', min:1000,max:1000}
};


// handler for displaying the items
exports.symbols = function(req, res) {
    // don't let nameless people view the items, redirect them back to the homepage
    if (typeof req.session.username == 'undefined') res.redirect('/');
    else res.render('price', { title: 'Ninja Store - Items', username: req.session.username, symbols:symbols });
};

// handler for displaying individual items
exports.symbol = function(req, res) {
    // don't let nameless people view the items, redirect them back to the homepage
    if (typeof req.session.username == 'undefined') res.redirect('/');
    else {
        var name = symbols[req.params.id].name;
        var price = symbols[req.params.id].price;
        res.render('price', { title: 'Ninja Store - ' + name, username: req.session.username, name:name, min:min ,max:max});
    }
};