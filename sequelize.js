const Sequelize = require('sequelize')

const AuthorModel = require('./models/authors')
const BookModel = require('./models/books')
const WishlistModel = require('./models/wishlists')

const OrderModel = require('./models/orders')
const ReviewModel = require('./models/reviews')

const UserModel = require('./models/users')
const ShippingAddressModel =  require('./models/shippingAddress')
const CreditCardModel = require('./models/creditCards')


const {DATABASE_NAME,ROOT,PASSWORD,HOST,DIALECT} =require('./constants')

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

//Associations
Author.hasMany(Book);
Book.hasOne(Author);
//TODO: Book.hasMany(Wishlist);
//TODO: Wishlist.hasMany(Book);

Book.hasMany(Review);
Review.hasOne(Book);
//TODO DEFINE FOREIGN KEY

User.hasMany(Review);
Review.hasOne(User);
User.hasMany

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
