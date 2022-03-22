const config = require("../../config/config");
const axios = require("axios");
const { getSessionToken } = require("../../config/auth");
const storeDirections = require('../directions/store');
const storeDocTypes = require('../docTypes/store');

const fs = require('fs');

const network = fs.readFileSync(`${__dirname}/../../config/network.json`, {encoding: 'utf-8'}, (err, data) => {
    if(err) {
        throw new Error(err);
    } else {
        return JSON.parse(data);
    };
});

function getUrl () {
    const net = JSON.parse(network);
    return net.url;
};

async function getAllSuppliers() {
  const response = await axios({
    method: "GET",
    url: `${getUrl()}/api/supplier`,
    headers: {
      authorization: `Bearer ${await getSessionToken()}`,
    },
  });
  if (response.data.message) {
    return null;
  } else {
      return response.data.map(supplier => {
        supplier.name = supplier.person.name;
        supplier.idDirCity = supplier.person.idDirCity;
        supplier.idDirDepartment = supplier.person.idDirDepartment;
        supplier.idDirProvince = supplier.person.idDirProvince;
        supplier.dirPostCode = supplier.person.dirPostCode;
        supplier.cuit = supplier.person.cuit;
        supplier.email = supplier.person.email;
        supplier.numDoc = supplier.person.numDoc;
        supplier.cbu = supplier.person.cbu;
        supplier.phoneNumber = supplier.person.phoneNumber;
        supplier.dirStreet = supplier.person.dirStreet;
        supplier.dirCity = storeDirections.getCity(supplier.person.idDirCity).nombre;
        supplier.dirDepartment = storeDirections.getDepartment(supplier.person.idDirDepartment).nombre;
        supplier.dirProvince = storeDirections.getProvince(supplier.person.idDirProvince).nombre;
        supplier.docType = storeDocTypes.getDocType(supplier.person.idDocType);
        return supplier;
      });
  }
}

async function getSupplier(id) {
  if (id) {
    const response = await axios({
      method: "GET",
      url: `${getUrl()}/api/supplier/${id}`,
      headers: {
        authorization: `Bearer ${await getSessionToken()}`,
      },
    });
    if (response.data.message) {
      return null;
    } else {
        const supplier = response.data;
        supplier.name = supplier.person.name;
        supplier.idDirCity = supplier.person.idDirCity;
        supplier.idDirDepartment = supplier.person.idDirDepartment;
        supplier.idDirProvince = supplier.person.idDirProvince;
        supplier.dirPostCode = supplier.person.dirPostCode;
        supplier.dirStreet = supplier.person.dirStreet;
        supplier.cuit = supplier.person.cuit;
        supplier.email = supplier.person.email;
        supplier.numDoc = supplier.person.numDoc;
        supplier.cbu = supplier.person.cbu;
        supplier.phoneNumber = supplier.person.phoneNumber;
        supplier.dirStreet = supplier.person.dirStreet;
        supplier.dirCity = storeDirections.getCity(supplier.person.idDirCity).nombre;
        supplier.dirDepartment = storeDirections.getDepartment(supplier.person.idDirDepartment).nombre;
        supplier.dirProvince = storeDirections.getProvince(supplier.person.idDirProvince).nombre;
        supplier.docType = storeDocTypes.getDocType(supplier.person.idDocType);
        return supplier;
    };
  } else return null;
}

async function deleteSupplier(id) {
  if (id) {
    const response = await axios({
      method: "DELETE",
      url: `${getUrl()}/api/supplier/${id}`,
      headers: {
        authorization: `Bearer ${await getSessionToken()}`,
      },
    });
    if (response.data.message) {
      return null;
    } else return response.data;
  } else return null;
}

async function addSupplier({
  supplierName,
  docType,
  numDoc,
  idDirDepartment,
  idDirProvince,
  dirPostCode,
  idDirCity,
  dirStreet,
  cuit,
  phoneNumber,
  email,
  cbu,
}) {
  const response = await axios({
    method: "POST",
    url: `${getUrl()}/api/supplier`,
    headers: {
      authorization: `Bearer ${await getSessionToken()}`,
    },
    data: {
      name: supplierName,
      idDocType: parseInt(docType),
      numDoc,
      phoneNumber,
      email,
      cbu,
      dirStreet,
      dirPostCode,
      idDirProvince,
      idDirDepartment,
      idDirCity,
      cuit,
    },
  });
  if (response.data.message) return null
  else {
    return await getSupplier(response.data.id);
  };
}

async function editSupplier({
  id,
  supplierName,
  docType,
  numDoc,
  cuit,
  idDirProvince,
  idDirDepartment,
  dirPostCode,
  idDirCity,
  dirStreet,
  phoneNumber,
  email,
  cbu,
}) {
  if (
    id,
    supplierName,
    docType,
    numDoc,
    cuit,
    idDirProvince,
    idDirDepartment,
    dirPostCode,
    idDirCity,
    dirStreet,
    phoneNumber,
    email,
    cbu
  ) {

    const response = await axios({
      method: "PATCH",
      url: `${getUrl()}/api/supplier/${id}`,
      headers: {
        authorization: `Bearer ${await getSessionToken()}`,
      },
      data: {
        name: supplierName,
        idDocType: docType,
        numDoc,
        cuit,
        idDirProvince,
        idDirDepartment,
        dirPostCode: dirPostCode,
        idDirCity,
        dirStreet,
        phoneNumber,
        email,
        cbu,
      },
    });
    if (response.data.message) return null;
    else return await getSupplier(response.data.id);
  }
}

module.exports = {
  getAllSuppliers,
  getSupplier,
  deleteSupplier,
  addSupplier,
  editSupplier,
};
