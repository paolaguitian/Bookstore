import sequelize, { DataTypes, Sequelize } from 'sequelize';

const books = sequelize.define('book', {
    bookID: {
        primaryKey : true,
        type: DataTypes.STRING(20),
        allowNull: false
    },
    genre : DataTypes.STRING(20),
    sales : DataTypes.INTEGER,
    quantity : DataTypes.INTEGER,
    title : DataTypes.STRING(255),
    releaseDate : DataTypes.DATAONLY, 
    bookCover : DataTypes.STRING(255),
    publisher : DataTypes.STRING(50),
});

export default books;
