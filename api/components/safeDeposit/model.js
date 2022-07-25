const { Model, DataTypes, Sequelize } = require('sequelize');

const SAFE_DEPOSIT_TABLE = 'safe-deposit';

const safeDepositSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'idsafe_deposit'
    },
    
};

class SafeDeposit extends Model {
    static associate() {
      // associate
    }
  
    static config(sequelize) {
      return {
        sequelize,
        tableName: SAFE_DEPOSIT_TABLE,
        modelName: 'SafeDeposit',
        timestamps: false
      };
    };
};

module.exports = {
    SAFE_DEPOSIT_TABLE,
    safeDepositSchema,
    SafeDeposit,
};