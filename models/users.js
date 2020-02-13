const users = (sequelize, type) => {
  return sequelize.define('user', {
    //attributes
    userID: {
      primaryKey: true,
      type: type.UUID,
      defaultValue: type.UUIDV4,
      allowNull: false,
    },
    firstName: {
      type: type.STRING,
      allowNull: false,
    },
    lastName: {
      type: type.STRING,
      allowNull: false,
    },
    username: {
      type: type.STRING,
      allowNull: false,
    },
    email: {
      type: type.STRING,
      allowNull: false,
    },
    password: {
      type: type.STRING,
      allowNull: false,
    },
    homeAddress: {
      type: type.STRING,
    },
    phoneNumber: {
      type: type.STRING,
    },
  });
}

export default users;