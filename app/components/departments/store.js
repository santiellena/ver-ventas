const departments = {
    1: {
        id: 1,
        description: 'Varios',
    },
    2: {
        id: 2,
        description: 'Carniceria',
    }
};

function getAllDepartments () {
    return departments;
};

function getDepartment(id){

    return departments[id];
};

function addDepartment (description) {
    if(description){
        const iterable = Object.entries(departments);
        const newId = iterable.length + 1;

        departments[newId] = {
            id: newId,
            description,
        };
    };
};

function deleteDepartment (id) {
    if(id){
        delete departments[id];
    }
}

module.exports = {
    getAllDepartments,
    getDepartment,
    addDepartment,
    deleteDepartment,
};