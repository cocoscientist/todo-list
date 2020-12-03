const Validator = require('validator');
const isEmpty = require('is-empty');

exports.validationFunc = (data)=>{
    let errors = {};
    if(Validator.isEmpty(data.UserId)){
        errors.UserId = "User ID is needed";
    }
    if(Validator.isEmpty(data.Password)){
        errors.Password = "Password is needed";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};