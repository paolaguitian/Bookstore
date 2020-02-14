const books = (sequelize, type) => {
    const Book =  sequelize.define('book', {
        bookID: {
            primaryKey : true,
            type: type.STRING(20),
            allowNull: false
        },
        genre : {
        type : type.STRING(20)
        },
        sales : {
        type: type.INTEGER
        },
        quantity : {
        type: type.INTEGER
        },
        title : {
        allowNull : false,
        type : type.STRING(255)
        },
        releaseDate : {
            type: type.DATEONLY
        },
        bookCover : {
        type : type.STRING(500)
        },
        publisher : {
        type: type.STRING(50)
        }
    });

    Book.associate = models => {
        Book.belongsTo(models.Author);
        Book.belongsToMany(models.User, {through: models.Wishlist});
        Book.belongsToMany(models.User, {through: models.Order});
        Book.belongsToMany(models.User, {through: models.Review});
    }

    return Book;
}

export default books;