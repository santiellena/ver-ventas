const { Model, DataTypes, Sequelize } = require('sequelize');

const BUY_TABLE = 'buy';
const { USER_TABLE } = require('../auth/model');
const { BRANCH_TABLE } = require('../branches/model');
const { SUPPLIER_TABLE } = require('../suppliers/model');
const { DOC_TYPE_TABLE } = require('../docTypes/model');

const buySchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'idbuy'
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
        onDelete: 'NO ACTION',
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
        onDelete: 'NO ACTION',
    },
    idSupplier: {
        allowNull: false,
        field: 'id_supplier',
        type: DataTypes.INTEGER,
        reference: {
            model: SUPPLIER_TABLE,
            key: 'idsupplier',
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    },
    idDocType: {
        allowNull: false,
        field: 'id_doc_type',
        type: DataTypes.INTEGER,
        reference: {
            model: DOC_TYPE_TABLE,
            key: 'iddoc_type',
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    },
    serieCheck: {
        allowNull: false,
        type: DataTypes.STRING(15),
        field: 'serie_check',
    },
    numberCheck: {
        allowNull: false,
        type: DataTypes.BIGINT,
        field: 'number_check',
    },
    date: {
        allowNull: false,
        type: DataTypes.STRING(16),
    },
    totalAmount: {
        allowNull: false,
        type: DataTypes.DECIMAL(19,2),
        field: 'total_amount'
    },
    howPaid: {
        allowNull: false, 
        type: DataTypes.STRING(20),
    },
};

class Buy extends Model {
    static associate(models) {
        this.belongsTo(models.User, {as: 'user', foreignKey: 'idUser'});
        this.belongsTo(models.Branch, {as: 'branch', foreignKey: 'idBranch'});
        this.belongsTo(models.Supplier, {as: 'supplier', foreignKey: 'idSupplier'});
        this.belongsTo(models.DocType, {as: 'docType', foreignKey: 'idDocType'});
        this.belongsToMany(models.Product, {
            through: models.BuyProduct,
            foreignKey: 'idBuy',
            otherKey: 'idProduct',
            as: 'detail',
        });
    };
  
    static config(sequelize) {
      return {
        sequelize,
        tableName: BUY_TABLE,
        modelName: 'Buy',
        timestamps: false
      };
    };
};

module.exports = {
    Buy,
    buySchema,
    BUY_TABLE,
};