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
    
};

module.exports = {
    getMeasure,
    getAllMeasures,
    addMeasure,
};