const boxes = {
    1: {
        id: 1,
        idBranch: 1,
        moneyAmount: 1000,
    },
    2: {
        id: 2,
        idBranch: 1,
        moneyAmount: 1500,
    },
    3: {
        id: 3,
        idBranch: 2,
        moneyAmount: 12000,
    }
};

function newBox () {};

function substractToBox (idBox, idBranch, amount) {
    if(boxes[idBox] != undefined) {
        if(boxes[idBox].idBranch == idBranch){
            const amountFloat = parseFloat(amount);
            const substract = boxes[idBox].moneyAmount - amountFloat;
            const updatedAmount = substract.toFixed(2);
            return boxes[idBox] = {
                id: boxes[idBox].id,
                idBranch: boxes[idBox].idBranch,
                moneyAmount: parseFloat(updatedAmount),
            };
        };
    } else return null;
};

function addToBox (idBox, idBranch, amount) {
    if(boxes[idBox] != undefined) {
        if(boxes[idBox].idBranch == idBranch){
            const amountFloat = parseFloat(amount);
            const sum = boxes[idBox].moneyAmount + amountFloat;
            const updatedAmount = sum.toFixed(2);
            return boxes[idBox] = {
                id: boxes[idBox].id,
                idBranch: boxes[idBox].idBranch,
                moneyAmount: parseFloat(updatedAmount),
            };
        };
    } else return null;
};

function returnBoxInfo (id) {
    if(id){
        if(boxes[id] != undefined){
            return boxes[id];
        };
    };
};

module.exports = {
    newBox,
    addToBox,
    substractToBox,
    returnBoxInfo,
};