const { Model, DataTypes, Sequelize } = require('sequelize');
const { EMPLOOY_TABLE } = require('../employees/model');
const { USER_TYPE_TABLE } = require('../userTypes/model');
const USER_TABLE = 'usuario';

const userSchema = {
  idUsuario: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    field: 'idusuario'
  },
  idEmpleado: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'id_empleado',
    unique: true,
    references: {
      model: EMPLOOY_TABLE,
      key: 'idempleado'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  idTipoUsuario: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'id_tipo_usuario',
    references: {
      model: USER_TYPE_TABLE,
      key: 'idtipo_usuario'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  fechaRegistro: {
    field: 'fecha_registro',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  menuAlmacen: {
    field: 'menu_almacen',
    type: DataTypes.TINYINT,
    allowNull: false,
    default: 0,
  },
  menuCompras: {
    field: 'menu_compras',
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },
  menuVentas: {
    field: 'menu_ventas',
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },
  menuMantenimiento: {
    field: 'menu_mantenimiento',
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },
  menuConsultas: {
    field: 'menu_consultas',
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },
  menuAdmin: {
    field: 'menu_administrador',
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },
  menuFacturacion: {
    field: 'menu_facturacion',
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
      this.belongsTo(models.UserType, {as: 'tipoUsuario', foreignKey: 'idTipoUsuario'});
      this.belongsTo(models.Emplooy, {as: 'empleado', foreignKey: 'idEmpleado'});
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