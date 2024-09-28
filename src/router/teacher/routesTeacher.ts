import { Router } from "express"; 
import routerAuth from "./auth/TeacherAuth"; 
import routerSubjets from "./processteacher/SubjectTeacher";
import TeacherAuth from "./auth/TeacherAuth"; 
//import user from "./user";
const routesTeacher = Router();

routesTeacher.use('/auth',routerAuth);
routesTeacher.use('/subject',routerSubjets); 
//routes.use('/users',user);

export default routesTeacher;