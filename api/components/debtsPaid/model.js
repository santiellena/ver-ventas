const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('../customers/model');
const { USER_TABLE } = require('../auth/model');

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
    idUser: {
        type: DataTypes.INTEGER,
        field: 'id_user',
        allowNull: false,
        reference: {
            model: USER_TABLE,
            key: 'iduser',
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
    howPaid: {
        field: 'how_paid',
        allowNull: false, 
        type: DataTypes.STRING,
    },
    observation: {
        allowNull: false,
        type: DataTypes.STRING,
    },
};

class DebtPaid extends Model {
    static associate(models) {
        this.belongsTo(models.User, { as: 'user', foreignKey: 'idUser'});
        this.belongsTo(models.Customer, { as: 'customer', foreignKey: 'idCustomer'});
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