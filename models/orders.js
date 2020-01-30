import sequelize, { DataTypes, Sequelize } from 'sequelize';

const orders = sequelize.define('order', {
    orderID: {
        primaryKey: true,
        type: DataTypes.UUID,
        default: sequelize.UUIDV4,
        allowNull: false,
    },
    userID: {
        primaryKey: true,
        type: DataTypes.UUID,
        default: sequelize.UUIDV4, 
        allowNull: false,
    },
    bookID: {

    },
    timeStamp: {

    },
    total: {

    },
})
