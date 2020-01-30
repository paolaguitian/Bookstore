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
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
    },
    timeStamp: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    total: {
        type: DateTypes.DOUBLE,
        allowNull: false,
    },
})

export default orders;
