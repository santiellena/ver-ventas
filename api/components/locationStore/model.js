const { Model, DataTypes, Sequelize } = require('sequelize');
const { BRANCH_TABLE } = require('../branches/model');
const LOCATION_STORE_TABLE = 'location-store';

const locationStoreSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'idlocation_store'
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

class LocationStore extends Model {
    static associate(models) {
      this.belongsTo(models.Branch, {as: 'branch', foreignKey: 'idBranch'});
    };
  
    static config(sequelize) {
      return {
        sequelize,
        tableName: LOCATION_STORE_TABLE,
        modelName: 'LocationStore',
        timestamps: false
      };
    };
};

module.exports = {
    LocationStore,
    locationStoreSchema,
    LOCATION_STORE_TABLE,
};