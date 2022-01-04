const fs = require('fs');

const provinces = fs.readFileSync(`${__dirname}/provincias.json`, 'utf-8', (err, data) => {
    if(err){
        console.log(err);
    } else {
        return JSON.parse(data);
    };
});

const departments = fs.readFileSync(`${__dirname}/departamentos.json`, 'utf-8', (err, data) => {
    if(err){
        console.log(err);
    } else {
        return JSON.parse(data);
    };
});

const cities = fs.readFileSync(`${__dirname}/localidades.json`, 'utf-8', (err, data) => {
    if(err){
        console.log(err);
    } else {
        return JSON.parse(data);
    };
});

function getAllProvinces () {
    return provinces;
};

function getAllDepartments () {
    return departments;
};

function getAllCities () {
    return cities;
};

function getDepartmentsByProvince (idProvince) {
    const objectDepartments = JSON.parse(getAllDepartments());
    const departments = [];

    objectDepartments.departamentos.map(e => {
        if(e.provincia.id == idProvince){
            departments.push(e);
        }
    });

    return departments;
};

function getCitiesByDepartment (idDepartment) {
    const objectCities = JSON.parse(getAllCities());
    const cities = [];

    objectCities.localidades.map(e => {
        if(e.departamento.id == idDepartment){
            cities.push(e);
        }
    });

    return cities;
};

function getDepartment (idDepartment) {
    const objectDepartments = JSON.parse(getAllDepartments());

    let depto;
    objectDepartments.departamentos.map(e => {
        if(e.id == idDepartment){
            depto = e;

            return;
        };
    });

    if(depto != undefined) {
        return depto;
    } else {
        return null;
    }
};

function getCity (idCity) {
    const objectCities = JSON.parse(getAllCities());
    let city;
    objectCities.localidades.map(e => {
        if(e.id == idCity){
            
            city = e;
            return;
        };
    });

   if(city != undefined) {
       return city;
   } else {
       return null;
   };
};

function getProvince (idProvince) {
    const objectProvinces = JSON.parse(getAllProvinces());
    let prov;
    objectProvinces.provincias.map(e => {
        if(e.id == idProvince){
            
            prov = e;
            return;
        };
    });

    if(prov != undefined) {
        return prov;
    } else {
        return null;
    };
};


module.exports = {
    getAllProvinces,
    getAllDepartments,
    getAllCities,
    getDepartmentsByProvince,
    getCitiesByDepartment,
    getDepartment,
    getCity,
    getProvince,
};