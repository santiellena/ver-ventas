const { Model, DataTypes, Sequelize } = require('sequelize');
const { BRANCH_TABLE } = require('../branches/model');

const CASH_REGISTER_TABLE = 'caja';

const cashRegisterSchema = {
    idCaja: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'idcaja'
    },
    dinero: {
        allowNull: false,
        default: 0,
        type: DataTypes.DECIMAL(19,2),
    },
    idSucursal: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id-sucursal',
        references: {
            model: BRANCH_TABLE,
            key: 'idsucursal'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
};

class CashRegister extends Model {
    static associate(models) {
        this.belongsTo(models.Branch, {as: 'sucursal', foreignKey: 'idSucursal'});
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