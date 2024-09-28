import { Router } from "express";
import AuthStudentController from "../../../controller/Student/AuthStudentController";
import { checkJwt } from "../../../middlewares/jwt";
const routerAuth = Router();


//login
routerAuth.post('/login', AuthStudentController.login);
routerAuth.post('/registeruser',AuthStudentController.UserRegister)
routerAuth.post('/recoverypassword',AuthStudentController.RecoveryPassword)
routerAuth.post('/changepasswordlogout/:token', AuthStudentController.ChangePasswordLogout)
//router.post('/changepassword',[checkJwt], AuthController.changepassword)
export default routerAuth;