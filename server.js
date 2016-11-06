'use strict';

// Express vars
const express    = require('express'),
      exphbs     = require('express-handlebars'),
      bodyParser = require('body-parser'),

      routes     = require('./controllers/todo_controller.js'),

      app        = express(),
      hbs        = exphbs.create({ defaultLayout: 'main', extname: '.hbs' }),
      PORT       = process.env.PORT || 3000;

// Handlebars init
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
// app.enable('view cache');

// Body parser init
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

// Static route
app.use(express.static(process.cwd() + '/public'));

// Controller routes
app.use('/', routes);

// Init server
app.listen(PORT, function () {
	console.log(`App listening on port ${PORT}`);
});
