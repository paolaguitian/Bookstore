import sequelize, { DataTypes } from 'sequelize';

const creditCards = sequelize.define('creditCard', {
    //maximum card size is 19 digits
    cardNumber: {
        type: DataTypes.STRING,
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

export default creditCards;