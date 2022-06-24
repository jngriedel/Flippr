'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [
      {
        userId: 2,
        imageId: 2,
        body: 'This is so COOL!! Nice find.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        imageId: 2,
        body: 'Did you poke it?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        imageId: 3,
        body: 'So they can use camo right? But they just let you take a picture of them? That seems suspicious.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Comments');
  }
};
