const User = require("../models/user");
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
    res.render("sign-up", { inputData: inputData });
}

async function signUpUser(req, res) {
    const userData = req.body;
    const enteredEmail = userData.email;
    const enteredConfirmEmail = userData["confirm-email"];
    const enteredPassword = userData.password;
    const enteredFullName = userData.fullname;
    const enteredStreet = userData.street;
    const enteredPostalCode = userData["postal-code"];
    const enteredCity = userData.city;
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
                email: enteredEmail,
                confirmEmail: enteredConfirmEmail,
                password: enteredPassword,
                fullName: enteredFullName,
                street: enteredStreet,
                postalCode: enteredPostalCode,
                city: enteredCity,
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
    const result = await user.saveUser();
    res.redirect("/sign-up");
}

function loadLoginPage(req, res) {
    let inputData = sessionValidation.checkSessionInputData(req, {
        inputError: "",
        email: "",
        password: "",
    });
    res.render("log-in", { inputData: inputData });
}

async function loginUser(req, res) {
    const userData = req.body;
    const enteredEmail = userData.email;
    const enteredPassword = userData.password;
    const user = new User(enteredEmail, enteredPassword);
    const existingUser = await user.fetchUser();
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
    req.session.isAuth = true;
    req.session.user = {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        address: user.address,
    };
    req.session.save(function () {
        res.redirect("/products");
    });
}

function logoutUser(req, res) {
    req.session.isAuth = false;
    req.session.user = null;
    res.redirect("/log-in");
}

module.exports = {
    loadSignUpPage: loadSignUpPage,
    signUpUser: signUpUser,
    loadLoginPage: loadLoginPage,
    loginUser: loginUser,
    logoutUser: logoutUser,
};
