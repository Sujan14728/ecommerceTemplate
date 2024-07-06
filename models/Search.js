const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SearchLog = sequelize.define(
  'SearchLog',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    query: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: 'search_logs',
  }
);

module.exports = SearchLog;
