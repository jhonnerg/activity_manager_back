import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { MinLength, IsNotEmpty, IsEmail, Matches } from "class-validator"; 
import { Subjects } from "./subjects";
import { Student } from "./student";
@Entity()
export class subject_sinc_student {

    @PrimaryGeneratedColumn()
    id_subject_sinc_student: number;
    
    @ManyToOne(type => Student, Student => Student.id_student)
    fk_id_student: Student[];

    @ManyToOne(type => Subjects, Subjects => Subjects.code_subjects) 
    fk_code_subjects: string; 

}