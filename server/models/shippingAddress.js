
const shippingAddress = (sequelize, type) => { 
  const ShippingAddress =  sequelize.define('shippingAddress', {
      //attribute
      street: {
        type: type.STRING,
        allowNull: false,
      },
      city: {
        type: type.STRING,
        allowNull: false,
      },
      state: {
        type: type.STRING,
        allowNull: false,
      },
      zipcode: {
        type: type.INTEGER,
        allowNull: false,
      },
      country: {
        type: type.STRING,
        allowNull: false,
      },
    });

    ShippingAddress.associate = models => {
      ShippingAddress.belongsTo(models.User);
    };

    return ShippingAddress;
}

export default shippingAddress;