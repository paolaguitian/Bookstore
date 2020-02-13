const reviews = (sequelize, type) => {
    return sequelize.define('review', {
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
}

export default reviews;