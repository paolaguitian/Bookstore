const books = sequelize.define('book', {
    bookID: {
        primaryKey : true,
        type: DataTypes.STRING(20),
        allowNull: false
    },
    genre : {
	type : DataTypes.STRING(20)
    },
    sales : {
	type: DataTypes.INTEGER
    },
    quantity : {
	type: DataTypes.INTEGER
    },
    title : {
	allowNull : false,
	type : DataTypes.STRING(255)
    },
    releaseDate : {
        type: DataTypes.DATEONLY
    },
    bookCover : {
	type : DataTypes.STRING(500)
    },
    publisher : {
	type: DataTypes.STRING(50)
    }
});

export default books;