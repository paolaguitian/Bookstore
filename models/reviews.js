import sequelize, { DataTypes, Sequelize } from 'sequelize';

const reviews = sequelize.define('review', {
    timeStamp: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    comment: {
        type: DataTypes.TEXT,
    },
    rating: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
})

export default reviews;