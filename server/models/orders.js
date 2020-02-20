const orders = (sequelize, type) => {
    const Order =  sequelize.define('order', {
        orderID: {
            primaryKey: true,
            type: type.UUID,
            default: sequelize.UUIDV4,
            allowNull: false,
        },
        timeStamp: {
            type: type.DATE,
            allowNull: false,
        },
        total: {
            type: type.DOUBLE,
            allowNull: false,
        },
    })
    
    return Order;
}

export default orders;
