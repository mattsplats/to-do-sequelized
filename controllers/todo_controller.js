'use strict';

const express = require('express'),
      router  = express.Router(),
      models  = require('../models');

// Display tasks
router.get('/', (req, res) =>
	models.Task.findAll().then(tasks => models.Category.findAll().then(categories => res.render('index', { tasks: tasks, categories: categories })))
);

// Add new task
router.post('/', (req, res) =>
	models.Task.create(req.body).then(result => res.json(result))
);

// Modify pending task text, or set pending task to completed
router.put('/', function (req, res) {
	if (req.body.hasOwnProperty('task')) {
		models.Task.update({ desc: req.body.desc }, { where: { id: req.body.id }}).then(result => res.json(result));

	} else {
		models.Task.update({ isComplete: true }, { where: { id: req.body.id }}).then(result => res.json(result));
	}
});

// Delete all completed tasks, or selected pending task
router.delete('/', function (req, res) {
	if (req.body.id === 'completed') {
		models.Task.destroy({ where: { isComplete: true }}).then(result => res.json(result));

	} else {
		models.Task.destroy({ where: { id: req.body.id }}).then(result => res.json(result));
	}
});

module.exports = router;
