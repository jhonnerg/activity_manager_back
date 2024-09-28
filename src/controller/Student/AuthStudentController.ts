import * as jwt from "jsonwebtoken";
import config from "../../config/config";
import { validate } from "class-validator";
import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Student } from "../../entity/student";
import { TokenBlackList } from "../../entity/TokenBlackList";
import * as nodemailer from "nodemailer";
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] =  '1'; 
class AuthStudentController {
    static login = async (req: Request, res: Response) => {
        const { username, password } = req.body;
        if (!(username && password)) {
            return res.status(400).json({
                message: 'Username and Password are required!'
            })
        }
        const userRepository = getRepository(Student);
        let user: Student;
        try {
            user = await userRepository.findOneOrFail({
                where: {
                    username:username
                }
            })
            console.log(user)
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
        let data_user = {
            username: user.username,
            frist_name: user.frist_name,
            second_name: user.second_name,
            frist_surname: user.frist_surname,
            second_surname: user.second_surname,
            email: user.email,
            role: user.role
        }
        const token = jwt.sign({ userId: user.id_student, username: user.username }, config.jwtSecret, { expiresIn: '1h' })
        res.send({ message: 'ok', token, user: data_user });
    }

    static UserRegister = async (req: Request, res: Response) => {
        const student = new Student();
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
        student.username = username;
        student.password = password;
        student.frist_name = frist_name;
        student.second_name = second_name;
        student.frist_surname = frist_surname;
        student.second_surname = second_surname;
        student.email = email;
        student.role = 'student';
        const errors = await validate(student)
        if (errors.length > 0) {
            errors.map(element => {
                delete element.target;
                delete element.value;
                delete element.children;
            })
            return res.status(400).json(errors)
        }
        if (student.password != confirpassword) {
            res.status(400).send(
                [{
                    "property": "confirpassword",
                    "constraints": {
                        "NotEqueal": "password is not equal to confirpassword",
                    }
                }]
            )
        }
        student.hashPassword();
        const userRepository = getRepository(Student);
        try {
            await userRepository.save(student)
        } catch (error) {
            res.status(409).send({
                message: "User already exist"
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
        const studentRepository = getRepository(Student);
        if (!email) {
            return res.status(400).send({
                message: 'required email'
            })
        }
        var student;
        try {
            student = await studentRepository.findOneOrFail({ email: email });
        } catch (error) {
            res.status(404).send({
                message: 'this student is not registered'
            })
        }
        const token = jwt.sign({ userId: student.id, username: student.username }, config.jwtSecret, { expiresIn: '600000' })
        var mailOptions = {
            from: 'prueba@gmail.com',
            to: student.email,
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
                                <a href="http://localhost:4200/student/auth/changepassword/`+ token + `" target="_blank" style=" background:#ED2939; width:100px; margin:auto; padding: 8px 12px; border: 1px solid #ED2939;border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;">
                                Click             
                                 </a>  
                                </td> 
                            </tr>
                            <tr>
                                <td style="text-align:center;">
                                    <a href="http://localhost:4200/student/auth/changepassword/`+ token + `">http://localhost:4200/student/auth/changepassword/` + token + `</a>
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
        let idstuden
        let student: Student;
        const studentRepository = getRepository(Student)
        const tkRpository = getRepository(TokenBlackList)

        try {
            jwtpayload = <any>jwt.verify(token, config.jwtSecret)
            idstuden = jwtpayload.userId;
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
            student = await studentRepository.findOneOrFail(idstuden)
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
        student.password = confiPassword;
        const errors = await validate(student)
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
            student.hashPassword()
            await studentRepository.save(student)
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
        const userRepository = getRepository(Student);
        let user: Student;
        try {
            user = await userRepository.findOneOrFail(userId);

        } catch (error) {
            res.status(400).json({ message: 'User dont exist' });
        }
        if (!user.checkpassword(oldPassword)) {
            return res.status(401).json({ message: 'Check old password' })
        }
        user.password = newPassword;
        const errors = await validate(user);
        errors.map(element => {
            delete element.value;
            delete element.target;
        })
        if (errors.length > 0) {
            return res.status(400).json(errors)
        }

        //hass password
        user.hashPassword();
        userRepository.save(user);
        return res.status(200).send({
            message: 'Update password save'
        })

    }
}
export default AuthStudentController;