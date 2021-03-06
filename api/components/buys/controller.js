const store = require('./store');
const boom = require('@hapi/boom');
const config = require('../../config');
const storeBuyDetails = require('../detailBuys/store.js');

const getAll = async () => {
    return await store.getAll();
};

const getOne = async (id) => {
    return await store.getOne(id);
};

const create = async (data) => {
    const buy = await store.create(data);
    for (const detail of data.details) {
          await storeBuyDetails.create({
              idProduct: detail.idProduct,
              idBuy: buy.id,
              quantity: detail.quantity,
              price: detail.price,
          });
    };
    return buy;
};

const update = async (id, changes) => {
    return await store.update(id, changes);
};

const remove = async (id) => {
    await storeBuyDetails.removeByBuy(id);
    return await store.remove(id);
};

const getByDate = async (from, to) => {
    const allBuys = await store.getAll();
    const fromYear = from.slice(0,4);
    const fromMonth = from.slice(5,7);
    const fromDay = from.slice(8,10);
    const toYear = to.slice(0,4);
    const toMonth = to.slice(5,7);
    const toDay = to.slice(8,10);

    const buysByDate = allBuys.map(e => {
        const buyYear = e.date.slice(0,4);
        const buyMonth = e.date.slice(5,7);
        const buyDay = e.date.slice(8,10);

        if(buyYear >= fromYear && buyYear <= toYear){
            if(buyMonth >= fromMonth && buyMonth <= toMonth){
                if(buyDay >= fromDay && buyDay <= toDay){
                    return e;
                };
            }
       } 
   });

   return buysByDate;
};

module.exports = {
    getAll,
    getOne,
    getByDate,
    create,
    update,
    remove,
};
