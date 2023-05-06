function setItemSession(id, value, key) {
  if (id != null && value != null) {
    const list = getAllItemSession(key);
    list.push([parseInt(id), parseInt(value)]);
    const newList = JSON.stringify(list);
    sessionStorage.setItem(key, newList);
  }
}

function getItemSession(id, key) {
  if (id != null) {
    const list = getAllItemSession(key);
    if (list.length > 0) {
      const item = list.find((e) => e[0] == parseInt(id));
      if (item) return item;
      else return null;
    } else return null;
  }
}

function updateItemSession(id, newValue, key) {
  if (id != null && newValue != null) {
    const list = getAllItemSession(key);
    clearAllItemSession(key);
    const newList = list.map((e) => {
      if (e[0] == parseInt(id)) {
        e[1] = parseInt(newValue);
        return e;
      } else return e;
    });
    sessionStorage.setItem(key, JSON.stringify(newList));
  }
}

function getAllItemSession(key) {
  //Returns an Array where [n][0] is the product ID and [n][1] is the product quantity
  const list = JSON.parse(sessionStorage.getItem(key));
  if (list) {
    return Object.values(list);
  } else return [];
}

function removeItemSession(id, key) {
  const list = getAllItemSession(key);
  clearAllItemSession(key);
  const newList = list.filter((e) => e[0] != id);
  sessionStorage.setItem(key, JSON.stringify(newList));
}

function clearAllItemSession(key) {
  sessionStorage.removeItem(key);
}
