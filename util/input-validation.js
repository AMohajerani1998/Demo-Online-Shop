function isEmpty(value){
    return !value || value.trim() === '';
}

function userCredentialsAreValid(email, emailConfirm, password){
    return(
        email &&
        emailConfirm &&
        email === emailConfirm &&
        email.includes('@') &&
        password.trim().length >= 6
    )
}

function checkSignUpInput(email, emailConfirm, password, fullname, street, postalCode, city){
    return(
        userCredentialsAreValid(email, emailConfirm, password) &&
        !isEmpty(fullname) &&
        !isEmpty(street) &&
        !isEmpty(postalCode) &&
        !isEmpty(city)
    )
}

module.exports = {
    checkSignUpInput : checkSignUpInput
}