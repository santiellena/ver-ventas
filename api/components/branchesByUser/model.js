const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('../auth/model');
const { BRANCH_TABLE } = require('../branches/model');

const BRANCH_USER_TABLE = 'branch_user';

const branchUserSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'idbranch_user'
    },
    idUser: {
        allowNull: false,
        field: 'id_user',
        type: DataTypes.INTEGER,
        reference: {
            model: USER_TABLE,
            key: 'iduser',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    idBranch: {
        allowNull: false,
        field: 'id_branch',
        type: DataTypes.INTEGER,
        reference: {
            model: BRANCH_TABLE,
            key: 'idbranch',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
};

class BranchUser extends Model {
    static associate(models) {
    };
  
    static config(sequelize) {
      return {
        sequelize,
        tableName: BRANCH_USER_TABLE,
        modelName: 'BranchUser',
        timestamps: false
      };
    };
};

module.exports = {
    BranchUser,
    branchUserSchema,
    BRANCH_USER_TABLE,
};