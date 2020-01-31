import sequelize, { DataTypes, Sequelize } from 'sequelize';

const wishlists = sequelize.define('wishlist', {
    wishlistID: {
        primaryKey : true,
        type: DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4,
        allowNull : false
    },
    name : DataTypes.STRING(32) 
});

export default wishlists;
