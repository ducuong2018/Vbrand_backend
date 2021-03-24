'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('accounts.Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        unique: true
        // allowNull defaults to true
      },
      password_crypt:{
        type:Sequelize.STRING
      },
      confirmed_at:{
        type:Sequelize.DATE,
        timestamps: true
      },
      role:{
        type:Sequelize.ENUM,
        values: [
          'NORMAL', 'SELLER','BUYER'
        ],
        defaultValue: "NORMAL"

      },
      users_state:{
          type:Sequelize.ENUM,
          values: [
            'NORMAL', 'SELLER','BUYER'
          ],
          defaultValue: "NORMAL"
      },
      profile:{
        type:Sequelize.JSONB
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
