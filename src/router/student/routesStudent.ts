import { Router } from "express"; 
import routerAuth from "./auth/StudentAuth"; 
import routerSubjets from "./processtudent/SubjectStudent"; 
import  routerDashboard  from "./Dashboard/DashboardRoutes";
//import user from "./user";
const routesStudent = Router();

routesStudent.use('/auth',routerAuth);
routesStudent.use('/subject',routerSubjets); 
routesStudent.use('/dashboard',routerDashboard);
//routes.use('/users',user);

export default routesStudent;