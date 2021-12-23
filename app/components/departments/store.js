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
        let newId = 0;
        for (let i = 1; i < iterable.length + 1; i++) {
            if(departments[i] == undefined){
                newId = i;
                break;
            } else if(departments[i+1] == undefined){
                newId = i+1;
                break;
            };
        };
        console.log(newId);
        return departments[newId] = {
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