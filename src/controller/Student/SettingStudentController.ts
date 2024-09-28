import * as jwt from "jsonwebtoken";
import config from "../../config/config";
import { validate } from "class-validator";
import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Student } from "../../entity/student";
import { TokenBlackList } from "../../entity/TokenBlackList";
import * as nodemailer from "nodemailer"; 
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
class SettingStudentController { 
    
    static  Personalinformation = async (req: Request, res: Response) => {
        
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
export default SettingStudentController;