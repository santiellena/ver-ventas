


const changeBOFDay = () => {
    const dates = document.getElementsByClassName('date-sell');
    const arrDates = [...dates];
    const actualDate = new Date();
    arrDates.map(e => {
        e.innerText = `${actualDate.getDate()}/${actualDate.getMonth()+1}/${actualDate.getFullYear()}`;
    });
}

setInterval(changeBOFDay(), 86400)



const hours = document.getElementsByClassName('hour-sell');
const arrHours = [...hours];

/*
function refreshTime(arr) {
    var dateString = new Date().toLocaleString();
    var formattedString = dateString.replace(", ", " - ");
    arr.map(e => {
        e.innerHTML = formattedString;
    });
}

setInterval(refreshTime(arrHours), 1000); 
*/


function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  arrHours.map(e => {
      e.innerHTML =  h + ":" + m + ":" + s;
  })
  var t = setTimeout(startTime, 500);
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}