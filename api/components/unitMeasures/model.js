const { Model, DataTypes, Sequelize } = require('sequelize');

const UNIT_MEASURE_TABLE = 'unit-measure';

const unitMeasureSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'idunit_measure'
    },
    longDescription: {
        allowNull: false,
        type: DataTypes.STRING(45),
        field: 'long_description',
    },
    shortDescription: {
        allowNull: false,
        type: DataTypes.STRING(5),
        field: 'short_description',
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