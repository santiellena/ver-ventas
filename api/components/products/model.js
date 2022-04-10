const { Model, DataTypes, Sequelize } = require('sequelize');

const PRODUCT_TABLE = 'product';
const { DEPARTMENT_TABLE } = require('../departments/model');
const { UNIT_MEASURE_TABLE } = require('../unitMeasures/model');
const { SUPPLIER_TABLE } = require('../suppliers/model');
const { LOCATION_EXPOSITION_TABLE } = require('../locationExposition/model');
const { LOCATION_STORE_TABLE } = require('../locationStore/model');

const productSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        field: 'idproduct'
    },
    idDepartment: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_department',
        references: {
            model: DEPARTMENT_TABLE,
            key: 'iddepartment',
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    },
    idUnitMeasure: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_unit_measure',
        references: {
            model: UNIT_MEASURE_TABLE,
            key: 'idunit_measure',
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    },
    idExposition: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_location_exposition',
        references: {
            model: LOCATION_EXPOSITION_TABLE,
            key: 'idlocation_exposition',
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    },
    idStore: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_location_store',
        references: {
            model: LOCATION_STORE_TABLE,
            key: 'idlocation_store',
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    },
    description: {
        allowNull: false,
        type: DataTypes.STRING(45),
    },
    stock: {
        allowNull: false,
        type: DataTypes.DECIMAL(19,2),
        defaultValue: 0,
    },
    stockMin: {
        allowNull: false,
        field: 'stock_min',
        type: DataTypes.DECIMAL(19,2),
    },
    onSale: {
        allowNull: false,
        defaultValue: 0,
        type: DataTypes.TINYINT,
        field: 'on_sale',
    },
    buyPrice: {
        allowNull: false,
        type: DataTypes.DECIMAL(19,2),
        field: 'buy_price',
        defaultValue: 0,
    },
    unitPrice: {
        allowNull: false,
        type: DataTypes.DECIMAL(19,2),
        field: 'unit_price',
        defaultValue: 0,
    },
    wholesalerPrice: {
        allowNull: false,
        type: DataTypes.DECIMAL(19,2),
        field: 'wholesaler_price',
        defaultValue: 0,
    },
};

class Product extends Model {
    static associate(models) {
      this.belongsTo(models.Department, {as: 'department', foreignKey: 'idDepartment'});
      this.belongsTo(models.LocationExposition, {as: 'exposition', foreignKey: 'idExposition'});
      this.belongsTo(models.LocationStore, {as: 'store', foreignKey: 'idStore'});
      this.belongsTo(models.UnitMeasure, {as: 'unitMeasure', foreignKey: 'idUnitMeasure'});
    };
  
    static config(sequelize) {
      return {
        sequelize,
        tableName: PRODUCT_TABLE,
        modelName: 'Product',
        timestamps: false
      };
    };
};

module.exports = {
    Product,
    productSchema,
    PRODUCT_TABLE,
};