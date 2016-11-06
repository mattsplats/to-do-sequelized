'use strict';

const orm = require('../config/orm.js');

const todo = {
	selectAll: function (callback) {
		orm.select('*', 'tasks', res => callback(res));
	},

	updateTask: function (id, task, callback) {
		orm.update('tasks', 'task', task, 'id', id, callback);
	},

	completeTask: function (id, callback) {
		orm.update('tasks', 'isComplete', true, 'id', id, callback);
	},

	createTask: function (taskObj, callback) {
		let columns = [],
		    values  = [];

		for (const prop in taskObj) {
			columns.push(prop);
			values.push(taskObj[prop]);
		}

		orm.insert('tasks', columns.join(), values.join(), callback);
	},

	deleteTask: function (id, callback) {
		orm.delete('tasks', 'id', id, callback);
	},

	clearCompleted: function (callback) {
		orm.delete('tasks', 'isComplete', true, callback);
	}
};

module.exports = todo;
