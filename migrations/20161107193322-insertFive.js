'use strict';

const models = require('../models');

module.exports = {
  up: function (queryInterface, Sequelize) {
    // Errands
    return models.Task.create({ desc: 'take out trash', }).then(res1 =>
    models.Task.create({ desc: 'donate old clothes' }).then(res2 =>
    models.Task.create({ desc: 'take car for repairs' }).then(res3 => 
      models.Category.findOne({ where: { name: 'errands' }}).then(errands =>
        errands.addTask(res1).then(() =>
        errands.addTask(res2).then(() =>
        errands.addTask(res3)
      ))
    )))).then(() =>

    // Shopping
    models.Task.create({ desc: 'get dog food', }).then(result =>
      models.Category.findOne({ where: { name: 'shopping' }}).then(shopping =>
        shopping.addTask(result)
      )
    )).then(() => 

    // Grocery
    models.Task.create({ desc: '1/2 gallon of milk', }).then(result =>
      models.Category.findOne({ where: { name: 'grocery' }}).then(grocery =>
        grocery.addTask(result)
      )
    ))
  },

  down: function (queryInterface, Sequelize) {
    return models.Task.destroy({ where: { desc: [
      'take out trash',
      'donate old clothes',
      'take car for repairs',
      'get dog food',
      '1/2 gallon of milk'
    ]}})
    
    // Get max id in use
    .then(() => models.Task.max('id'))

    // Alter table: reset auto_increment to the next available integer
    .then(result => models.sequelize.query(`ALTER TABLE tasks AUTO_INCREMENT = ${(result || 0) + 1}`));  // result is NaN if table is empty
  }
};
