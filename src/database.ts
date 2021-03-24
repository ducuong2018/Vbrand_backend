const { Sequelize } = require('sequelize');
export const sequelize = new Sequelize(
    'vbrandv2', 'postgres', 'admin',
    {
    host: 'localhost',
    dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        },
});

