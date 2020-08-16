const { Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    dialect:'sqlite',
    storage:'./database.splite'
});
  
module.exports = sequelize;