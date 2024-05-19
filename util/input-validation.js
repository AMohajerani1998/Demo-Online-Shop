function checkSignUpInput(email, emailConfirm, password, fullname, street, postalCode, city){
    return(
        email &&
        emailConfirm &&
        email === emailConfirm &&
        email.includes('@') &&
        password >= 6 &&
        fullname &&
        street &&
        postalCode &&
        city
    )
}

module.exports = {
    checkSignUpInput : checkSignUpInput
}