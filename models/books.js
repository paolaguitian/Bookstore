const books = (sequelize, type) => {
    return sequelize.define('book', {
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
}

export default books;