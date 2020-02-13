
const shippingAddress = (sequelize, type) => { 
  return sequelize.define('shippingAddress', {
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
}

export default shippingAddress;