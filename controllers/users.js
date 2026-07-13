const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async(req, res, next) => {
    try {
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const regiesteredUser =await User.register(newUser, password);
        console.log(regiesteredUser);
        req.login(regiesteredUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", "Welcome to StayScape!");
        res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async(req, res) => {
    req.flash("success", "Welcome back to StayScape!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.flash("success", "You are logged out!");

        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }

            res.clearCookie("connect.sid");
            res.redirect("/listings");
        });
    });
}
