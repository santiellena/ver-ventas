const storeProducts = require('../products/store');

const sells = {
    33: {
      id: 33,
      date: '2021/12/15-20:34',
      amount: 270,
      branch: 'Principal',
      customer: 'Consumidor final',
      howPaid: 'Contado',
      details: [
        {
            product: 'Ketchup 250ml',
            quantity: 3,
            price: 90,
        },
    ],
    },
    22: {
      id: 22,
      date: '2021/12/13-0:00',
      amount: 480,
      branch: 'Principal',
      customer: 'Baez Pedro',
      howPaid: 'Cuenta corriente',
      details: [
          {
              product: 'Mayonesa 200ml',
              quantity: 3,
              price: 70,
          },
          {
            product: 'Ketchup 250ml',
            quantity: 3,
            price: 90,
        },
      ],
    },
};

function getAllSells () {
    return sells;
};

function getSell (id) {
    if(id){
        return sells[id];
    }
};

function getSellDetail (id) {
    if(id){
        return sells[id].details;
    }
};

function getSellsByDate (from, to) {
    const allSells = getAllSells();
    const sellsIterable = Object.values(allSells);
    const fromYear = from.slice(0,4);
    const fromMonth = from.slice(5,7);
    const fromDay = from.slice(8,10);
    const toYear = to.slice(0,4);
    const toMonth = to.slice(5,7);
    const toDay = to.slice(8,10);

    const sellsByDate = [];

    sellsIterable.map(e => {
        const sellYear = e.date.slice(0,4);
        const sellMonth = e.date.slice(5,7);
        const sellDay = e.date.slice(8,10);

        if(sellYear >= fromYear && sellYear <= toYear){
            if(sellMonth >= fromMonth && sellMonth <= toMonth){
                if(sellDay >= fromDay && sellDay <= toDay){
                    sellsByDate.push(getSell(e.id));
                }
            }
        } 
    });

    return sellsByDate;
};

function addSell ({
    amount,
    branch,
    customer,
    howPaid,
    details,
    priceList,
}) {
    if(amount, branch, customer, howPaid, details, priceList) {
        const actualDate = new Date();
        let minutesString = actualDate.getMinutes().toString();
        let minutes = '';
        if(minutesString.length == 1){
            minutes = '0'+minutesString;
        } else {
            minutes = minutesString;
        }
        const date = `${actualDate.getDate()}/${actualDate.getMonth()+1}/${actualDate.getFullYear()}-${actualDate.getHours()}:${minutes}`; 
        const iterable = Object.entries(sells);
        let id = 0;
        for (let i = 1; i < iterable.length + 1; i++) {
            if(sells[i] == undefined){
                id = i;
                break;
            } else if(sells[i+1] == undefined){
                id = i+1;
                break;
            };
        }; 
        
        const detailsForSell = [];

        details.map(detail => {
            const id = parseInt(detail[0]);
            const minusStock = parseInt(detail[1]);
            storeProducts.updateStockFormSell(id, minusStock);
            const product = storeProducts.getProduct(id);
            let price = 0;


            if(priceList == 'public') {
                price = product.unitPrice;
            } else {
                price = product.wholesalerPrice
            };
            const newDetail = {
                product: product.description,
                quantity: minusStock,
                price,
            };
            detailsForSell.push(newDetail);
        });

        return sells[id] = {
            id,
            date,
            amount,
            branch,
            customer,
            howPaid,
            details: detailsForSell,
        };
    };
};

module.exports = {
    getAllSells,
    getSell,
    getSellDetail,
    getSellsByDate,
    addSell,
};