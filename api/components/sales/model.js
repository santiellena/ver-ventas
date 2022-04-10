const { Model, DataTypes, Sequelize } = require('sequelize');

const SALE_TABLE = 'sale';
const { PRODUCT_TABLE } = require('../products/model');

const saleSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'idglobal'
    },
    idProduct: {
        allowNull: false,
        field: 'id_product',
        type: DataTypes.BIGINT,
        references: {
            model: PRODUCT_TABLE,
            key: 'idproduct'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    fromDate: {
        allowNull: false,
        type: DataTypes.STRING(10),
    },
    toDate: {
        allowNull: false,
        type: DataTypes.STRING(10),
    },
    discount: {
        allowNull: false,
        type: DataTypes.DECIMAL(2),
    },
    productChange: {
        allowNull: false,
        type: DataTypes.TINYINT,
        default: 0,
    },
};

class Sale extends Model {
    static associate(models) {
        this.belongsTo(models.Product, {as: 'product', foreignKey: 'idProduct'});
    };
  
    static config(sequelize) {
      return {
        sequelize,
        tableName: SALE_TABLE,
        modelName: 'Sale',
        timestamps: false,
      };
    };
};

module.exports = {
    Sale,
    saleSchema,
    SALE_TABLE,
};