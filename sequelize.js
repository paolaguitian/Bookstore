const Sequelize = require('sequelize')

import authors from './models/authors'
import books from './models/books'
import wishlists from './models/wishlists'
import orders from './models/orders'
import reviews from './models/reviews'
import users from './models/users'
import shippingAddress from './models/shippingAddress'
import creditCards from './models/creditCards'


const {DATABASE_NAME,USERNAME,PASSWORD,HOST,DIALECT} =require('./constants')
const db = new Sequelize(DATABASE_NAME, USERNAME, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

//Models
const Author = authors(db, Sequelize)
const Book = books(db, Sequelize)
const Wishlist = wishlists(db, Sequelize)
const Order = orders(db, Sequelize)
const Review = reviews(db, Sequelize)
const User = users(db, Sequelize)
const ShippingAddress = shippingAddress(db, Sequelize)
const CreditCard = creditCards(db, Sequelize)

//Associations: https://sequelize.org/master/manual/assocs.html
Author.hasMany(Book);
Book.belongsTo(Author);

User.hasMany(ShippingAddress);
User.hasMany(CreditCard);
ShippingAddress.belongsTo(User); // Uses 'userID' as FK
CreditCard.belongsTo(User); // Uses 'userID' as FK

/*
Uses belongToMany since Wishlist, Order, and Review
require two foreign keys: 'userID' and 'bookID'
*/

User.belongsToMany(Book, {through: Wishlist});
Book.belongsToMany(User, {through: Wishlist});

User.belongsToMany(Book, {through: Order});
Book.belongsToMany(User, {through: Order});

User.belongsToMany(Book, {through: Review});
Book.belongsToMany(User, {through: Review});


//Moved to server.js
/*db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

db.sync({ force: false })
  .then(() => {
    console.log(`DB created.`)
  })
*/

export default db;


// Export models
/*module.exports = {
  Book,
  Author,
  Wishlist,
  Order,
  Review,
  User,
  ShippingAddress,
  CreditCard
}*/