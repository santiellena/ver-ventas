const docTypes = {
    1: {
        id: 1,
        description: 'DNI',
    },
    2: {
        id: 2,
        description: 'RUC'
    },
};

function getAllDocTypes () {
    return docTypes;
};

function getDocType (id) {
    if(id){
        return docTypes[id];
    };
};

module.exports = {
    getAllDocTypes,
    getDocType,
};