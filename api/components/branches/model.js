const { Model, DataTypes, Sequelize } = require('sequelize');
const BRANCH_TABLE = 'sucursal';

const branchSchema = {
    idSucursal: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'idsucursal'
    },
    nombre: {
        allowNull: false,
        type: DataTypes.STRING(30),
    },
    cuit: {
        allowNull: false,
        type: DataTypes.STRING(15),
    },
    direccion: {
        allowNull: false,
        type: DataTypes.STRING(30),
    },
    telefono: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    representante: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
};

class Branch extends Model {
    static associate(models) {
      this.hasMany(models.CashRegister, {
        as: 'cajas',
        foreignKey: 'idSucursal',
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