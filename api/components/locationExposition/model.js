const { Model, DataTypes, Sequelize } = require('sequelize');
const { BRANCH_TABLE } = require('../branches/model');
const LOCATION_EXPOSITION_TABLE = 'location-exposition';

const locationExpositionSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'idlocation_exposition'
    },
    description: {
        allowNull: false,
        type: DataTypes.STRING(30),
    },
    idBranch: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_branch',
        reference: {
            model:  BRANCH_TABLE,
            key: 'idbranch',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
};

class LocationExposition extends Model {
    static associate(models) {
      this.belongsTo(models.Branch, {as: 'branch', foreignKey: 'idBranch'});
    };
  
    static config(sequelize) {
      return {
        sequelize,
        tableName: LOCATION_EXPOSITION_TABLE,
        modelName: 'LocationExposition',
        timestamps: false
      };
    };
};

module.exports = {
    LocationExposition,
    locationExpositionSchema,
    LOCATION_EXPOSITION_TABLE,
};