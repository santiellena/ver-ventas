const { Model, DataTypes, Sequelize } = require('sequelize');

const DOC_TYPE_TABLE = 'tipo-documento';

const docTypeSchema = {
    idTipoDocumento: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'idtipo_documento'
    },
    nombre: {
        allowNull: false,
        type: DataTypes.STRING(20),
    },
};

class DocType extends Model {
    static associate(models) {
      this.hasMany(models.Emplooy, {as: 'empleados', foreignKey: 'idTipoDocumento'});
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