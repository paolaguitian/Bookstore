//import sequelize, { DataTypes, Sequelize } from 'sequelize';

const wishlists = (sequelize, type) => { 
    return sequelize.define('wishlist', {
        wishlistID: {
            primaryKey : true,
            type: type.UUID,
            defaultValue : type.UUIDV4,
            allowNull : false
        },
        name : {
            type : type.STRING(32),
            allowNull : false
        },
        wishlistNum : {
            type: type.INTEGER,
            allowNull : false
        }
    });
}

export default wishlists;
