const actualDate = () => {
    const actualDate = new Date();
let month = '';
    if((actualDate.getMonth()+1).toString().length == 1){
        month = `0${actualDate.getMonth()+1}`;
    } else {
        month = actualDate.getMonth()+1;
    };
    let day= '';
    if(actualDate.getDate().toString().length == 1){
        day = `0${actualDate.getDate()}`;
    } else {
        day = actualDate.getDate();
    };
    const date = `${actualDate.getFullYear()}/${month}/${day}`;
    return date;
};

const actualDateAccuracy = () => {
    const actualDate = new Date();
let month = '';
    if((actualDate.getMonth()+1).toString().length == 1){
        month = `0${actualDate.getMonth()+1}`;
    } else {
        month = actualDate.getMonth()+1;
    };
let day= '';
    if(actualDate.getDate().toString().length == 1){
        day = `0${actualDate.getDate()}`;
    } else {
        day = actualDate.getDate();
    };
const date = `${actualDate.getFullYear()}/${month}/${day}-${actualDate.getHours()}:${actualDate.getMinutes()}`;
return date;
};

module.exports = {
    actualDate,
    actualDateAccuracy,
};