const { Model, DataTypes, Sequelize } = require('sequelize');

const DEPARTMENT_TABLE = 'categoria';

const departmentSchema = {
    idDepartmento: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'idcategoria'
    },
    nombre: {
        allowNull: false,
        type: DataTypes.STRING(30),
    },
};

class Department extends Model {
    static associate() {
      // associate
    }
  
    static config(sequelize) {
      return {
        sequelize,
        tableName: DEPARTMENT_TABLE,
        modelName: 'Department',
        timestamps: false
      };
    };
};

module.exports = {
    Department,
    departmentSchema,
    DEPARTMENT_TABLE,
};