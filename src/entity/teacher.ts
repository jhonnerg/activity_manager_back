import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { MinLength, IsNotEmpty, IsEmail, Matches } from "class-validator";
import * as bcrypt from "bcryptjs";

@Entity()
@Unique(['username'])
@Unique(['email'])
export class Teacher {

    @PrimaryGeneratedColumn()
    id_teacher: number;
    @Column()
    @IsNotEmpty()
    @MinLength(6) 
    username: string;
    @Column()
    @MinLength(6)
    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9.@_-]+$/)
    password: string;
    @Column()
    @MinLength(2)
    @IsNotEmpty()
    frist_name: string;
    @Column()
    @MinLength(2)
    @IsNotEmpty()
    second_name: string;
    @Column()
    @MinLength(2)
    @IsNotEmpty()
    frist_surname: string;
    @Column()
    @MinLength(2)
    @IsNotEmpty()
    second_surname: string;
    @Column()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @Column()
    @CreateDateColumn()
    createAt: Date;
    @Column()
    role: string;
    @Column()
    @UpdateDateColumn()
    updateAt: Date;

    hashPassword(): void {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt)
    }
    checkpassword(password): boolean {
        return bcrypt.compareSync(password, this.password)
    }

}
