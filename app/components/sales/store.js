const storeProducts = require('../products/store');

const sales = {
    1: {
        id: 1,
        idProduct: 1,
        fromDate: '2022/01/24',
        toDate: '2022/01/31',
        discount: 20,
        productChange: 1,
    },
};

function addSale ({
    idProduct,
    fromDate,
    toDate,
    discount,
}) {
    let productChange = 1;
    const iterable = Object.values(sales);

    for (const sale of iterable) {
        if(sale.idProduct == idProduct){
            deleteSale(sale.id);
            productChange = 0;
        };
    };
        let newId = 0;
        for (let i = 1; i < iterable.length + 1; i++) {
            if(sales[i] == undefined){
                newId = i;
                break;
            } else if(sales[i+1] == undefined){
                newId = i+1;
                break;
            };
        };

        

    if(sales[newId] == undefined && idProduct && fromDate && toDate && discount){

        return sales[newId] = {
            id: newId,
            idProduct,
            fromDate,
            toDate,
            discount,
            productChange,
        };
    };
};

function getSaleByProduct (idProduct) {
    const allSales = Object.values(sales);
    const actualDate = new Date();
    let month = '';
    if((actualDate.getMonth()+1).toString().length == 1){
        month = `0${actualDate.getMonth()+1}`;
    } else {
        month = actualDate.getMonth()+1;
    };
    const date =  `${actualDate.getFullYear()}/${month}/${actualDate.getDate()}`;

    const actualYear = date.slice(0,4);
    const actualMonth = date.slice(5,7);
    const actualDay = date.slice(8,10);
    
    for (const sale of allSales) {
        if(sale.idProduct == idProduct){
            const fromYear = sale.fromDate.slice(0,4);
            const fromMonth = sale.fromDate.slice(5,7);
            const fromDay = sale.fromDate.slice(8,10);
            const toYear = sale.toDate.slice(0,4);
            const toMonth = sale.toDate.slice(5,7);
            const toDay = sale.toDate.slice(8,10);
            if(actualYear >= fromYear && actualYear <= toYear){
                if(actualMonth >= fromMonth && actualMonth <= toMonth){
                    if(actualDay >= fromDay && actualDay <= toDay){
                        
                        return sale;
                    } deleteSale(sale.id);
                } deleteSale(sale.id);
            } else deleteSale(sale.id);
        };
    };

    return 0;
};

function deleteSale (id) {
    if(sales[id] != undefined) {
        storeProducts.changeSaleStatus(sales[id].idProduct);
        delete sales[id];
    };
    if(sales[id] == undefined) return 1
    else return null;
};

function getAllSales () {
    return sales;
};

function getAllSalesWithProducts () {
    const allSales = Object.values(sales);

    const allSalesWithProduct = allSales.map(sale => {
        const product = storeProducts.getProduct(sale.idProduct);
        if(product) sale.product = product;
        return sale;
    });

    return allSalesWithProduct;
};

module.exports = { 
    addSale,
    getSaleByProduct,
    getAllSales,
    getAllSalesWithProducts,
    deleteSale,
};