const creditCards = (sequelize, type) => { 
    const CreditCard = sequelize.define('creditCard', {
        //maximum card size is 19 digits
        cardNumber: {
            type: type.STRING,
            allowNull: false,
        },
        //maximum is 3 digits 
        cvc: {
            type: type.INTEGER,
            allowNull: false,
        },
        //format MMYYYY
        expDate: {
            type: type.STRING(7),
            allowNull: false,
        },
    });

    CreditCard.associate = models => {
        CreditCard.belongsTo(models.User);
    };

    return CreditCard;
};

export default creditCards;