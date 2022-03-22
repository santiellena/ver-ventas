const measures = {
    1: {
        id: 1,
        shortDescription: 'U',
        longDescription: 'Unidad',
    },
    2: {
        id: 2,
        shortDescription: 'Gr.',
        longDescription: 'Gramos',
    },
    3: {
        id: 3,
        shortDescription: 'Kg.',
        longDescription: 'Kilogramo',
    },
    4: {
        id: 4,
        shortDescription: 'Ml.',
        longDescription: 'Mililitro',
    },
    5: {
        id: 5,
        shortDescription: 'L.',
        longDescription: 'Litros',
    },
};

function getMeasure (id) {
    return measures[id];
};

function getAllMeasures () {
    return measures;
};

function addMeasure ({
    shortDescription,
    longDescription,
}) {
    const iterable = Object.entries(measures);
    let newId = 0;
    for (let i = 1; i < iterable.length + 1; i++) {
        if(measures[i] == undefined){
            newId = i;
            break;
        } else if(measures[i+1] == undefined){
            newId = i+1;
            break;
        };
    };

    return measures[newId] = {
        id: newId,
        shortDescription,
        longDescription,
    };
};

function deleteMeasure (id) {
    if(measures[id] != undefined) delete measures[id];
};

module.exports = {
    getMeasure,
    getAllMeasures,
    addMeasure,
    deleteMeasure,
};