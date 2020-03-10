const books = (sequelize, type) => {
    const Book =  sequelize.define('book', {
        bookID: {
            primaryKey : true,
            type: type.STRING(20),
            allowNull: false
        },
        title : {
        allowNull : false,
        type : type.STRING(255)
        },
        genre : {
        type : type.STRING(20)
        },
        price : {
            type: type.DOUBLE
        },
        description: {
            type: type.TEXT,
            allowNull: false,
        },
        pages: {
            type: type.INTEGER
        },
        sales : {
        type: type.INTEGER
        },
        quantity : {
        type: type.INTEGER
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