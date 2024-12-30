import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const Users = db.define('users', {
   name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
         notNull: true,
      },
   },
   email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
         notNull: true,
      },
   },
   address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
         notNull: true,
      },
   },
   password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
         notNull: true,
      },
   },
   refresh_token: {
      type: DataTypes.TEXT,
   },
});

export default Users;
