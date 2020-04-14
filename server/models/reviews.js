const reviews = (sequelize, type) => {
    const Review =  sequelize.define('review', {
        timeStamp: {
            type: type.DATE,
            allowNull: false,
        },
        comment: {
            type: type.TEXT,
        },
        rating: {
            type: type.DOUBLE,
            allowNull: false,
        },
    })

    Review.associate = models => {
        Review.hasOne(models.Book, {foreignKey: 'bookID'});
    }

    return Review;
}

export default reviews;