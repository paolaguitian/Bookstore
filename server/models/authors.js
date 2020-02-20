//const Sequelize = require('Sequelize');
const authors = (sequelize, type) => {
  const Author =  sequelize.define('author', {
    //attribute
    authorID: {
      primaryKey: true,
      type: type.INTEGER,
      autoIncrement:true,
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
    bio: {
      type: type.TEXT,
      allowNull: false,
    },
  });

  Author.associate = models => {
    Author.hasMany(models.Book);
  };

  return Author;
};

export default authors;