'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [
      {
        userId: 1,
        imageUrl: 'https://www.cmaquarium.org/app/uploads/2021/06/2021.04-Nick-Underwater-0001.jpg',
        content: 'A beautiful Dolphin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        imageUrl: 'https://rangerrick.org/wp-content/uploads/2018/04/RR-Pufferfish-Sept-2016.jpg',
        content: 'A Pufferfish I saw!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        imageUrl: 'https://i.natgeofe.com/n/38957713-91e2-4cb5-933c-e94f12f1f587/NationalGeographic_2728008_square.jpg',
        content: 'Some cool Cuddlefish',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Images');
  }
};
