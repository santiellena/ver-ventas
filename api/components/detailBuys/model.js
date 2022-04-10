const { Model, DataTypes, Sequelize } = require('sequelize');
const { BUY_TABLE } = require('../buys/model');
const { PRODUCT_TABLE } = require('../products/model');

const BUY_PRODUCT_TABLE = 'buy_product';

const buyProductSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'idbuy_product'
    },
    idProduct: {
        allowNull: false,
        field: 'id_product',
        type: DataTypes.BIGINT,
        reference: {
            model: PRODUCT_TABLE,
            key: 'idproduct',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    idBuy: {
        allowNull: false,
        field: 'id_buy',
        type: DataTypes.INTEGER,
        reference: {
            model: BUY_TABLE,
            key: 'idbuy',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    quantity: {
        allowNull: false,
        type: DataTypes.DECIMAL(19,2),
    },
    price: {
        allowNull: false,
        type: DataTypes.DECIMAL(19,2),
    },
};

class BuyProduct extends Model {
    static associate(models) {
    };
  
    static config(sequelize) {
      return {
        sequelize,
        tableName: BUY_PRODUCT_TABLE,
        modelName: 'BuyProduct',
        timestamps: false
      };
    };
};

module.exports = {
    BuyProduct,
    buyProductSchema,
    BUY_PRODUCT_TABLE,
};