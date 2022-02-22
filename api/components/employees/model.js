const { Model, DataTypes, Sequelize } = require('sequelize');

const { DOC_TYPE_TABLE } = require('../docTypes/model');

const EMPLOOY_TABLE = 'emplooy';

const emplooySchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'idemplooy'
    },
    lastname: {
        allowNull: false,
        type: DataTypes.STRING(30),
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(15),
    },
    idDocType: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_doc_type',
        references: {
            model: DOC_TYPE_TABLE,
            key: 'iddoc_type'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    numDoc: {
        allowNull: false,
        type: DataTypes.STRING(15),
        field: 'num_doc',
        unique: true,
    },
    dirStreet: {
        allowNull: true,
        type: DataTypes.STRING(30),
        field: 'dir_street',
    },
    phoneNumber: {
        allowNull: true,
        type: DataTypes.BIGINT,
        field: 'phone_number',
    },  
    email: {
        allowNull: true,
        type: DataTypes.STRING(45),
    },
    birthDate: {
        allowNull: true,
        type: DataTypes.STRING(10),
        field: 'birth_date',
    },
};

class Emplooy extends Model {
    static associate(models) {
        this.belongsTo(models.DocType, {as: 'docType', foreignKey: 'idDocType'});
        this.hasOne(models.User, { as: 'user', foreignKey: 'idEmplooy'});
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