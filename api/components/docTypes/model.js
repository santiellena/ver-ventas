const { Model, DataTypes, Sequelize } = require('sequelize');

const DOC_TYPE_TABLE = 'doc-type';

const docTypeSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'iddoc_type'
    },
    description: {
        allowNull: false,
        type: DataTypes.STRING(20),
    },
};

class DocType extends Model {
    static associate(models) {
      this.hasMany(models.Emplooy, {as: 'employees', foreignKey: 'idDocType'});
    };
  
    static config(sequelize) {
      return {
        sequelize,
        tableName: DOC_TYPE_TABLE,
        modelName: 'DocType',
        timestamps: false
      };
    };
};

module.exports = {
    DocType,
    docTypeSchema,
    DOC_TYPE_TABLE,
};