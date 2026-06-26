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
 
   if (req.body.email !== awaitemailExists(req.body.email)) {
    createUser(req.body);
   }else {
    console.log("User already exist!")
   }
} 
  catch (error) {
    next(error);
  }
};

export function buildLogin(req, res) {
  res.render("account/login", {
    title: "Login",
  });
}
