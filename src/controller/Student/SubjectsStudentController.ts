import { validate } from "class-validator";
import { getRepository, SimpleConsoleLogger } from "typeorm";
import { Request, response, Response, } from "express";
import { Subjects } from "../../entity/subjects";
import { subject_sinc_student } from "../../entity/subject_sinc_student";
import { Activity_Send } from "../../entity/activity_send";
import { Activity } from "../../entity/activity";
import { activity_sinc_student } from "../../entity/activity_sinc_student";
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
var fs = require('fs');
var filePath = 'D:/Proyectos/Gestor de actividades/archivos_file';

class SubjetsStudentController {
    static SincCodeSubjects = async (req: Request, res: Response) => {
        const student = res.locals.jwtpayload;
        const { code } = (req.params);
        let codetrim = code.trim();
        if (codetrim == "") {
            res.status(400).send({
                message: 'requiere codigo de sincronización'
            })
        }
        const CodeSubject = getRepository(Subjects);
        let SubjetCode;
        try {
            SubjetCode = await CodeSubject.find({
                code_subjects: codetrim
            })
            if (!(SubjetCode.length > 0)) {
                throw false;
            }
        } catch (error) {
            return res.status(400).send({
                message: 'El codigo de sincronización no existe'
            })
        }
        const CodeSincStduent = getRepository(subject_sinc_student)
        let SincCodeNew = new subject_sinc_student();
        SincCodeNew.fk_code_subjects = codetrim;
        SincCodeNew.fk_id_student = student.userId;
        let subjectscode;
        try {
            subjectscode = await CodeSincStduent.findOne({ fk_code_subjects: codetrim, fk_id_student: student.userId })
            if (subjectscode.id_subject_sinc_student) {
                throw false;
            }
        } catch (error) {
            if (error == false) {
                return res.status(400).send({
                    message: 'Esta materia ya esta inscritua a tu usuario'
                })
            }
        }
        try {
            subjectscode = await CodeSincStduent.manager.save(SincCodeNew);
        } catch (error) {
            return res.status(404).send(error)
        }
        res.status(200).json(SubjetCode)
    }
    static ListSubjectsAsociate = async (req, res: Response) => {
        const student = res.locals.jwtpayload;
        const studentRepository = getRepository(Subjects)
        let listSubjects;
        try {
            let querysql = "SELECT code_subjects, name_subjects, description_subjects, section_subjects, turn, bool_deleted, teacher.username, teacher.frist_name, teacher.frist_surname FROM subjects ";
            querysql += " INNER JOIN subject_sinc_student ON subjects.code_subjects = subject_sinc_student.fkCodeSubjectsCodeSubjects  ";
            querysql += " INNER JOIN teacher ON teacher.id_teacher = subjects.fkIdTeacherIdTeacher ";
            querysql += "where subject_sinc_student.fkIdStudentIdStudent = " + student.userId + "  ";
            listSubjects = await studentRepository.query(querysql) 
        } catch (error) {
            return res.status(400).send({
                message: 'Algo a salido mal'
            })
        }
        res.status(200).send(listSubjects)
    }
    static DetailSubjects = async (req: Request, res: Response) => {
        const { code_subject } = req.params;
        const student = res.locals.jwtpayload;

        if (!code_subject) {
            return res.status(400).send({ message: 'Se requiere el codigo de la materia' })
        }

        const studentSub = getRepository(subject_sinc_student);
        let resultsubjets;
        try {
            let querysql = "SELECT * FROM subject_sinc_student WHERE subject_sinc_student.fkIdStudentIdStudent = " + student.userId;
            querysql += " AND subject_sinc_student.fkCodeSubjectsCodeSubjects = '" + code_subject + "'";
            resultsubjets = await studentSub.query(querysql)
            if (!(resultsubjets.length > 0)) {
                throw false;
            }
        } catch (error) {
            return res.status(400).send({
                message: 'Usted no esta inscrito en esta materia'
            })
        }
        const activity_recive = getRepository(Subjects)
        let activity;
        try {
            activity = await activity_recive.findOne({ where: { code_subjects: resultsubjets[0].fkCodeSubjectsCodeSubjects } })
            if (!activity) {
                throw 1;
            }
        } catch (error) {
            switch (error) {
                case 1:
                    return res.status(404).send({ message: "Usted no esta inscrito en esta materia, no existe o ya fue cerrada" })
                default:
                    return res.status(404).send({ message: "ha ocurrido un problema desconocido" })
            }


        }
        const activity_adjRepository = getRepository(Activity)
        let activity_adj;
        try {
            activity_adj = await activity_adjRepository.find({ where: { fk_code_subject: resultsubjets[0].fkCodeSubjectsCodeSubjects } })
        } catch (error) {
            return res.status(404).send({ message: "ha ocurrido un problema desconocido" })
        }
        let activity_sinc_send = getRepository(activity_sinc_student);
        let activity_sinc_list;

        try {
            activity_sinc_list = await activity_sinc_send.query("SELECT * FROM activity_sinc_student  WHERE  fkIdStudentIdStudent = " + student.userId + " ");
        } catch (error) {
            return res.status(404).send({ message: "ha ocurrido un problema desconocido" })
        }

        activity_adj.map(element => {
            element["boolsendstatus"] = false;
            activity_sinc_list.forEach(element2 => {
                element["my_weighint"] = element2.weighint
                if (element.id_activity == element2.fkIdActivityIdActivity) {
                    element["boolsendstatus"] = true;
                }
            });
        })

        activity = { ...activity, activity_adj }
        res.status(200).send(activity)
    }
    static SendActivityStudent = async (req, res) => {
        const student = res.locals.jwtpayload;
        const { description, fk_code_subject, fk_activity } = JSON.parse(req.body.data);
        let FileActivity;
        if (req.files != null) {
            FileActivity = req.files.files;
        }
        const ActivitySend = new Activity_Send();
        ActivitySend.description = description;
        ActivitySend.fk_activity = fk_activity;
        ActivitySend.fk_code_subject = fk_code_subject;
        ActivitySend.fk_student = student.userId;
        if (req.files != null) {
            ActivitySend.url_server = 'D:/Proyectos/Gestor de actividades/archivos_file/' + FileActivity.name;
        }

        const verifsubject = getRepository(subject_sinc_student)
        try {
            let resultver = await verifsubject.query("SELECT * FROM subject_sinc_student WHERE subject_sinc_student.fkIdStudentIdStudent = " + ActivitySend.fk_student + " and subject_sinc_student.fkCodeSubjectsCodeSubjects = '" + ActivitySend.fk_code_subject + "'");
            if (!resultver) {
                throw false;
            }
        } catch (error) {
            res.status(400).send({
                message: 'usted no esta inscrito en esta materia'
            })
        }
        const activity_check_status = getRepository(Activity)
        try {
            let resultver = await activity_check_status.findOne({ id_activity: fk_activity, Status: true });
            if (!resultver) {
                throw false;
            }
        } catch (error) {
            res.status(400).send({
                message: 'La actividad ha sido cerrada, no se puede enviar documentos'
            })
        }
        const subject_check_status = getRepository(Subjects)
        try {
            let resultver = await subject_check_status.findOne({ code_subjects: fk_code_subject, bool_deleted: false });
            if (!resultver) {
                throw false;
            }
        } catch (error) {
            res.status(400).send({
                message: 'La materia ha sido cerrada, no se puede enviar documentos'
            })
        }
        const error = await validate(ActivitySend);

        if (error.length > 0) {
            error.map(element => {
                delete element.target;
                delete element.value;
            })
            return res.status(400).send(error)
        }
        if (req.files != null) {
            if (FileActivity.size > 31457280) {
                return res.status(400).send({ message: "El archivo no puede pesar mas de 30 MB" })
            }
            if (!(
                FileActivity.mimetype == "application/pdf" ||
                FileActivity.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                FileActivity.mimetype == "application/msword" ||
                FileActivity.mimetype == "application/x-abiword" ||
                FileActivity.mimetype == "application/x-rar-compressed" ||
                FileActivity.mimetype == "application/vnd.ms-powerpoint" ||
                FileActivity.mimetype == "application/vnd.ms-excel" ||
                FileActivity.mimetype == "text/csv" ||
                FileActivity.mimetype == "image/jpeg" ||
                FileActivity.mimetype == "text/plain" ||
                FileActivity.mimetype == "application/x-7z-compressed" ||
                FileActivity.mimetype == "image/png"
            )) {
                return res.status(400).send({
                    message: "Formato no deseado"
                })
            }
            const activity_send = getRepository(Activity_Send);
            let splitname = (FileActivity.name).split('.');
            let arrayname = [];
            let temp = 0;
            for (let index = 0; index <= splitname.length; index++) {
                const element = splitname[index];
                if ((splitname.length - 1) == index) {
                    temp = 1;
                    arrayname[temp] = element
                    break;
                }
                arrayname[temp] = arrayname + element + ".";
            }
            try {
                let resultvar = await activity_send.find({ url_server: ActivitySend.url_server });
                do {
                    if (resultvar.length > 0) {
                        let hash: any = functionsglobal.makeid();
                        ActivitySend.url_server = `D:/Proyectos/Gestor de actividades/archivos_file/${arrayname[0]}(${hash}).${arrayname[1]}`;
                        resultvar = await activity_send.find({ url_server: ActivitySend.url_server });
                    }
                } while (resultvar.length > 0);
            } catch (error) {
                res.status(400).send({
                    messsage: 'Ha ocurrido un problema al guardar la actividad'
                })
            }
            const verif_send_activity = getRepository(activity_sinc_student)
            let resultver

            try {
                resultver = await verif_send_activity.find({
                    fk_id_student: student.userId,
                    fk_id_activity: fk_activity
                })
            } catch (error) {
                res.status(400).send({
                    message: 'Ha ocurrido un problema inesperado'
                })
            }
            let ActivitySendSinc = new activity_sinc_student();
            if (resultver.length <= 0) {
                ActivitySendSinc.fk_id_activity = fk_activity;
                ActivitySendSinc.fk_id_student = student.userId;
                ActivitySendSinc.status_verific = false;
                ActivitySendSinc.weighint = 0;
                const error = await validate(ActivitySendSinc);

                if (error.length > 0) {
                    error.map(element => {
                        delete element.target;
                        delete element.value;
                    })
                    return res.status(400).send(error)
                }
                try {
                    let resultver2 = await verif_send_activity.manager.save(ActivitySendSinc)
                    if (!resultver2) {
                        throw false;
                    }
                } catch (error) {
                    res.status(400).send({
                        message: 'Ha ocurrido un problema al enviar su actividad'
                    })
                }
            }
            let result2;
            try {
                result2 = await activity_send.manager.save(ActivitySend)
            } catch (error) {
                await verif_send_activity.manager.remove(ActivitySendSinc)
                return res.status(404).send({
                    message: 'Error al guardar la actividad'
                })
            }
            try {
                await FileActivity.mv(ActivitySend.url_server)
            } catch (error) {
                await activity_send.manager.remove(ActivitySend)
                await verif_send_activity.manager.remove(ActivitySendSinc)
                return res.status(500).send({ message: error })
            }

            return res.status(200).send({
                message: 'la actividad se ha enviado exitosamente '
            })
        }

    }
    static ListActivity = async (req: Request, res: Response) => {
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
            listactivitymissing.map(element => {
                element["boolsendstatus"] = false;
                activity_sinc_list.forEach(element2 => {
                    element["my_weighint"] = element2.weighint
                    if (element.id_activity == element2.fkIdActivityIdActivity) {
                        element["boolsendstatus"] = true;
                    }
                });
            })
        } catch (error) {
            return res.status(400).send({
                message: 'ha ocuarrido algo en la busqueda de actividades'
            })
        }
        res.status(200).send(listactivitymissing)
    }
    static DetailActivity = async (req: Request, res: Response) => {
        const { id_activity } = req.params;
        const student = res.locals.jwtpayload;
        if (!id_activity) {
            return res.status(400).send({ message: 'Se requiere el codigo de la materia' })
        }

        const studentActivity = getRepository(Activity);
        let resultactivity;

        try {
            resultactivity = await studentActivity.query("SELECT * FROM `activity` WHERE activity.id_activity =" + id_activity)
            if (resultactivity == null) {
                throw false;
            }
        } catch (error) {
            return res.status(400).send({
                message: 'Esta actividad no existe'
            })
        }

        const SubjetInfo = getRepository(Subjects);
        let resultsubject;

        try {
            resultsubject = await SubjetInfo.findOne({ code_subjects: resultactivity[0].fkCodeSubjectCodeSubjects })
            if (!resultactivity) {
                throw 1;
            } else {
                resultactivity[0].boolstatussubjects = resultsubject.bool_deleted;
            }
        } catch (error) {
            switch (error) {
                case 1:
                return res.status(400).send({
                        message: 'Esta actividad no se encuentra asociada a ninguna materia'
                })
                break;

                default:
                    return res.status(400).send({
                        message: 'Ha ocurrido un error inesperado'
                    })
                    break;
            }
        }

        const activity_sinc_send = getRepository(activity_sinc_student);
        let resultactsinc;
        try {
            resultactsinc = await activity_sinc_send.findOne({ fk_id_activity: id_activity, fk_id_student: student.userId });
            if (resultactsinc) {
                resultactivity[0].my_weighint = resultactsinc.weighint;
            } else {
                resultactivity[0].my_weighint = 0;
            }
        } catch (error) {
            return res.status(400).send({
                message: 'ha ocurrido un error inesperado'
            })
        }

        const studentSubject = getRepository(subject_sinc_student);
        let resultsubjets;

        try {
            resultsubjets = await studentSubject.find({
                where: {
                    fk_code_subjects: resultactivity[0].fkCodeSubjectCodeSubjects,
                    fk_id_student: student.userId
                }
            })
            if (resultsubjets == null) {
                throw false;
            }
        } catch (error) {
            return res.status(400).send({
                message: 'La actividad a la que esta consultando no esta asociada a ninguna de sus materias'
            })
        }
        const activity_recive = getRepository(Activity_Send)
        let activity = [];
        try {
            let vartemp = await activity_recive.find({ where: { fk_code_subject: resultactivity[0].fkCodeSubjectCodeSubjects, fk_activity: resultactivity[0].id_activity, fk_student: student.userId } })
            for (let index = 0; index < vartemp.length; index++) {
                const element = vartemp[index];
                activity.push(element)
            }
        } catch (error) {
            return res.status(404).send({ message: "ha ocurrido un problema con la busqueda de actividades" })
        }
        resultactivity = { ...resultactivity[0], activity }
        res.status(200).send(resultactivity)
    }
    static DeletedActivitySend = async (req: Request, res: Response) => {
        const { id_activity_send } = req.params;
        const student = res.locals.jwtpayload;
        if (!id_activity_send) {
            return res.status(400).send({ message: 'Se requiere el id de la actividad enviada' })
        }

        const studentActivitySend = getRepository(Activity_Send);
        let resultactivitysend;
        let resulallactivitysend;

        try {
            resultactivitysend = await studentActivitySend.query("SELECT * FROM activity__send WHERE fkStudentIdSubjectSincStudent = " + student.userId + " AND id_activity_send = " + id_activity_send)
            if (resultactivitysend.length <= 0) {
                throw 1;
            }
        } catch (error) {
            switch (error) {
                case 1:
                    return res.status(400).send({ message: 'Esta actividad no existe o fue eliminada' })
                    break;
                default:
                    return res.status(400).send({ message: 'Ha ocurrido un problema' })
                    break;
            }
        }
        const ActivityStatus = getRepository(Activity);
        let ResultActivityStatus;

        try {
            ResultActivityStatus = await ActivityStatus.findOne({ id_activity: resultactivitysend[0].fkActivityIdActivity, Status: true })
            if (!ResultActivityStatus) {
                throw false;
            }
        } catch (error) {
            return res.status(400).send({ message: 'El profesor ha cerrado la actividad, no se puede eliminar' })
        }

        const subject_check_status = getRepository(Subjects)
        try {
            let resultver = await subject_check_status.findOne({ code_subjects: resultactivitysend[0].fkCodeSubjectCodeSubjects, bool_deleted: false });
            if (!resultver) {
                throw false;
            }
        } catch (error) {
            res.status(400).send({
                message: 'La materia ha sido cerrada,  no se puede eliminar'
            })
        }

        let Deletectivitysend;

        try {
            Deletectivitysend = await studentActivitySend.delete(id_activity_send);
        } catch (error) {
            return res.status(400).send({ message: 'Ha ocurrido un error al eliminar la actividad' })
        }

        const ActivitySincStudent = getRepository(activity_sinc_student);
        let ResultActivitySincStudent;
        try {
            fs.unlinkSync(resultactivitysend[0].url_server);
            resulallactivitysend = await studentActivitySend.find({ fk_student: student.userId, fk_activity: resultactivitysend[0].fkActivityIdActivity })
            if (resulallactivitysend.length <= 0) {
                ResultActivitySincStudent = await ActivitySincStudent.delete({ fk_id_activity: resultactivitysend[0].fkActivityIdActivity, fk_id_student: student.userId })
            }
        } catch (error) {
            console.log(error)
            return res.status(400).send({ message: 'Ha ocurrido un error al eliminar la actividad' })
        }
        res.status(200).send({ message: "Se ha eliminado con exito esta actividad" })
    }
}
class functionsglobal {
    static makeid() {
        var result: any = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 10; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}
export default SubjetsStudentController;