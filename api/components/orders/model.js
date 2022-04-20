const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('../auth/model');
const { BRANCH_TABLE } = require('../branches/model');
const { CUSTOMER_TABLE } = require('../customers/model');

const ORDER_TABLE = 'order';

const orderSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'idorder'
    },
    idUser: {  
        allowNull: false,
        field: 'id_user',
        type: DataTypes.INTEGER,
        reference: {
            model: USER_TABLE,
            key: 'iduser',
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
    priceList: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'public',
        field: 'price_list',
    },
};

class Order extends Model {
    static associate(models) {
        this.belongsTo(models.User, {as: 'user', foreignKey: 'idUser'});
        this.belongsTo(models.Customer, {as: 'customer', foreignKey: 'idCustomer'});
        this.belongsTo(models.Branch, {as: 'branch', foreignKey: 'idBranch'});
        this.belongsToMany(models.Product, {through: models.OrderProduct, foreignKey: 'idOrder', otherKey: 'idProduct', as: 'details'});
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