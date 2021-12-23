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
      amount: 210,
      branch: 'Principal',
      customer: 'Baez Pedro',
      howPaid: 'Cuenta corriente',
      details: [
          {
              product: 'Mayonesa 200ml',
              quantity: 3,
              price: 70,
          },
      ],
    },
};

function getAllSells () {
    return sells;
};

function getSellDetail (id) {
    if(id){
        return sells[id].details;
    }
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
            }
        }
    }
};

module.exports = {
    getAllSells,
    getSellDetail,
    addSell,
}