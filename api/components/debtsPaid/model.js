const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('../customers/model');

const DEBT_PAID_TABLE = 'debt_paid';

const debtPaidSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'iddebt_paid'
    },
    idCustomer: {
        type: DataTypes.INTEGER,
        field: 'id_customer',
        allowNull: false,
        reference: {
            model: CUSTOMER_TABLE,
            key: 'idcustomer',
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    },
    amount: {
        allowNull: false,
        type: DataTypes.DECIMAL(19,2),
    },
    date: {
        allowNull: false,
        type: DataTypes.STRING(10),
    },
    registerDate: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        field: 'register_date',
    },
};

class DebtPaid extends Model {
    static associate(models) {
    };
  
    static config(sequelize) {
      return {
        sequelize,
        tableName: DEBT_PAID_TABLE,
        modelName: 'DebtPaid',
        timestamps: false
      };
    };
};

module.exports = {
    DebtPaid,
    debtPaidSchema,
    DEBT_PAID_TABLE,
};