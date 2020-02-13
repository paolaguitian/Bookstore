//const Sequelize = require('Sequelize');
const authors = (sequelize, type) => {
  return sequelize.define('author', {
    //attribute
    authorID: {
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
    bio: {
      type: type.TEXT,
      allowNull: false,
    },
  })
}

export default authors;