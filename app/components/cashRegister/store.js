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

function substractToBox () {};

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

module.exports = {
    newBox,
    addToBox,
    substractToBox,
};