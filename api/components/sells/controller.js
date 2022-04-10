const store = require('./store');
const storeSellDetails = require('../detailSells/store');
const storeBranch = require('../branches/store')

const getAll = async () => {
    return await store.getAll();
};

const getOne = async (id) => {
    return await store.getOne(id);
};

const getByDate = async (from, to) => {
    const sellsIterable = await store.getAll();
    const fromYear = from.slice(0,4);
    const fromMonth = from.slice(5,7);
    const fromDay = from.slice(8,10);
    const toYear = to.slice(0,4);
    const toMonth = to.slice(5,7);
    const toDay = to.slice(8,10);

    const sellsByDate = sellsIterable.map(async e => {
        const sellYear = e.date.slice(0,4);
        const sellMonth = e.date.slice(5,7);
        const sellDay = e.date.slice(8,10);

        if(sellYear >= fromYear && sellYear <= toYear){
            if(sellMonth >= fromMonth && sellMonth <= toMonth){
                if(sellDay >= fromDay && sellDay <= toDay){
                    return await store.getOne(e.id);
                }
            }
        } 
    });

    return sellsByDate;
};

const create = async (data) => {
    const { nextNumber, serie } = await storeBranch.getNextSerieAndNumber(data.idBranch);
    data.numberCheck = nextNumber;
    data.serieCheck = serie;
    const sell = await store.create(data);
    for (const detail of data.details) {
          await storeSellDetails.create({
              idProduct: detail.idProduct,
              idSell: sell.id,
              quantity: detail.quantity,
              price: detail.price,
          });
    };
    await storeBranch.updateLastNumber(data.idBranch);
    return sell;
};

const update = async (id, changes) => {
    return await store.update(id, changes);
};

const remove = async (id) => {
    await storeSellDetails.removeBySell(id);
    return await store.remove(id);
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
    getByDate,
};