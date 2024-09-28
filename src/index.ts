import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import { Request, Response } from "express";
import * as cors from "cors";
import * as helmet from "helmet"; 
import routes from "./router"; 
import * as fileUpload from "express-fileupload";
const fileUpload = require('express-fileupload')
const PORT = process.env.PORT || 3000;
createConnection().then(async () => {

    // create express app
    const app = express();
    //middlewares
    app.use(cors())
    app.use(helmet()) 
    app.use(fileUpload())
    app.use(express.json());
    app.use('/',routes)
    // start express server 
    app.listen(PORT, () => console.log('Server running on port ' + PORT + '.'))

}).catch(error => console.log(error));
//npm rum dev --> para correo el server
