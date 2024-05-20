const User = require("../models/user-model");
const authUtil = require('../util/authentication')
const inputValidation = require("../util/input-validation");
const sessionValidation = require("../util/session-validation");

function loadSignUpPage(req, res) {
    let inputData = sessionValidation.checkSessionInputData(req, {
        email: "",
        confirmEmail: "",
        password: "",
        fullName: "",
        street: "",
        postalCode: "",
        city: "",
    });
    res.render("Customer/auth/sign-up", { inputData: inputData });
}

async function signUpUser(req, res, next) {
    const userData = req.body;
    const enteredEmail = userData.email;
    const enteredConfirmEmail = userData["confirm-email"];
    const enteredPassword = userData.password;
    const enteredFullName = userData.fullname;
    const enteredStreet = userData.street;
    const enteredPostalCode = userData["postal-code"];
    const enteredCity = userData.city;
    const enteredData = {
        email: enteredEmail,
        confirmEmail: enteredConfirmEmail,
        password: enteredPassword,
        fullName: enteredFullName,
        street: enteredStreet,
        postalCode: enteredPostalCode,
        city: enteredCity,
    }
    if (
        !inputValidation.checkSignUpInput(
            enteredEmail,
            enteredConfirmEmail,
            enteredPassword,
            enteredFullName,
            enteredStreet,
            enteredPostalCode,
            enteredCity
        )
    ) {
        sessionValidation.flashSessionInputData(
            req,
            {
                errorMessage: "Invalid input! Please try again.",
                ...enteredData
            },
            function () {
                return res.redirect("/sign-up");
            }
        );
        return;
    }
    const user = new User(
        enteredEmail,
        enteredPassword,
        enteredFullName,
        enteredStreet,
        enteredPostalCode,
        enteredCity
    );
    let existingUser;
    try{
        existingUser = await user.fetchUser()
    } catch (error){
        return next(error)
    }
    if(existingUser){
        sessionValidation.flashSessionInputData(
            req,
            {
                errorMessage: "User already exists. Please try again.",
                ...enteredData
            },
            function () {
                return res.redirect("/sign-up");
            }
        )
        return;
    }
    try{
        await user.saveUser();
    } catch(error){
        return next(error)
    }
    res.redirect("/sign-up");
}

function loadLoginPage(req, res) {
    let inputData = sessionValidation.checkSessionInputData(req, {
        inputError: "",
        email: "",
        password: "",
    });
    res.render("Customer/auth/log-in", { inputData: inputData });
}

async function loginUser(req, res, next) {
    const userData = req.body;
    const enteredEmail = userData.email;
    const enteredPassword = userData.password;
    const user = new User(enteredEmail, enteredPassword);
    let existingUser;
    try{
        existingUser = await user.fetchUser();
    } catch (error){
        return next(error)
    }
    if (!existingUser) {
        sessionValidation.flashSessionInputData(
            req,
            {
                errorMessage: "Invalid email or password! Please try again.",
                email: enteredEmail,
                password: enteredPassword,
            },
            function () {
                return res.redirect("/log-in");
            }
        );
        return;
    }
    const passwordCheck = await user.checkPassword();
    if (!passwordCheck) {
        sessionValidation.flashSessionInputData(
            req,
            {
                errorMessage: "Invalid email or password! Please try again.",
                email: enteredEmail,
                password: enteredPassword,
            },
            function () {
                return res.redirect("/log-in");
            }
        );
        return;
    }
    authUtil.createUserSession(req, user, function(){
        res.redirect('/products')
    })
}

function logoutUser(req, res) {
    authUtil.closeUserSession(req)
    res.redirect("/log-in");
}

module.exports = {
    loadSignUpPage: loadSignUpPage,
    signUpUser: signUpUser,
    loadLoginPage: loadLoginPage,
    loginUser: loginUser,
    logoutUser: logoutUser,
};
