const { Model, DataTypes, Sequelize } = require('sequelize');
const { ORDER_TABLE } = require('../orders/model');
const { PRODUCT_TABLE } = require('../products/model');

const ORDER_PRODUCT_TABLE = 'order_product';

const orderProductSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'idorder_product'
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
    idOrder: {
        allowNull: false,
        field: 'id_order',
        type: DataTypes.INTEGER,
        reference: {
            model: ORDER_TABLE,
            key: 'idorder',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
};

class OrderProduct extends Model {
    static associate(models) {
    };
  
    static config(sequelize) {
      return {
        sequelize,
        tableName: ORDER_PRODUCT_TABLE,
        modelName: 'OrderProduct',
        timestamps: false
      };
    };
};

module.exports = {
    OrderProduct,
    orderProductSchema,
    ORDER_PRODUCT_TABLE,
};