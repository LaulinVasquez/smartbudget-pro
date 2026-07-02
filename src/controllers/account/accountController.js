import bcrypt from "bcrypt";
import { emailExists, createUser, getUserByEmail } from "../../models/account/userModel.js";

export function buildRegister(req, res) {
  res.render("account/register", {
    title: "Register",
    errors: [],
    formData: {},
  });
}

export const registerUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const exists = await emailExists(email);
    if (exists) {
      req.flash("error", "Invalid email or password");
      return res.redirect("/register");

    }
      const hashedPassword = await bcrypt.hash(password, 12);

      await createUser({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: "user",
      });
      req.flash("success", "User succesfully registered.")
      return res.redirect("/login");

  } catch (error) {
    next(error);
  }
};

export function buildLogin(req, res) {
  res.render("account/login", {
    title: "Login",
  });
}

export const loginUser = async (req,res, next) => {
  try {
    const {email,password} = req.body;
    const user = await getUserByEmail(email);

    if(!user) {
      req.flash("error", "Invalid email or password.")
      return res.redirect("/login");
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
        req.flash("error", "Invalid email or password.");
        return res.redirect("/login");
    }

    req.session.user = {
      userId: user.user_id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      role: user.role
    };
    delete user.password; // This is for security purposes we don't want the user password stored in the session
    req.flash("success", `Welcome back, ${user.first_name}!`);

    if (user.role === "admin"){
      return res.redirect("/admin");
    }
    if (user.role === "advisor") {
      return res.redirect("/advisor");
    }
    return res.redirect("/dashboard");
  } catch (error) {
    next(error);
  }
};

export const logoutUser = (req, res, next) => {
  req.session.destoy((error) => {
    if (error) {
      return next(error);
    }
    res.ClearCookie("connect.sid");
    return res.redirect("/")
  });
};