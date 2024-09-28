import { Router } from "express";
import DashboardController from "../../../controller/Student/DashboardController";
import { checkJwt } from "../../../middlewares/jwt";
const routerDashboard = Router();
var multer = require('multer');
 var upload = multer({dest:'./upload/'});
routerDashboard.get('/macro', [checkJwt], DashboardController.MacroDashboard); 

 
export default routerDashboard;