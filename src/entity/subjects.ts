import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { MinLength, IsNotEmpty, IsEmail, Matches, IsBoolean } from "class-validator";
import * as bcrypt from "bcryptjs";
import { subject_sinc_student } from "./subject_sinc_student";
import { Teacher } from "./teacher";
@Entity()
@Unique(['code_subjects'])
export class Subjects {
 
    @Column()
    @IsNotEmpty()
    name_subjects: string;
    @Column() 
    description_subjects: string;

    @Column()
    @IsNotEmpty()
    section_subjects: string;

    @Column()
    @IsNotEmpty()
    turn: string;

    @Column()
    @IsNotEmpty()
    @MinLength(10)
    @PrimaryColumn()
    code_subjects: string;

    @ManyToOne(type => Teacher, teacher => teacher.id_teacher)
    fk_id_teacher: number;

    @Column()
    @IsBoolean()
    bool_deleted: boolean;

    makeid(): void {
        var result: any = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 10; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        this.code_subjects = result;
    }
}