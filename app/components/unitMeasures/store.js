const axios = require('axios');
const { getSessionToken } = require('../../config/auth');
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

async function getMeasure (id) {
    if(id){
        const response = await axios({
            method: 'GET',
            url: `${getUrl()}/api/unit-measure/${id}`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,
            }
        });
        if(response.data.message) return null 
        else return response.data;
    } else return null;
};

async function getAllMeasures () {
    const response = await axios({
        method: 'GET',
        url: `${getUrl()}/api/unit-measure`,
        headers: {
            authorization: `Bearer ${await getSessionToken()}`,
        }
    });
    if(response.data.message) return null 
    else return response.data;
};

async function addMeasure ({
    shortDescription,
    longDescription,
}) {
if(shortDescription && longDescription){
    const response = await axios({
        method: 'POST',
        url: `${getUrl()}/api/unit-measure`,
        headers: {
            authorization: `Bearer ${await getSessionToken()}`,
        },
        data: {
            longDescription,
            shortDescription,
        },
    });
    if(response.data.message) return null 
    else return response.data;
} else return null;
};

async function deleteMeasure (id) {
    if(id){
        const response = await axios({
            method: 'DELETE',
            url: `${getUrl()}/api/unit-measure/${id}`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,
            },
        });
        if(response.data.message) return null 
        else return response.data;
    } else return null;
};

module.exports = {
    getMeasure,
    getAllMeasures,
    addMeasure,
    deleteMeasure,
};