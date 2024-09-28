import { Router } from "express"; 
import router from "./student/auth/StudentAuth";
import routerStudent from "./student/routesStudent";
import routesTeacher from "./teacher/routesTeacher"; 
//import user from "./user";
const routes = Router();

routes.use('/student',routerStudent);
routes.use('/teacher',routesTeacher);
//router.use('/')
//routes.use('/users',user);

export default routes;