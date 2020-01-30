import sequelize, { DataTypes, Sequelize } from 'sequelize';

const reviews = sequelize.define('review', {
    //attributes
    bookID: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
    },
    userID: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },
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