const { Model, DataTypes, Sequelize } = require('sequelize');
const { PEOPLE_TABLE } = require('../people/model');
const SUPPLIER_TABLE = 'supplier';

const supplierSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'idsupplier'
    },
    idPeople: {
        allowNull: false,
        unique: true,
        type: DataTypes.INTEGER,
        reference: {
            model: PEOPLE_TABLE,
            key: 'idpeople',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
};

class Supplier extends Model {
    static associate(models) {
      this.belongsTo(models.People, {as: 'person', foreignKey: 'idPeople'});
    };
  
    static config(sequelize) {
      return {
        sequelize,
        tableName: SUPPLIER_TABLE,
        modelName: 'Supplier',
        timestamps: false
      };
    };
};

module.exports = {
    Supplier,
    supplierSchema,
    SUPPLIER_TABLE,
};