const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TYPE_TABLE = 'tipo_usuario';

const userTypeSchema = {
    idTipoUsuario: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'idtipo_usuario'
    },
    tipo: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING(30),
    },
};

class UserType extends Model {
    static associate(models) {
        this.hasMany(models.User, { as: 'usuarios', foreignKey: 'idTipoUsuario'});
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