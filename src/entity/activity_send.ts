import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { MinLength, IsNotEmpty, IsEmail, Matches, IsInt, Min, Max, IsDate, IsString, IsBoolean } from "class-validator";
import * as bcrypt from "bcryptjs";
import { Subjects } from "./subjects";
import { Activity } from "./activity";
import { Student } from "./student";
import { subject_sinc_student } from "./subject_sinc_student";

@Entity()
@Unique(['url_server'])
export class Activity_Send {

    @PrimaryGeneratedColumn()
    id_activity_send: number;

    @Column()
    @MinLength(10)
    @IsNotEmpty()
    description: string;

    @Column()
    url_server: string; 

    @Column() 
    weighint: number;

    @ManyToOne(type => Subjects, Subjects => Subjects.code_subjects)
    fk_code_subject: Subjects;

    @ManyToOne(type => Activity, Subjects => Subjects.id_activity)
    fk_activity: Activity;

    @ManyToOne(type => subject_sinc_student, Subjects => Subjects.fk_id_student)
    fk_student: Student;
}
