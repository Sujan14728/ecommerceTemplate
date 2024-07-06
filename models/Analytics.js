const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Analytics = sequelize.define(
  'Analytics',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: 'analytics',
  }
);

module.exports = Analytics;
