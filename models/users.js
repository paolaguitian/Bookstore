const users = (sequelize, type) => {
  const User = sequelize.define('user', {
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

  User.associate = models => {
    User.hasMany(models.ShippingAddress);
    User.hasMany(models.CreditCard);
    User.belongsToMany(models.Book, {through: models.Wishlist});
    User.belongsToMany(models.Book, {through: models.Order});
    User.belongsToMany(models.Book, {through: models.Review});
  };

  return User;
}

export default users;