const { Model, DataTypes, Sequelize } = require('sequelize');
const { EMPLOOY_TABLE } = require('../employees/model');
const { USER_TYPE_TABLE } = require('../userTypes/model');
const USER_TABLE = 'user';

const userSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    field: 'iduser'
  },
  idEmplooy: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'id_emplooy',
    unique: true,
    references: {
      model: EMPLOOY_TABLE,
      key: 'idemplooy'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  idUserType: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'id_user_type',
    references: {
      model: USER_TYPE_TABLE,
      key: 'iduser_type'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  registerDate: {
    field: 'register_date',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  menuStock: {
    field: 'menu_stock',
    type: DataTypes.TINYINT,
    allowNull: false,
    default: 0,
  },
  menuBuys: {
    field: 'menu_buys',
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },
  menuSells: {
    field: 'menu_sells',
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },
  menuMaintenance: {
    field: 'menu_maintenance',
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },
  menuQueries: {
    field: 'menu_queries',
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },
  menuAdmin: {
    field: 'menu_admin',
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },
  menuInvoicing: {
    field: 'menu_invoicing',
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING(15),
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

class User extends Model {
    static associate(models) {
      this.belongsTo(models.UserType, {as: 'userType', foreignKey: 'idUserType'});
      this.belongsTo(models.Emplooy, {as: 'emplooy', foreignKey: 'idEmplooy'});
      this.belongsToMany(models.Branch, {through: models.BranchUser, foreignKey: 'idUser', otherKey: 'idBranch', as: 'branches'});
    };
  
    static config(sequelize) {
      return {
        sequelize,
        tableName: USER_TABLE,
        modelName: 'User',
        timestamps: false
      };
    };
};

module.exports = {
    User,
    userSchema,
    USER_TABLE,
};