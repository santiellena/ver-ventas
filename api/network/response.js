//response.js send the responses to the client

exports.success = (req, res, data, status) =>{

    res.status(status || 200).send(data);
}

exports.error = (req, res, data, status) => {
    
    res.status(status || 400).send(data);
}