const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:root@localhost:3306/quotee');

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});