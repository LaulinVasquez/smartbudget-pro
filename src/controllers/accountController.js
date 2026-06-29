import bcrypt from "bcrypt";
import { emailExists, createUser } from "../models/account/userModel.js";

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
      req.flash("error", "Invalid email or password"); // Will be change for a flash Message
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
      req.flash("success", "User succesfully registered")
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
