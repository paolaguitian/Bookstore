import sequelize, { DataTypes, Sequelize } from 'sequelize';

const wishlists = sequelize.define('wishlists', {
    wishlistID: {
        primaryKey : true,
        type: DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4
    },
    name : DataTypes.STRING(32) 
});

export {wishlists};