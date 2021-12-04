function setItemSession(id, value) {
    if(id != null && value != null){
        sessionStorage.setItem(id, value);
    }
}

function getItemSession(id) {
    if(id != null){
        return sessionStorage.getItem(id);
    }
}

function updateItemSession(id, newValue) {
    if(id != null && newValue != null){
        sessionStorage.removeItem(id);
        sessionStorage.setItem(id, newValue);
    }
}

function getAllItemSession() { //Returns an Array where [n][0] is the product ID and [n][1] is the product quantity

    return Object.entries(sessionStorage);
}

function removeItemSession(id) {
    sessionStorage.removeItem(id);
}

function clearAllItemSession() {
    sessionStorage.clear();
}