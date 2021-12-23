const sells = {
    33: {
      id: 33,
      date: '2021/12/15',
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
      date: '2021/12/13',
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
    id,
    amount,
    branch,
    customer,
    howPaid,
    details,
}) {

    if(id, amount, branch, customer, howPaid, details) {
        const actualDate = new Date();
        const date = `${actualDate.getDate()}/${actualDate.getMonth()+1}/${actualDate.getFullYear()}`;

        if(sells[id] == undefined){
            sells[id] = {
                id,
                date,
                amount,
                branch,
                customer,
                howPaid,
                details,
            };
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