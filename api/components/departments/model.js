const { Model, DataTypes, Sequelize } = require('sequelize');

const DEPARTMENT_TABLE = 'department';

const departmentSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'iddepartment'
    },
    description: {
        allowNull: false,
        type: DataTypes.STRING(30),
    },
};

class Department extends Model {
    static associate(models) {
        this.hasMany(models.Product, {as: 'products', foreignKey: 'idDepartment'});
    };
  
    static config(sequelize) {
      return {
        sequelize,
        tableName: DEPARTMENT_TABLE,
        modelName: 'Department',
        timestamps: false,
      };
    };
};

module.exports = {
    Department,
    departmentSchema,
    DEPARTMENT_TABLE,
};