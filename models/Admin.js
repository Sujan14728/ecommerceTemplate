const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Admin = sequelize.define(
  'Admin',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'superadmin'),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: 'admins',
  }
);

module.exports = Admin;
