const { Model, DataTypes, Sequelize } = require('sequelize');
const { PEOPLE_TABLE } = require('../people/model');
const CUSTOMER_TABLE = 'customer';

const customerSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'idcustomer'
    },
    idPeople: {
        allowNull: false,
        unique: true,
        type: DataTypes.INTEGER,
        reference: {
            model: PEOPLE_TABLE,
            key: 'idpeople',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    debt: {
        allowNull: false,
        defaultValue: 0,
        type: DataTypes.DECIMAL(19,2),
    },
};

class Customer extends Model {
    static associate(models) {
      this.belongsTo(models.People, {as: 'person', foreignKey: 'idPeople'});
      this.hasMany(models.DebtPaid, {as: 'debtPaid', foreignKey: 'idCustomer'});
    };
  
    static config(sequelize) {
      return {
        sequelize,
        tableName: CUSTOMER_TABLE,
        modelName: 'Customer',
        timestamps: false
      };
    };
};

module.exports = {
    Customer,
    customerSchema,
    CUSTOMER_TABLE,
};