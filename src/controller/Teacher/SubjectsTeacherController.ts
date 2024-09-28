import { validate } from "class-validator";
import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Subjects } from "../../entity/subjects";
import { Activity } from "../../entity/activity";
import { Activity_Send } from "../../entity/activity_send";
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
class SubjetsTeacherController {
    static AddSubjects = async (req: Request, res: Response) => {
        const teacher = res.locals.jwtpayload;
        const { name_subjects, section_subjects, turn, description_subjects } = req.body;
        if (!(name_subjects && section_subjects && turn)) {
            !name_subjects ? res.status(400).send({ message: 'Required name subjects' }) : false;
            !section_subjects ? res.status(400).send({ message: 'Required section subjects' }) : false;
            !turn ? res.status(400).send({ message: 'Required turn subjects' }) : false;
            return false;
        }
        var subjects = new Subjects();
        subjects.name_subjects = name_subjects;
        subjects.description_subjects = description_subjects;
        subjects.section_subjects = section_subjects;
        subjects.turn = turn;
        subjects.makeid();
        subjects.fk_id_teacher = teacher.userId;
        subjects.bool_deleted = false;
        const errors = await validate(subjects);
        if (errors.length > 0) {
            res.status(404).send(errors)
        }
        const verifycode = getRepository(Subjects);
        var verifycodeaw = await verifycode.findOne({ code_subjects: subjects.code_subjects });
        while (verifycodeaw) {
            subjects.makeid()
            verifycodeaw = await verifycode.findOne({ code_subjects: subjects.code_subjects })
        }
        try {
            const SubjetsRepository = getRepository(Subjects);
            subjects = await SubjetsRepository.manager.save(subjects);
        } catch (error) {
            return res.status(404).send(error)
        }
        return res.status(200).send({
            message: 'Se ha creado la asignatura ' + subjects.name_subjects + ' de la sección ' + subjects.section_subjects
        })
    }
    static ListSubjects = async (req: Request, res: Response) => {
        const teacher = res.locals.jwtpayload;
        const teacherRepository = getRepository(Subjects);
        let ListSubjets;
        try {
            ListSubjets = await teacherRepository.find(
                {
                    fk_id_teacher: teacher.userId
                }
            )
        } catch (error) {
            res.status(400).send({
                message: 'no hay resultados'
            })
        }
        const teacherSubject = getRepository(Subjects);
        let resultsubjets;
        try {
            resultsubjets = await teacherSubject.find({
                where: {
                    fk_id_teacher: teacher.userId
                }
            })
            if (resultsubjets == null) {
                throw false;
            }
        } catch (error) {
            return res.status(400).send({
                message: 'Esta materia no la esta dictando usted o no existe'
            })
        }

        for (let index = 0; index < resultsubjets.length; index++) {
            const element = resultsubjets[index];
            const activity_recive = getRepository(Activity_Send)
            let activity = [];
            try {
                let vartemp = await activity_recive.find({ where: { fk_code_subject: element.code_subjects } })
                for (let index = 0; index < vartemp.length; index++) {
                    const element = vartemp[index];
                    activity.push(element)
                }
            } catch (error) {
                return res.status(404).send({ message: "ha ocurrido un problema con la busqueda de actividades" })
            }
            resultsubjets[index].activity = activity;
        }
        res.status(200).json(resultsubjets)


    }
    static CreateActivity = async (req: Request, res: Response) => {
        const teacher = res.locals.jwtpayload;
        const {
            name_activity,
            description,
            Date_delivery,
            weighint,
            Status,
            fk_code_subject
        } = req.body;
        const activity = new Activity();
        activity.name_activity = name_activity;
        activity.description = description;
        activity.Date_delivery = new Date(Date_delivery);
        activity.weighint = weighint;
        activity.Status = Status;
        activity.fk_code_subject = fk_code_subject;

        const error = await validate(activity);
        if (error.length > 0) {
            error.map(element => {
                delete element.target;
                delete element.value;
            })
            return res.status(400).json(error)
        }
        const activityRepository = getRepository(Activity);
        let resultactivity;

        let subject_asinc = getRepository(Subjects);
        let result_asinc;
        try {
            result_asinc = await subject_asinc.find({ where: { fk_id_teacher: teacher.userId, code_subjects: activity.fk_code_subject } })
            if (result_asinc == null || result_asinc.length == 0) {
                throw false;

            }
        } catch (error) {
            if (error == false) {
                res.status(400).send({
                    message: 'Esta materia no la esta dictando usted o no existe.'
                })
            }
            res.status(404).send({
                message: 'ha ocurrido un error'
            })
        }
        try {
            resultactivity = await activityRepository.save(activity)
        } catch (error) {
            return res.status(400).send({
                message: 'El codigo de la materia no existe o esta desactivado'
            })
        }
        return res.status(200).send({
            message: "La actividad se ha creado existosamente."
        })

    }
    static DetailSubjects = async (req: Request, res: Response) => {
        const { code_subject } = req.params;
        const teacher = res.locals.jwtpayload;

        if (!code_subject) {
            return res.status(400).send({ message: 'Se requiere el codigo de la materia' })
        }

        const techacerSub = getRepository(Subjects);
        let resultsubjets;

        try {
            resultsubjets = await techacerSub.findOne(code_subject, { where: { fk_id_teacher: teacher.userId } })
            if (resultsubjets == null) {
                throw false;
            }
        } catch (error) {
            return res.status(400).send({
                message: 'Esta materia no la esta dictando usted o no existe'
            })
        }
        const activity_recive = getRepository(Activity)
        let activity = [];
        try {
            let vartemp = await activity_recive.find({ where: { fk_code_subject: resultsubjets.code_subjects } })
            for (let index = 0; index < vartemp.length; index++) {
                const element = vartemp[index];
                activity.push(element)
            }
        } catch (error) {
            return res.status(404).send({ message: "ha ocurrido un problema con la busqueda de actividades" })
        }
        resultsubjets = { ...resultsubjets, activity }
        res.status(200).send(resultsubjets)
    }
    static DetailActivity = async (req: Request, res: Response) => {
        const { id_activity } = req.params;
        const teacher = res.locals.jwtpayload;
        if (!id_activity) {
            return res.status(400).send({ message: 'Se requiere el codigo de la materia' })
        }



        const teacherActivity = getRepository(Activity);
        let resultactivity;

        try {
            resultactivity = await teacherActivity.query("SELECT * FROM `activity` WHERE activity.id_activity =" + id_activity)
            if (resultactivity == null) {
                throw false;
            }
        } catch (error) {
            return res.status(400).send({
                message: 'Esta actividad no existe'
            })
        }
        const teacherSubject = getRepository(Subjects);
        let resultsubjets;
        try {
            resultsubjets = await teacherSubject.find({
                where: {
                    code_subjects: resultactivity[0].fkCodeSubjectCodeSubjects,
                    fk_id_teacher: teacher.userId
                }
            })
            if (resultsubjets == null) {
                throw false;
            }
        } catch (error) {
            return res.status(400).send({
                message: 'Esta materia no la esta dictando usted o no existe'
            })
        }
        const activity_recive = getRepository(Activity_Send)
        let activity = [];
        try {
            let vartemp = await activity_recive.find({ where: { fk_code_subject: resultactivity[0].fkCodeSubjectCodeSubjects, fk_activity: resultactivity[0].id_activity } })
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
    static ActivityList = async (req: Request, res: Response) => {
        const teacher = res.locals.jwtpayload;
        const teacherRepository = getRepository(Subjects);
        let ListSubjets;
        try {
            let query = 'SELECT act.id_activity,act.name_activity,act.description,act.Date_delivery,act.Date_create,act.weighint, act.fkCodeSubjectCodeSubjects ';
            query += 'FROM activity act '
            query += 'JOIN subjects sub '
            query += 'WHERE sub.code_subjects = act.fkCodeSubjectCodeSubjects and act.Status = 1 and sub.fkIdTeacherIdTeacher ='+ teacher.userId
            console.log(query)
            ListSubjets = await teacherRepository.query(query)
        } catch (error) {
            res.status(400).send({
                message: 'no hay resultados'
            })
        } 
        console.log(ListSubjets)
        return res.status(200).send(ListSubjets)
    }
}

export default SubjetsTeacherController;