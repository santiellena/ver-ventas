const { Model, DataTypes, Sequelize } = require('sequelize');
const { SELL_TABLE } = require('../sells/model');
const { PRODUCT_TABLE } = require('../products/model');

const SELL_PRODUCT_TABLE = 'sell_product';

const sellProductSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'idsell_product'
    },
    idProduct: {
        allowNull: false,
        field: 'id_product',
        type: DataTypes.BIGINT,
        references: {
            model: PRODUCT_TABLE,
            key: 'idproduct',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    idSell: {
        allowNull: false,
        field: 'id_sell',
        type: DataTypes.INTEGER,
        reference: {
            model: SELL_TABLE,
            key: 'idsell',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    price: {
        allowNull: false,
        type: DataTypes.DECIMAL(19,2),
    },
};

class SellProduct extends Model {
    static associate(models) {
    };
  
    static config(sequelize) {
      return {
        sequelize,
        tableName: SELL_PRODUCT_TABLE,
        modelName: 'SellProduct',
        timestamps: false
      };
    };
};

module.exports = {
    SellProduct,
    sellProductSchema,
    SELL_PRODUCT_TABLE,
};