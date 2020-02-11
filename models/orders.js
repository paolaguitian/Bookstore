import sequelize, { DataTypes } from 'sequelize';

const orders = sequelize.define('order', {
    orderID: {
        primaryKey: true,
        type: DataTypes.UUID,
        default: sequelize.UUIDV4,
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
