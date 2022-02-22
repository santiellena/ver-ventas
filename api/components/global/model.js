const { Model, DataTypes, Sequelize } = require('sequelize');

const GLOBAL_TABLE = 'global';

const globalSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'idglobal'
    },
    fantasyName: {
        allowNull: false,
        type: DataTypes.STRING(40),
        field: 'fantasy_name',
    },
    bussinesName: {
        allowNull: false,
        type: DataTypes.STRING(40),
        field: 'bussines_name',
        unique: true,
    },
    taxName: {
        allowNull: false,
        type: DataTypes.STRING(4),
        field: 'tax_name',
    },
    taxPercentage: {
        allowNull: false,
        field: 'tax_percentage',
        type: DataTypes.DECIMAL(2),
        defaultValue: 0, 
    },
};

class Global extends Model {
    static associate() {
      // associate
    }
  
    static config(sequelize) {
      return {
        sequelize,
        tableName: GLOBAL_TABLE,
        modelName: 'Global',
        timestamps: false
      };
    };
};

module.exports = {
    Global,
    globalSchema,
    GLOBAL_TABLE,
};