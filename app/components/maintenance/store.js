const config = require('../../config/config.js');
const axios = require('axios');
const { getUrl } = config;
const { getSessionToken } = require('../../config/auth');

const storeUsers = require('../users/store');

async function getGeneralInfo () {
    const  generalInfo = await axios({
        method: 'GET',
        url: `${getUrl()}/api/global`,
        headers: {
                authorization: `Bearer ${await getSessionToken()}`,   
            },
    });
    return generalInfo.data[0];
};

async function getTaxPercentage () {
    const  generalInfo = await axios({
        method: 'GET',
        url: `${getUrl()}/api/global`,
        headers: {
                authorization: `Bearer ${await getSessionToken()}`,   
            },
    });
    return generalInfo.data[0].taxPercentage;
};

async function updateGeneralInfo ({
    fantasyName,
    businessName,
    taxName,
    taxPercentage,
}) {
    const general = await getGeneralInfo();
    if(fantasyName == general.fantasyName && businessName == general.businessName && taxName == general.taxName && taxPercentage == general.taxPercentage){
        return null
    } else {
        const floatTax = parseFloat(taxPercentage);
        const response = await axios({
            method: 'PATCH',
            url: `${getUrl()}/api/global/1`,
            data: {
                fantasyName,
                businessName,
                taxName,
                taxPercentage: floatTax,
            },
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,   
            },
        });
        if(response.data.message){
            return null;
        } else {
            return response.data;
        };
    };
};

async function getAllBranches () {
    const response = await axios({
        method: 'GET',
        url: `${getUrl()}/api/branch`,
        headers: {
                authorization: `Bearer ${await getSessionToken()}`,   
            },
    });
    if(response.data.message){
        return null;
    } else {
        return response.data;
    };
};

async function getBranch(id) {
    const response = await axios({
        method: 'GET',
        url: `${getUrl()}/api/branch/${id}`,
        headers: {
                authorization: `Bearer ${await getSessionToken()}`,   
            },
    });
    if(response.data.message){
        return null;
    } else {
        return response.data;
    };
};

async function getBranches (idUser) {
    if(idUser){
        let user = await storeUsers.getUser(idUser);
        let branchName = "";
        for (let i = 0; i < user.branches.length; i++) {
            if (i == 0) branchName += `${user.branches[i].name}`
            else branchName += `, ${user.branches[i].name}`;
        };
        return branchName;
    } else return null;
};

async function updateBranchInfo ({
    idBranch,
    branchName,
    cuit,
    dirStreet,
    phoneNumber,
    email,
    representative,
}) {
    if(idBranch && branchName && cuit && dirStreet && phoneNumber && email && representative){
        const oldBranch = await getBranch(idBranch);
        if(oldBranch != null){
            if(branchName == oldBranch.name && cuit == oldBranch.cuit && dirStreet == oldBranch.dirStreet && phoneNumber == oldBranch.phoneNumber && email == oldBranch.email && representative == oldBranch.representative){
                return false;
            } else {
                const response = await axios({
                    method: 'PATCH',
                    url: `${getUrl()}/api/branch/${idBranch}`,
                    headers: {
                authorization: `Bearer ${await getSessionToken()}`,   
            },
                    data: {
                        branchName,
                        cuit,
                        dirStreet,
                        phoneNumber,
                        email,
                        representative,
                    },
                });
                if(response.data.message){
                    return null;
                } else return response.data;
            };
        } else return null;
    } else return null;
};

module.exports = {
    getGeneralInfo,
    getTaxPercentage,
    updateGeneralInfo,
    getAllBranches,
    getBranch,
    getBranches,
    updateBranchInfo,
};