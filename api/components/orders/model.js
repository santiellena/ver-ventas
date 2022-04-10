const { Model, DataTypes, Sequelize } = require('sequelize');
const { EMPLOOY_TABLE } = require('../employees/model');
const { BRANCH_TABLE } = require('../branches/model');
const { CUSTOMER_TABLE } = require('../customers/model');
const { DOC_TYPE_TABLE } = require('../docTypes/model');

const ORDER_TABLE = 'order';

const orderSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'idorder'
    },
    idEmplooy: {  
        allowNull: false,
        field: 'id_emplooy',
        type: DataTypes.INTEGER,
        reference: {
            model: EMPLOOY_TABLE,
            key: 'idemplooy',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
    },
    idCustomer: {
        allowNull: false,
        field: 'id_customer',
        type: DataTypes.INTEGER,
        reference: {
            model: CUSTOMER_TABLE,
            key: 'idcustomer',
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    },
    idBranch: {
        allowNull: false,
        field: 'id_branch',
        type: DataTypes.INTEGER,
        reference: {
            model: BRANCH_TABLE,
            key: 'idbranch',
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    },
    idDocType: {   
        allowNull: false,
        field: 'id_doc_type',
        type: DataTypes.INTEGER,
        reference: {
            model: DOC_TYPE_TABLE,
            key: 'iddoc_type',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
    },
    date: {
        allowNull: false,
        type: DataTypes.STRING(16),
    },
    tax: {
        type: DataTypes.SMALLINT,
        allowNull: false,
    },
    totalAmount: {
        allowNull: false,
        type: DataTypes.DECIMAL(19,2),
        field: 'total_amount',
    },
    invoicing: {
        allowNull: false,
        defaultValue: 0,
        type: DataTypes.TINYINT,
    },
};

class Order extends Model {
    static associate(models) {
        this.belongsTo(models.Emplooy, {as: 'emplooy', foreignKey: 'idEmplooy'});
        this.belongsTo(models.Customer, {as: 'customer', foreignKey: 'idCustomer'});
        this.belongsTo(models.Branch, {as: 'branch', foreignKey: 'idBranch'});
        this.belongsToMany(models.Product, {through: models.OrderProduct, foreignKey: 'idOrder', otherKey: 'idProduct', as: 'detail'});
    };
  
    static config(sequelize) {
      return {
        sequelize,
        tableName: ORDER_TABLE,
        modelName: 'Order',
        timestamps: false
      };
    };
};

module.exports = {
    Order,
    orderSchema,
    ORDER_TABLE,
};