const { Model, DataTypes, Sequelize } = require('sequelize');

const { DOC_TYPE_TABLE } = require('../docTypes/model');

const EMPLOOY_TABLE = 'empleado';

const emplooySchema = {
    idEmpleado: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'idempleado'
    },
    apellidos: {
        allowNull: false,
        type: DataTypes.STRING(30),
    },
    nombre: {
        allowNull: false,
        type: DataTypes.STRING(15),
    },
    idTipoDocumento: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_tipo_documento',
        references: {
            model: DOC_TYPE_TABLE,
            key: 'idtipo_documento'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    numeroDocumento: {
        allowNull: false,
        type: DataTypes.STRING(15),
        field: 'numero_documento',
        unique: true,
    },
    direccion: {
        allowNull: true,
        type: DataTypes.STRING(30),
    },
    telefono: {
        allowNull: true,
        type: DataTypes.BIGINT,
    },  
    email: {
        allowNull: true,
        type: DataTypes.STRING(45),
    },
    fechaNacimiento: {
        allowNull: true,
        type: DataTypes.STRING(10),
        field: 'fecha_nacimiento',
    },
};

class Emplooy extends Model {
    static associate(models) {
        this.belongsTo(models.DocType, {as: 'tipoDocumento', foreignKey: 'idTipoDocumento'});
        this.hasOne(models.User, { as: 'usuario', foreignKey: 'idEmpleado'});
    };
  
    static config(sequelize) {
      return {
        sequelize,
        tableName: EMPLOOY_TABLE,
        modelName: 'Emplooy',
        timestamps: false
      };
    };
};

module.exports = {
    Emplooy,
    emplooySchema,
    EMPLOOY_TABLE,
};