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

    return Review;
}

export default reviews;