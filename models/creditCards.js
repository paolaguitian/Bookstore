import sequelize, { DataTypes, Sequelize } from 'sequelize'

const creditCards = sequelize.define('creditCard', {
    userID: {
        primaryKey: true,
        type: DataTypes.UUID,
        default: sequelize.UUIDV4,
        allowNull = false,
    },
    //maximum card size is 19 digits
    cardNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    //maximum is 3 digits
    cvc: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    //format MMYYYY
    expDate: {
        type: DataTypes.STRING(7),
        allowNull: false,
    },
})