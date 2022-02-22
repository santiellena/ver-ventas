const { Model, DataTypes, Sequelize } = require('sequelize');
const { BRANCH_TABLE } = require('../branches/model');
const { EMPLOOY_TABLE } = require('../employees/model');

const CASH_FLOW_TABLE = 'cashFlow';

const cashFlowSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'idcashFlow'
    },
    idEmplooy: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_emplooy',
        reference: {
            model: EMPLOOY_TABLE,
            key: 'idemplooy',
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    },
    idBranch: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_branch',
        reference: {
            model: BRANCH_TABLE,
            key: 'idbranch',
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    },
    operation: {
        allowNull: false,
        type: DataTypes.STRING(3),
    },
    observation: {
        allowNull: true,
        defaultValue: 'NO',
        type: DataTypes.STRING,
    },
    amount: {
        allowNull: false,
        type: DataTypes.DECIMAL(19,2),
    },
};

class CashFlow extends Model {
    static associate(models) {
        this.belongsTo(models.Branch, {as: 'branch', foreignKey: 'idBranch'});
        this.belongsTo(models.Emplooy, {as: 'emplooy', foreignKey: 'idEmplooy'});
    };
  
    static config(sequelize) {
      return {
        sequelize,
        tableName: CASH_FLOW_TABLE,
        modelName: 'CashFlow',
        timestamps: false
      };
    };
};

module.exports = {
    CashFlow,
    cashFlowSchema,
    CASH_FLOW_TABLE,
};