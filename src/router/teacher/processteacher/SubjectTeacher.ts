import { Router } from "express"; 
import  SubjetsTeacherController  from "../../../controller/Teacher/SubjectsTeacherController";
import { checkJwt } from "../../../middlewares/jwt";
const routerSubjets = Router();

 
routerSubjets.post('/create',[checkJwt], SubjetsTeacherController.AddSubjects);  
routerSubjets.get('/list',[checkJwt], SubjetsTeacherController.ListSubjects); 
routerSubjets.get('/detail/:code_subject',[checkJwt], SubjetsTeacherController.DetailSubjects);  
routerSubjets.get('/activity/detail/:id_activity',[checkJwt], SubjetsTeacherController.DetailActivity);  
routerSubjets.post('/activity/create',[checkJwt], SubjetsTeacherController.CreateActivity); 
routerSubjets.get('/activity/list/dashboard',[checkJwt], SubjetsTeacherController.ActivityList); 
 
export default routerSubjets;