'use strict';

const models = require('../models');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return models.Tasks.bulkCreate([
      { task: 'take out trash', isComplete: false },
      { task: 'get dog food', isComplete: false },
      { task: 'donate old clothes', isComplete: false },
      { task: 'pick up milk', isComplete: false },
      { task: 'take car for repairs', isComplete: false }
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return models.Tasks.destroy({ where: {
       $or: [
        { task: 'take out trash' },
        { task: 'get dog food' },
        { task: 'donate old clothes' },
        { task: 'pick up milk' },
        { task: 'take car for repairs' }
      ]}
    })
    
    // Get max id in use
    .then(() => models.Tasks.max('id'))

    // Alter table: reset auto_increment to the next available integer
    .then(result => models.sequelize.query(`ALTER TABLE tasks AUTO_INCREMENT = ${(result || 0) + 1}`));  // result is NaN if table is empty
  }
};
