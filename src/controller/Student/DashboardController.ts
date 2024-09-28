import * as jwt from "jsonwebtoken";
import config from "../../config/config";
import { validate } from "class-validator";
import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Student } from "../../entity/student";
import { TokenBlackList } from "../../entity/TokenBlackList";
import { Activity_Send } from "../../entity/activity_send";
import { Activity } from "../../entity/activity";
import { Subjects } from "../../entity/subjects";
import { activity_sinc_student } from "../../entity/activity_sinc_student";
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
class DashboardController {
    static MacroDashboard = async (req: Request, res: Response) => {
        const student = res.locals.jwtpayload;
        const activity_asociate = getRepository(Activity);
        let activity_sinc_send = getRepository(activity_sinc_student);
        let listactivitymissing;
        let activity_sinc_list;
        try {
            let querysql: any = "SELECT id_activity, name_activity, description, Date_delivery, Date_create, weighint, Status, fkCodeSubjectCodeSubjects FROM activity "
            querysql += " LEFT JOIN subjects ON activity.fkCodeSubjectCodeSubjects = subjects.code_subjects "
            querysql += " JOIN subject_sinc_student ON fkCodeSubjectCodeSubjects = subject_sinc_student.fkCodeSubjectsCodeSubjects "
            querysql += " WHERE  subject_sinc_student.fkIdStudentIdStudent = " + student.userId + " "
            listactivitymissing = await activity_asociate.query(querysql)
            activity_sinc_list = await activity_sinc_send.query("SELECT * FROM activity_sinc_student  WHERE  fkIdStudentIdStudent = " + student.userId + " ");
            activity_sinc_list.forEach(element1 => {
                for (let index = 0; index < listactivitymissing.length; index++) {
                    const element2 = listactivitymissing[index]; 
                    if ((element1.fkIdActivityIdActivity == element2.id_activity) || element2.Status != true) {
                        listactivitymissing.splice(index, 1)
                    }
                }

            });
        } catch (error) {
            return res.status(400).send({
                message: 'ha ocuarrido un error en la busqueda de actividades a entregar',
            })
        }
        res.status(200).send(listactivitymissing)
    }
}
export default DashboardController;