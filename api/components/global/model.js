const { Model, DataTypes, Sequelize } = require('sequelize');

const GLOBAL_TABLE = 'global';

const globalSchema = {
    idGlobal: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'idglobal'
    },
    empresa: {
        allowNull: false,
        type: DataTypes.STRING(40),
    },
    razonSocial: {
        allowNull: false,
        type: DataTypes.STRING(40),
        field: 'razon_social',
        unique: true,
    },
    nombreImpuesto: {
        allowNull: false,
        type: DataTypes.STRING(4),
        field: 'nombre_impuesto',
    },
    porcentajeImpuesto: {
        allowNull: false,
        field: 'porcentaje_impuesto',
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