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

function addDocType (newName) {
    if(newName){
        const iterable = Object.entries(docTypes);
        let newId = 0;
        for (let i = 1; i < iterable.length + 1; i++) {
            if(docTypes[i] == undefined){
                newId = i;
                break;
            } else if(docTypes[i+1] == undefined){
                newId = i+1;
                break;
            };
        };

        return docTypes[newId] = {
            id: newId,
            description: newName,
        };
    };
};

function deleteDocType (id) {
    if(docTypes[id] != undefined) delete docTypes[id];
};

module.exports = {
    getAllDocTypes,
    getDocType,
    addDocType,
    deleteDocType,
};