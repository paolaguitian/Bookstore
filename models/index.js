import Sequelize from 'sequelize';

const {DATABASE_NAME,USERNAME,PASSWORD,HOST,DIALECT} = require('../config/constants')

const db = new Sequelize(DATABASE_NAME, USERNAME, PASSWORD, {
    host: HOST,
    dialect: DIALECT,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });

  const models = {
    Author: db.import('./authors'),
    Book: db.import('./books'),
    Wishlist: db.import('./wishlists'),
    Order: db.import('./orders'),
    Review: db.import('./reviews'),
    User: db.import('./users'),
    ShippingAddress: db.import('./shippingAddress'),
    CreditCard: db.import('./creditCards')
  };
  
  Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
      models[key].associate(models);
    }
  });
  
  export { db };
  
  export default models;