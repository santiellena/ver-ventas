const locationsShow = {
    1: {
        id: 1,
        description: 'Pasillo 1',
    },
    2: {
        id: 2,
        description: 'Pasillo 2',
    },
};

const locationsStore = {
    1: {
        id: 1,
        description: 'Estante 1',
    },
    2: {
        id: 2,
        description: 'Estante 2',
    },
};

function getAllLocationsStore () {
    return locationsStore;
};

function getLocationStore (id) {
    if(id){
        return locationsStore[id];
    };
};

function getLocationShow (id) {
    if(id){
        return locationsShow[id];
    };
};

function getAllLocationsShow () {
    return locationsShow;
};

module.exports = {
    getAllLocationsShow,
    getAllLocationsStore,
    getLocationShow,
    getLocationStore,
};