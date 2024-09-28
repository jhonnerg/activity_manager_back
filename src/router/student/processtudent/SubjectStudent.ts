import { Router } from "express";
import SubjetsStudentController from "../../../controller/Student/SubjectsStudentController";
import { checkJwt } from "../../../middlewares/jwt";
const routerSubjets = Router();
var multer = require('multer');
 var upload = multer({dest:'./upload/'});
routerSubjets.get('/sinc_code/:code', [checkJwt], SubjetsStudentController.SincCodeSubjects);
routerSubjets.get('/list', [checkJwt], SubjetsStudentController.ListSubjectsAsociate)
routerSubjets.get('/activity/list', [checkJwt], SubjetsStudentController.ListActivity)
routerSubjets.get('/activity/detail/:id_activity',[checkJwt], SubjetsStudentController.DetailActivity);  
routerSubjets.get('/detail/:code_subject', [checkJwt], SubjetsStudentController.DetailSubjects)
routerSubjets.post('/activity/send',[checkJwt], SubjetsStudentController.SendActivityStudent)
routerSubjets.get('/activity_send/delete/:id_activity_send',[checkJwt], SubjetsStudentController.DeletedActivitySend)
 
export default routerSubjets;