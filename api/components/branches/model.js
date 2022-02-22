const { Model, DataTypes, Sequelize } = require('sequelize');
const BRANCH_TABLE = 'branch';

const branchSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'idbranch'
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(30),
    },
    cuit: {
        allowNull: false,
        type: DataTypes.STRING(15),
    },
    dirStreet: {
        allowNull: false,
        type: DataTypes.STRING(30),
        field: 'dir_street'
    },
    phoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'phone_number',
    },
    email: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    representative: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    lastNumber: {
        allowNull: false,
        defaultValue: 0,
        type: DataTypes.BIGINT,
    },
    lastSerie: {
        allowNull: false,
        defaultValue: 0,
        type: DataTypes.BIGINT,
    },
};

class Branch extends Model {
    static associate(models) {
      this.hasMany(models.CashRegister, {
        as: 'boxes',
        foreignKey: 'idBranch',
      });
      this.hasMany(models.CashFlow, {
          as: 'cashFlow',
          foreignKey: 'idBranch',
      });
    };
  
    static config(sequelize) {
      return {
        sequelize,
        tableName: BRANCH_TABLE,
        modelName: 'Branch',
        timestamps: false
      };
    };
};

module.exports = {
    Branch,
    branchSchema,
    BRANCH_TABLE,
};