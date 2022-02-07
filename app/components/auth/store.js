const storeEmployees = require('../employees/store');
const employees = storeEmployees.getEmployees();
const storeUsers = require('../users/store');
const config = require('../../config/config');

function login (username, password) {
    const branch = config.getBranchDataFromConfig();
    const allEmployyes = Object.values(employees);
    let emplooyFound;
    for (const emplooy of allEmployyes) {
        if(emplooy.login == username && emplooy.password == password){
            emplooyFound = emplooy;
            break;
        };
    };
    if(emplooyFound){
        const allUsers = Object.values(storeUsers.getAllUsers());
    for (const user of allUsers) {
        if(user.idEmplooy == emplooyFound.id){
            if(user.branches.includes(branch.id)){
                return {
                    name: emplooyFound.name,
                    menuStock: user.menuStock,
                    menuBuys: user.menuBuys,
                    menuSells: user.menuSells,
                    menuMaintenance: user.menuMaintenance,
                    menuQuery: user.menuQuery,
                    menuAdmin: user.menuAdmin,
                    menuInvoicing: user.menuInvoicing,
                };
            };
            
        };
    };
    } else {
        return null;
    };
    
};

module.exports = {
    login,
};