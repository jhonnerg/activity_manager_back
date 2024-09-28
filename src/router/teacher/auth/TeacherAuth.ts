import { Router } from "express";
import AuthTeacherController from "../../../controller/Teacher/AuthTeacherController";
import { checkJwt } from "../../../middlewares/jwt";
const routerAuth = Router();


//login
routerAuth.post('/login', AuthTeacherController.login);
routerAuth.post('/registeruser',AuthTeacherController.UserRegister)
routerAuth.post('/recoverypassword',AuthTeacherController.RecoveryPassword)
routerAuth.post('/changepasswordlogout/:token', AuthTeacherController.ChangePasswordLogout)
//router.post('/changepassword',[checkJwt], AuthController.changepassword)
export default routerAuth;