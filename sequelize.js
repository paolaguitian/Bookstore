const Sequelize = requires('sequelize')

/*
TODO: fix model --> requires to import reference:
https://stackoverflow.com/questions/46677752/the-difference-between-requirex-and-import-x

*/

import authors from '../models/authors'
import books from './models/books'
import wishlists from './models/wishlists'

import orders from './models/orders'
import reviews from './models/reviews'

import users from './models/users'
import shippingAddress from './models/shippingAddress'
import creditCards from './models/creditCards'


const { DATABASE_NAME,ROOT,PASSWORD,HOST,DIALECT } = require('./constants')

const sequelize = new Sequelize(DATABASE_NAME, ROOT, PASSWORD,
  {host: HOST,dialect: DIALECT,pool: {max: 10,min: 0,acquire: 30000,idle: 10000}})


//Models
const Book = books(sequelize, Sequelize)
const Author = authors(sequelize, Sequelize)
const Wishlist = wishlists(sequelize, Sequelize)
const Order = orders(sequelize, Sequelize)
const Review = reviews(sequelize, Sequelize)
const User = users(sequelize, Sequelize)
const ShippingAddress = shippingAddress(sequelize, Sequelize)
const CreditCard = creditCards(sequelize, Sequelize)

//Associations: https://sequelize.org/master/manual/assocs.html
Author.hasMany(Book);
Book.hasOne(Author, {foreignKey: 'authorID'});

User.hasMany(ShippingAddress);
User.hasMany(CreditCard);
ShippingAddress.belongsTo(User); // Uses 'userID' as FK
CreditCard.belongsTo(User); // Uses 'userID' as FK

/*
Uses belongToMany since Wishlist, Order, and Review
require two foreign keys: 'userID' and 'bookID'
*/
User.belongToMany(Book, {through: 'Wishlist'});
Book.belongToMany(User, {through: 'Wishlist'});

User.belongToMany(Book, {through: 'Order'});
Book.belongToMany(User, {through: 'Order'});

User.belongToMany(Book, {through: 'Review'});
Book.belongToMany(User, {through: 'Review'});

sequelize.sync({ force: false })
  .then(() => {
    console.log(`DB created.`)
  })

// Export models
module.exports = {
  Book,
  Author,
  Wishlist,
  Order,
  Review,
  User,
  ShippingAddress,
  CreditCard
}
