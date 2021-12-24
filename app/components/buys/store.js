const actualDate = new Date();
const date = `${actualDate.getFullYear()}/${actualDate.getMonth()+1}/${actualDate.getDate()}-${actualDate.getHours()}:${actualDate.getMinutes()}`;
const storeProducts = require('../products/store');

const buys = {
    1: {
        id: 1,
        date,
        amount: 3500,
        emplooy: 'Administrador',
        branch: 'Principal',
        supplier: 'LA CAMPESINA S.A.S',
        howPaid: 'Transferencia Bancaria',
        details: [
            {
                product: 'Mayonesa 200ml',
                quantity: 20,
                price: 70,
            },
            {
                product: 'Ketchup 250ml',
                quantity: 25,
                price: 84,
            },
        ],
    },
};

function getAllBuys(){
    return buys;
};

function getBuy(id){
    if(id != undefined && id != null){
        return buys[id];
    } else {
        return null;
    }
};

function getBuysByDate(from, to){
    const allBuys = getAllBuys();
    const buysIterable = Object.values(allBuys);
    const fromYear = from.slice(0,4);
    const fromMonth = from.slice(5,7);
    const fromDay = from.slice(8,10);
    const toYear = to.slice(0,4);
    const toMonth = to.slice(5,7);
    const toDay = to.slice(8,10);

    const buysByDate = [];

    buysIterable.map(e => {
        const buyYear = e.date.slice(0,4);
        const buyMonth = e.date.slice(5,7);
        const buyDay = e.date.slice(8,10);

        if(buyYear >= fromYear && buyYear <= toYear){
            if(buyMonth >= fromMonth && buyMonth <= toMonth){
                if(buyDay >= fromDay && buyDay <= toDay){
                    buysByDate.push(getBuy(e.id));
                }
            }
        } 
    });

    return buysByDate;
};

function getBuyDetail(id) {
    if(id != undefined && id != null){
        return buys[id].details;
    } else {
        return null;
    }
};

function addBuy({
    emplooy,
    branch,
    supplier,
    howPaid,
    details,
    date,
}){
    if(emplooy  && branch && supplier && howPaid && details){
        const iterableObject = Object.entries(buys);
        const newId = iterableObject.length + 1;
        let amount = 0;       

        for (const detail of details) {
            const quantityNumber = parseFloat(detail.quantity);
            const priceNumber = parseFloat(detail.price);
            const product = storeProducts.getProduct(detail.product);
            detail.product = product.description;
            amount =  amount + quantityNumber * priceNumber;
        }

        return buys[newId] = {
            id: newId,
            supplier: supplier.name,
            emplooy,
            branch,
            howPaid,
            details,
            amount,
            date,
        };
    };
};

function deleteBuy(id){
    if(id != undefined && id != null){
        delete buys[id];
    };
};

module.exports = {
    getBuy,
    getAllBuys,
    getBuysByDate,
    getBuyDetail,
    addBuy,
    deleteBuy,
}