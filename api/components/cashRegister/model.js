const { Model, DataTypes, Sequelize } = require('sequelize');
const { BRANCH_TABLE } = require('../branches/model');

const CASH_REGISTER_TABLE = 'cash-register';

const cashRegisterSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'idbox'
    },
    moneyAmount: {
        allowNull: false,
        default: 0,
        type: DataTypes.DECIMAL(19,2),
        field: 'money_amount',
    },
    idBranch: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_branch',
        reference: {
            model: BRANCH_TABLE,
            key: 'idbranch'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
};

class CashRegister extends Model {
    static associate(models) {
        this.belongsTo(models.Branch, {as: 'branch', foreignKey: 'idBranch'});
        this.hasMany(models.CashFlow, {as: 'cashFlow', foreignKey: 'idCashRegister'});
    };
  
    static config(sequelize) {
      return {
        sequelize,
        tableName: CASH_REGISTER_TABLE,
        modelName: 'CashRegister',
        timestamps: false
      };
    };
};

module.exports = {
    CashRegister,
    cashRegisterSchema,
    CASH_REGISTER_TABLE,
};