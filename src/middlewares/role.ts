import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Student } from "../entity/student";
export const checkRole = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {  
        const { userId } = res.locals.jwtpayload; 
        const userRepository = getRepository(Student)
        let user: any;
        try {
            user = await userRepository.findOneOrFail(userId) 
        } catch (error) {
            res.status(401).send();
        }
        const { role } = user;  
        if (roles.includes(role)) {
           return next();
        }
        res.status(401).json({ message: 'Not Authorized' })
    }
}