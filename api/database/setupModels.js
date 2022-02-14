const { Global, globalSchema } = require('../components/global/model');
const { DocType, docTypeSchema } = require('../components/docTypes/model');
const { UnitMeasure, unitMeasureSchema } = require('../components/unitMeasures/model');
const { Department, departmentSchema } = require('../components/departments/model');
const { Branch, branchSchema } = require('../components/branches/model');
const { CashRegister, cashRegisterSchema } = require('../components/cashRegister/model');
const { Emplooy, emplooySchema } = require('../components/employees/model');
const { UserType, userTypeSchema } = require('../components/userTypes/model');
const { User, userSchema } = require('../components/auth/model');


function setupModels(sequelize) {
    Global.init(globalSchema, Global.config(sequelize));
    DocType.init(docTypeSchema, DocType.config(sequelize));
    UnitMeasure.init(unitMeasureSchema, UnitMeasure.config(sequelize));
    Department.init(departmentSchema, Department.config(sequelize));
    Branch.init(branchSchema, Branch.config(sequelize));
    CashRegister.init(cashRegisterSchema, CashRegister.config(sequelize));
    CashRegister.associate(sequelize.models);
    Branch.associate(sequelize.models);
    Emplooy.init(emplooySchema, Emplooy.config(sequelize));
    UserType.init(userTypeSchema, UserType.config(sequelize));
    User.init(userSchema, User.config(sequelize));
    DocType.associate(sequelize.models)
    Emplooy.associate(sequelize.models);
    UserType.associate(sequelize.models);
    User.associate(sequelize.models);
    
};

module.exports = setupModels;