import * as jwt from "jsonwebtoken";
import config from "../../config/config";
import { validate } from "class-validator";
import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Teacher } from "../../entity/teacher";
import { TokenBlackList } from "../../entity/TokenBlackList";
import * as nodemailer from "nodemailer";
import { send } from "process";
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
class AuthTeacherController {
    static login = async (req: Request, res: Response) => { 
        const { username, password } = req.body;
        if (!(username && password)) {
            return res.status(400).json({
                message: 'Username and Password are required!'
            })
        }
        const userRepository = getRepository(Teacher);
        let user: Teacher;
        try {
            user = await userRepository.findOneOrFail({
                where: {
                    username
                }
            })
        } catch (error) {
            return res.status(400).json({
                message: 'Username of password incorrect'
            })
        }
        if (!user.checkpassword(password)) {
            return res.status(400).json({
                message: 'Username of password incorrect'
            })

        }
        const token = jwt.sign({ userId: user.id_teacher, username: user.username }, config.jwtSecret, { expiresIn: '1h' })
        res.send({ message: 'ok', token });
    }

    static UserRegister = async (req: Request, res: Response) => {
        const teacher = new Teacher(); 
        const {
            username,
            password,
            confirpassword,
            frist_name,
            second_name,
            frist_surname,
            second_surname,
            email
        } = req.body;
        teacher.username = username;
        teacher.password = password;
        teacher.frist_name = frist_name;
        teacher.second_name = second_name;
        teacher.frist_surname = frist_surname;
        teacher.second_surname = second_surname;
        teacher.email = email;
        teacher.role = 'teacher';
        const errors = await validate(teacher)
        if (errors.length > 0) {
            errors.map(element => {
                delete element.target;
                delete element.value;
                delete element.children;
            })
            return res.status(400).json(errors)
        }
        if (teacher.password != confirpassword) {
            res.status(400).send(
                [{
                    "property": "confirpassword",
                    "constraints": {
                        "NotEqueal": "password is not equal to confirpassword",
                    }
                }]
            )
        }
        teacher.hashPassword();
        const userRepository = getRepository(Teacher);
        try {
            await userRepository.save(teacher)
        } catch (error) {
            res.status(409).send({
                message: "Username or email already exist"
            })
        }
        return res.status(200).send({
            message: 'User create'
        })

    }

    static RecoveryPassword = async (req: Request, res: Response) => {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'elprangregorio@gmail.com',
                pass: 'jhonner3072'
            }
        });
        const { email } = req.body;
        const teacherRepository = getRepository(Teacher);
        if (!email) {
            return res.status(400).send({
                message: 'required email'
            })
        }
        var teacher;
        try {
            teacher = await teacherRepository.findOneOrFail({ email: email });
        } catch (error) {
            res.status(404).send({
                message: 'this teacher is not registered'
            })
        }
        const token = jwt.sign({ userId: teacher.id, username: teacher.username }, config.jwtSecret, { expiresIn: '600000' })
        var mailOptions = {
            from: 'prueba@gmail.com',
            to: teacher.email,
            subject: 'Recuperación de contraseña',
            html: ` 
            <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                    <td>
                        <table cellspacing="0" cellpadding="0">
                            <tr>
                                <td style="text-align:center;">
                                    <h2>
                                        Recuperar contraseña
                                    <h2>
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align:center;">
                                    <h4>
                                        Por favor de click alguno de los enlaces para recuperar tu contraseña
                                    </h4>
                                </td>
                            </tr>
                            <tr>
                                <td style="border-radius: 2px; text-align:center; " >
                                <a href="http://localhost:4200/teacher/auth/changepassword/`+ token + `" target="_blank" style=" background:#ED2939; width:100px; margin:auto; padding: 8px 12px; border: 1px solid #ED2939;border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;">
                                Click             
                                 </a>  
                                </td> 
                            </tr>
                            <tr>
                                <td style="text-align:center;">
                                    <a href="http://localhost:4200/teacher/auth/changepassword/`+ token + `">http://localhost:4200/teacher/auth/changepassword/` + token + `</a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table> `
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).send(error)
            } else {
                res.status(200).send({
                    message: 'Confirmation email was sent to recover password'
                })
            }
        });

    }

    static ChangePasswordLogout = async (req: Request, res: Response) => {
        const { token } = req.params;
        const { newPassword, confiPassword } = req.body;
        let jwtpayload;
        let idteacher
        let teacher: Teacher;
        const teacherRepository = getRepository(Teacher)
        const tkRpository = getRepository(TokenBlackList)

        try {
            jwtpayload = <any>jwt.verify(token, config.jwtSecret)
            idteacher = jwtpayload.userId;
            const verifiexpiretoken = await tkRpository.findOne({ token: token });
            if (verifiexpiretoken) {
                throw false;
            }
        } catch (error) {
            return res.status(401).send({
                message: 'Token invalid or expired'
            })
        }
        try {
            teacher = await teacherRepository.findOneOrFail(idteacher)
        } catch (error) {
            return res.status(400).send({
                message: "User don't exist"
            })
        }
        if (!(newPassword && confiPassword)) {
            !(newPassword != '') ? res.status(400).send({ message: 'required newpassword  ' }) : false;
            !(confiPassword != '') ? res.status(400).send({ message: 'required confipassword' }) : false;
        }
        if (newPassword != confiPassword) {
            return res.status(400).send({
                message: "Don't equeal password"
            })
        }
        teacher.password = confiPassword;
        const errors = await validate(teacher)
        errors.map(element => {
            delete element.target;
            delete element.value;
        })
        if (errors.length > 0) {
            return res.status(400).json(errors)
        }
        let tokenTK: TokenBlackList = {
            id: null,
            token: token,
            DateExpired: jwtpayload.exp
        };
        try {
            tokenTK = await tkRpository.save(tokenTK);
        } catch (error) {
            return res.status(404).send({
                message: 'Algo ha salido mal'
            })
        }
        try {
            teacher.hashPassword()
            await teacherRepository.save(teacher)
        } catch (error) {
            return res.status(409).json({
                message: 'Username already exist'
            })
        }
        res.status(200).send({ message: 'Change password true' })
    }

    static changepassword = async (req: Request, res: Response) => {
        const { userId } = res.locals.jwtpayload;
        const { oldPassword, newPassword } = req.body;
        if (!(oldPassword && newPassword)) {
            return res.status(400).json({ message: 'Old Password and new password are required' })
        }
        const teacherRepository = getRepository(Teacher);
        let teacher: Teacher;
        try {
            teacher = await teacherRepository.findOneOrFail(userId);

        } catch (error) {
            res.status(400).json({ message: 'teacher dont exist' });
        }
        if (!teacher.checkpassword(oldPassword)) {
            return res.status(401).json({ message: 'Check old password' })
        }
        teacher.password = newPassword;
        const errors = await validate(teacher);
        errors.map(element => {
            delete element.value;
            delete element.target;
        })
        if (errors.length > 0) {
            return res.status(400).json(errors)
        }

        //hass password
        teacher.hashPassword();
        teacherRepository.save(teacher);
        return res.status(200).send({
            message: 'Update password save'
        })

    }
}
export default AuthTeacherController;