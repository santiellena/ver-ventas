const storeCustomers = require('../customers/store');

const actualDate = new Date();
const date = `${actualDate.getFullYear()}/${actualDate.getMonth()+1}/${actualDate.getDate()}`;

const orders = {
    41242: {
      id: 41242,
      date: date,
      amount: 2200,
      branch: 'Principal',
      customer: 2,
      details: [
        {
            idProduct: 1, 
            quantity: 1,
        },
        {
            idProduct:2, 
            quantity: 5,
        }
      ],
    },
    21414: {
      id: 21414,
      date: date,
      amount: 15000,
      branch: 'Principal',
      customer: 4,
      details: [
          {
                idProduct: 1,
                quantity: 3,
          },
          {
                idProduct: 2,
                quantity: 2,
          }
      ],
    },
};

function getAllOrders() {
    let allOrders = orders;
    
    const ordersIterable = Object.values(allOrders);
    ordersIterable.map(e => {
        if(typeof e.customer == 'string'){
            return orders;
        }
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
        if(typeof order.customer == 'string'){
            return order;
        }
        const customer = storeCustomers.getCustomer(order.customer);
        order.customer = customer.name;
        return order;
    }
};

function getOrderDetails(idOrder) {
    if(idOrder != null && idOrder != undefined) {
        const order = orders[idOrder];
        return order.details;
    };
};

function getOrdersByDate(from, to){ // yyyy-mm-dd
    const allOrders = getAllOrders();
    const ordersIterable = Object.values(allOrders);
    const fromYear = from.slice(0,4);
    const fromMonth = from.slice(5,7);
    const fromDay = from.slice(8,10);
    const toYear = to.slice(0,4);
    const toMonth = to.slice(5,7);
    const toDay = to.slice(8,10);

    const ordersByDate = [];

    ordersIterable.map(e => {
        const orderYear = e.date.slice(0,4);
        const orderMonth = e.date.slice(5,7);
        const orderDay = e.date.slice(8,10);

        if(orderYear >= fromYear && orderYear <= toYear){
            if(orderMonth >= fromMonth && orderMonth <= toMonth){
                if(orderDay >= fromDay && orderDay <= toDay){
                    ordersByDate.push(getOrder(e.id));
                }
            }
        } 
    });

    return ordersByDate;
};

module.exports = {
    getAllOrders,
    getOrder,
    getOrderDetails,
    getOrdersByDate,
}