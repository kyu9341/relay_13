const {DataTypes} = require('sequelize')
const sequelize   = require('./database')
const Posts = sequelize.define('Posts', {
    postId: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    sentiment:{
      type:DataTypes.TEXT
    },
    title:{
      type:DataTypes.TEXT
    },
    contents:{
      type:DataTypes.TEXT
    },
    ascii:{
      type:DataTypes.TEXT
    }
})
module.exports = Posts