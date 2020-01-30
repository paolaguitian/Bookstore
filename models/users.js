import sequelize, { DataTypes, Sequelize } from 'sequelize';

const users = sequelize.define('user', {
  //attributes
  userID: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  homeAddress: {
    type: DataTypes.STRING,
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
});

export default users;