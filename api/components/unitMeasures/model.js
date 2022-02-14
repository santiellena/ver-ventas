const { Model, DataTypes, Sequelize } = require('sequelize');

const UNIT_MEASURE_TABLE = 'unidad-medida';

const unitMeasureSchema = {
    idUnitMeasure: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'idunidad_medida'
    },
    nombre: {
        allowNull: false,
        type: DataTypes.STRING(45),
    },
    prefijo: {
        allowNull: false,
        type: DataTypes.STRING(5),
    },
};

class UnitMeasure extends Model {
    static associate() {
      // associate
    }
  
    static config(sequelize) {
      return {
        sequelize,
        tableName: UNIT_MEASURE_TABLE,
        modelName: 'UnitMeasure',
        timestamps: false
      };
    };
};

module.exports = {
    UnitMeasure,
    unitMeasureSchema,
    UNIT_MEASURE_TABLE,
};