import sequelize, { DataTypes, Sequelize } from 'sequelize';

const books = sequelize.define('books', {
    bookID: {
        primaryKey : true,
        type: DataTypes.STRING(20),
        allowNull: false
    },
    genre : DataTypes.STRING(20),
    sales : DataTypes.INTEGER,
    title : DataTypes.STRING(255),
    releaseDate : DataTypes.STRING(25), 
    bookCover : DataTypes.STRING(255),
    publisher : DataTypes.STRING(50),
});

export {books};