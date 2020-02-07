const Sequelize = requires('sequelize')

/*
TODO: fix model --> requires to import reference:
https://stackoverflow.com/questions/46677752/the-difference-between-requirex-and-import-x

*/
const AuthorModel = require('./models/authors')
const BookModel = require('./models/books')
const WishlistModel = require('./models/wishlists')

const OrderModel = require('./models/orders')
const ReviewModel = require('./models/reviews')

const UserModel = require('./models/users')
const ShippingAddressModel =  require('./models/shippingAddress')
const CreditCardModel = require('./models/creditCards')


const { DATABASE_NAME,ROOT,PASSWORD,HOST,DIALECT } = require('./constants')

const sequelize = new Sequelize(DATABASE_NAME, ROOT, PASSWORD,
  {host: HOST,dialect: DIALECT,pool: {max: 10,min: 0,acquire: 30000,idle: 10000}})


//Models
const Book = BookModel(sequelize, Sequelize)
const Author = AuthorModel(sequelize, Sequelize)
const Wishlist = WishlistModel(sequelize, Sequelize)
const Order = OrderModel(sequelize, Sequelize)
const Review = ReviewModel(sequelize, Sequelize)
const User = UserModel(sequelize, Sequelize)
const ShippingAddress = ShippingAddressModel(sequelize, Sequelize)
const CreditCard = CreditCardModel(sequelize, Sequelize)

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
