import { getUserByEmail, emailExists } from "./userModel.js";
// This is just for test purposes
const user = await getUserByEmail(
  "advisor@smartbudgetpro.com"
);

console.log(user);


const email = await emailExists("advisor@smartbudgetpro.com")
if (email == true) {
    console.log(`Email is in the database`)
}else{
    console.log("Email is not saved")
}