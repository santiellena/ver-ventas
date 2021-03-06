const storeCustomers = require('../customers/store');

const actualDate = new Date();
let month = '';
    if((actualDate.getMonth()+1).toString().length == 1){
        month = `0${actualDate.getMonth()+1}`;
    } else {
        month = actualDate.getMonth()+1;
    };
const date = `${actualDate.getFullYear()}/${month}/${actualDate.getDate()}`;

const orders = {
    41242: {
      id: 41242,
      date: date,
      amount: 2200,
      branch: 'Principal',
      emplooy: {id: 1, name:'Administrador'},
      customer: {id: 2, name:'Nombre Desconocido'},
      priceList: 'public',
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
      emplooy: {id: 1, name:'Administrador'},
      customer: {id: 1, name:'Jorge Paoloski'},
      priceList: 'wholesaler',
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
    return orders;
};

function getOrder(id){
    if(id != null && id != undefined) { 
        return orders[id];
    };
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

function addOrder ({
    amount,
    branch,
    customer,
    priceList,
    details,
    emplooy,
}) {
    if(amount && branch && customer && priceList && details){
        const actualDate = new Date();
        let minutesString = actualDate.getMinutes().toString();
        let minutes = '';
        if(minutesString.length == 1){
            minutes = '0'+minutesString;
        } else {
            minutes = minutesString;
        }
        let month = '';
            if((actualDate.getMonth()+1).toString().length == 1){
                month = `0${actualDate.getMonth()+1}`;
        } else {
                month = actualDate.getMonth()+1;
        };
        const date = `${actualDate.getDate()}/${month}/${actualDate.getFullYear()}-${actualDate.getHours()}:${minutes}`; 
        const iterable = Object.entries(orders);
        let newId = 0;
        for (let i = 1; i < iterable.length + 1; i++) {
            if(orders[i] == undefined){
                newId = i;
                break;
            } else if(orders[i+1] == undefined){
                newId = i+1;
                break;
            };
        }; 
        
        const detailsForOrder = [];

        details.map(detail => {
            const id = parseInt(detail[0]);
            const quantity = parseInt(detail[1]);

            const newDetail = {
                idProduct: id,
                quantity,
            };

            detailsForOrder.push(newDetail);
        });


        return orders[newId] = {
            id: newId,
            date,
            amount,
            branch,
            customer,
            priceList,
            emplooy,
            details: detailsForOrder,
        };
    };
};

function deleteOrder (id) {
    if(id){
        delete orders[id];
        return id;
    }
}

module.exports = {
    getAllOrders,
    getOrder,
    getOrderDetails,
    getOrdersByDate,
    addOrder,
    deleteOrder,
};