const { Model, DataTypes, Sequelize } = require('sequelize');
const { DOC_TYPE_TABLE } = require('../docTypes/model');
const PEOPLE_TABLE = 'people';

const peopleSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'idpeople'
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(30),
    },
    idDocType: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_doc_type',
        references: {
            model:  DOC_TYPE_TABLE,
            key: 'iddoc_type',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    numDoc: {
        allowNull: false,
        type: DataTypes.STRING(15),
        field: 'num_doc',
    },
    idDirDepartment: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_dir_department',
    },
    idDirProvince: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_dir_province',
    },
    idDirCity: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_dir_city',
    },
    dirPostCode: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'dir_post_code',
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
    cbu: {
        allowNull: true,
        type: DataTypes.BIGINT,
    },
};

class People extends Model {
    static associate(models) {
      this.belongsTo(models.Branch, {as: 'docType', foreignKey: 'idDocType'});
    };
  
    static config(sequelize) {
      return {
        sequelize,
        tableName: PEOPLE_TABLE,
        modelName: 'People',
        timestamps: false
      };
    };
};

module.exports = {
    People,
    peopleSchema,
    PEOPLE_TABLE,
};