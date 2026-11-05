'use strict';

const moment = require('moment');

const volunteers = [
  { name: 'Avery Collins', email: 'avery.collins@example.com', daysFromToday: 1 },
  { name: 'Jordan Reyes', email: 'jordan.reyes@example.com', daysFromToday: 3 },
  { name: 'Priya Nair', email: 'priya.nair@example.com', daysFromToday: 3 },
  { name: 'Sam Okafor', email: 'sam.okafor@example.com', daysFromToday: 7 },
  { name: 'Lena Fischer', email: 'lena.fischer@example.com', daysFromToday: 10 },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = moment().toDate();
    await queryInterface.bulkInsert(
      'Volunteers',
      volunteers.map(({ name, email, daysFromToday }) => ({
        name,
        email,
        shiftDate: moment().add(daysFromToday, 'days').format('YYYY-MM-DD'),
        createdAt: now,
        updatedAt: now,
      })),
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Volunteers', {
      email: volunteers.map((volunteer) => volunteer.email),
    });
  },
};
