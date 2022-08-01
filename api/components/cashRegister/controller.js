const store = require('./store');
const controllerBranches = require('../branches/controller');

const getAll = async (idBranch) => {
    return await store.getAll(idBranch);
};

const getOne = async (id) => {
    return await store.getOne(id);
};

const create = async (data) => {
    if(data){
        return await store.create(data);
    };
};

const update = async (id, changes) => {
    return await store.update(id, changes);
};

const remove = async (id) => {
    return await store.remove(id);
};

const getCashFlow = async (id) => {
    return await store.getCashFlow(id);
};

const getMoneyInAllBoxes = async () => {
    const branches = await controllerBranches.getAll();
    let boxes = [];
    for (const branch of branches) {
        const boxesBranch = await getAll(branch.id);
        boxes = boxes.concat(boxesBranch);
    };
    let allMoney = 0;
    for (const box of boxes) {
        allMoney += parseFloat(box.moneyAmount);
    };
    return allMoney;
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
    getCashFlow,
    getMoneyInAllBoxes,
};