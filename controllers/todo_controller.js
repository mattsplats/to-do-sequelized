'use strict';

const express = require('express'),
      router  = express.Router(),
      models  = require('../models');

// Display page
router.get('/', (req, res) =>
	models.Category.findAll().then(categories =>
		categories[0].getTasks().then(tasks =>
			res.render('index', { tasks: tasks, categories: categories })
		)
	)
);

// Get tasks for category
router.get('/:category', (req, res) =>
	models.Category.findOne({ where: { name: req.params.category } }).then(category =>
		category.getTasks().then(tasks =>
			res.json(tasks)
		)
	)
);

// Add new task
router.post('/', (req, res) =>
	models.Category.findOne({ where: { name: req.body.category } }).then(category => 
		models.Task.create({ desc: req.body.desc }).then(task => 
			category.addTask(task).then(() => res.json(task))
		)
	)
);

// Modify pending task text, or set pending task to completed
router.put('/', (req, res) => {
	if (req.body.hasOwnProperty('desc')) {
		models.Task.update({ desc: req.body.desc }, { where: { id: req.body.id }}).then(result => res.json(result));

	} else {
		models.Task.update({ isComplete: true }, { where: { id: req.body.id }}).then(result => res.json(result));
	}
});

// Delete all completed tasks, or selected pending task
router.delete('/', (req, res) => {
	if (req.body.hasOwnProperty('category')) {
		models.Category.findOne({ where: { name: req.body.category } }).then(category =>
			models.Task.destroy({ where: { isComplete: true, CategoryId: category.id }}).then(result => res.json(result))
		);

	} else {
		models.Task.destroy({ where: { id: req.body.id }}).then(result => res.json(result));
	}
});

module.exports = router;
