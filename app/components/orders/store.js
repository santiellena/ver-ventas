const storeCustomers = require('../customers/store');

const actualDate = new Date();
const date = `${actualDate.getDate()}/${actualDate.getMonth()+1}/${actualDate.getFullYear()}`;

const orders = {
    41242: {
      id: 41242,
      date: date,
      amount: 2200,
      branch: 'Principal',
      customer: 2,
    },
    21414: {
      id: 21414,
      date: date,
      amount: 15000,
      branch: 'Principal',
      customer: 4,
      details: [
          {
                idProducto: 1,
                quantity: 3,
          },
          {
                idProducto: 2,
                quantity: 2,
          }
      ],
    },
};

function getAllOrders() {
    const allOrders = orders;
    const ordersIterable = Object.values(allOrders);
    ordersIterable.map(e => {
        const customer = storeCustomers.getCustomer(e.customer);
        const order = allOrders[e.id];
        order.customer = customer.name;
        allOrders[e.id] = order;
    });
    
    return allOrders;
};

function getOrder(id){
    if(id != null && id != undefined) {
        const order = orders[id];
        const customer = storeCustomers.getCustomer(order.customer);
        order.customer = customer.name;
        return order;
    }
};

module.exports = {
    getAllOrders,
    getOrder,
}