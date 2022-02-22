const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TYPE_TABLE = 'user-type';

const userTypeSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'iduser_type'
    },
    type: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING(30),
    },
};

class UserType extends Model {
    static associate(models) {
        this.hasMany(models.User, { as: 'users', foreignKey: 'idUserType'});
    };
  
    static config(sequelize) {
      return {
        sequelize,
        tableName: USER_TYPE_TABLE,
        modelName: 'UserType',
        timestamps: false
      };
    };
};

module.exports = {
    UserType,
    userTypeSchema,
    USER_TYPE_TABLE,
};