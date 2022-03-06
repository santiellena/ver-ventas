let general = {
    fantasyName: 'Mercado 1990',
    bussinesName: 'Comercios Hnos. S.A',
    taxName: 'IVA',
    taxPercentage: 18,
};

const branches = {
    1: {
        id: 1,
        name: 'Principal',
        cuit: 302992382,
        dirStreet: 'Bv. Patria 123',
        phoneNumber: 13323113,
        email: 'sucprincipal1990@work.com.ar',
        representative: 'Carlos Omar Vazquez',
    },
    2: {
        id: 2,
        name: 'Tia Rosa',
        cuit: 31928111,
        dirStreet: 'Bv. San Martin 321',
        phoneNumber: 13323113,
        email: 'suctiarosa1990@work.com.ar',
        representative: 'Rosa Julieta Vazquez',
    },
};

function getGeneralInfo () {
    return general;
};

function getTaxPercentage () {
    return general.taxPercentage;
};

function updateGeneralInfo ({
    fantasyName,
    bussinesName,
    taxName,
    taxPercentage,
}) {
    if(fantasyName == general.fantasyName && bussinesName == general.bussinesName && taxName == general.taxName && taxPercentage == general.taxPercentage){
        return null
    } else {
        const floatTax = parseFloat(taxPercentage);
        return general = {
            fantasyName,
            bussinesName,
            taxName,
            taxPercentage: floatTax,
        };
    };
};

function getAllBranches () {
      return branches;
};

function getBranch(id) {
    if(id && branches[id] != undefined) {
        return branches[id];
    };
};

function getBranches (branchesIds) {
    if(branchesIds){
        const branches = [];
        for (const idBranch of branchesIds) {
            const branch = getBranch(idBranch);
            branches.push(branch);
        };
        return branches;
    };
};

function updateBranchInfo ({
    idBranch,
    branchName,
    cuit,
    dirStreet,
    phoneNumber,
    email,
    representative,
}) {
    if(idBranch && branchName && cuit && dirStreet && phoneNumber && email && representative){
        const oldBranch = branches[idBranch]
        if(oldBranch != undefined){
            if(branchName == oldBranch.name && cuit == oldBranch.cuit && dirStreet == oldBranch.dirStreet && phoneNumber == oldBranch.phoneNumber && email == oldBranch.email && representative == oldBranch.representative){
                return false;
            } else {
                return branches[idBranch] = {
                    id: idBranch,
                    name: branchName,
                    cuit,
                    phoneNumber,
                    dirStreet,
                    email,
                    representative,
                };
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