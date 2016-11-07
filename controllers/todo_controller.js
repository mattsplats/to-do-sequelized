'use strict';

const express = require('express'),
      router  = express.Router(),
      models  = require('../models');

// Display tasks
router.get('/', (req, res) =>
	models.Tasks.findAll().then(result => res.render('index', { tasks: result }))
);

// Add new task
router.post('/', (req, res) =>
	models.Tasks.create(req.body).then(result => res.json(result))
);

// Modify pending task text, or set pending task to completed
router.put('/', function (req, res) {
	if (req.body.hasOwnProperty('task')) {
		models.Tasks.update({ task: req.body.task }, { where: { id: req.body.id }}).then(result => res.json(result));

	} else {
		models.Tasks.update({ isComplete: true }, { where: { id: req.body.id }}).then(result => res.json(result));
	}
});

// Delete all completed tasks, or selected pending task
router.delete('/', function (req, res) {
	if (req.body.id === 'completed') {
		models.Tasks.destroy({ where: { isComplete: true }}).then(result => res.json(result));

	} else {
		models.Tasks.destroy({ where: { id: req.body.id }}).then(result => res.json(result));
	}
});

module.exports = router;
