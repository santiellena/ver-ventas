const storeEmployees = require('../employees/store');
const employees = storeEmployees.getEmployees();
const storeUsers = require('../users/store');
const config = require('../../config/config');

function login (username, password) {
    const branch = config.getBranchDataFromConfig();
    const allUsers = Object.values(storeUsers.getAllUsers());
    let userFound;
    for (const user of allUsers) {
        if(user.username == username && user.password == password){
            if(user.branches.includes(branch.id)){
            userFound = user;
            };
        };
    };
    if(userFound){
        const allEmployees = Object.values(employees);
    let name;
    for (const emplooy of allEmployees) {
        if(userFound.idEmplooy == emplooy.id){
            name = emplooy.name;
            break;
        };
    };
    return {
        name,
        menuStock: userFound.menuStock,
        menuBuys: userFound.menuBuys,
        menuSells: userFound.menuSells,
        menuMaintenance: userFound.menuMaintenance,
        menuQuery: userFound.menuQuery,
        menuAdmin: userFound.menuAdmin,
        menuInvoicing: userFound.menuInvoicing,
    };
    } else {
        return null;
    };
    
};

module.exports = {
    login,
};