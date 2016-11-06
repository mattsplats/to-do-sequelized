'use strict';

const conn = require('./connection.js');

const orm = {
	select: function (values, table, callback) {
		conn.query(`SELECT ?? FROM ??`, [values, table], function (err, res) {
			if (err) throw err;
			callback(res);
		});
	},

	insert: function (table, columns, values, callback) {
		conn.query(`INSERT INTO ?? (??) VALUE (?)`, [table, columns, values], function (err, res) {
			if (err) throw err;
			callback(res);
		});
	},

	update: function (table, setCol, setVal, whereCol, whereVal, callback) {
		conn.query(`UPDATE ?? SET ?? = ? WHERE ?? = ?`, [table, setCol, setVal, whereCol, whereVal], function (err, res) {
			if (err) throw err;
			callback(res);
		});
	},

	delete: function (table, whereCol, whereVal, callback) {
		conn.query(`DELETE FROM ?? WHERE ?? = ?`, [table, whereCol, whereVal], function (err, res) {
			if (err) throw err;
			callback(res);
		});
	},

	join: function (table1, table2, callback) {
		conn.query(`SELECT * FROM ?? JOIN ??`, [table1, table2], function (err, res) {
			if (err) throw err;
			callback(res);
		});
	}
};

module.exports = orm;
