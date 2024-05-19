function checkSessionInputData(req, data){
    let inputData = req.session.inputData;
    if (!inputData){
        inputData = {
            inputError: false,
            ...data
        }
    }
    req.session.inputData = null;
    return inputData;
}

function flashSessionInputData(req, data, action){
    req.session.inputData = {
        inputError: true,
        ...data
    }
    req.session.save(action)
}

module.exports = {
    checkSessionInputData : checkSessionInputData,
    flashSessionInputData : flashSessionInputData
}