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
let hour = '';
    if(actualDate.getHours().toString().length == 1){
        hour = `0${actualDate.getHours()}`;
    } else {
        hour = actualDate.getHours();
    };
    let minutes = '';
    if(actualDate.getMinutes().toString().length == 1){
        minutes = `0${actualDate.getMinutes()}`;
    } else {
        minutes = actualDate.getMinutes();
    };
const date = `${actualDate.getFullYear()}/${month}/${day}-${hour}:${minutes}`;
return date;
};

module.exports = {
    actualDate,
    actualDateAccuracy,
};