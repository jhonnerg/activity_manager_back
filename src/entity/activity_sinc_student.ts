import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { MinLength, IsNotEmpty, IsEmail, Matches, IsInt, Min, Max, IsBoolean } from "class-validator";
import { Student } from "./student";
import { Activity } from "./activity";
@Entity()
export class activity_sinc_student {

    @PrimaryGeneratedColumn()
    id_activity_sinc_student: number;
    
    @Column()
    @IsInt()
    @Min(0)
    @Max(100)
    @IsNotEmpty()
    weighint: number;

    @Column()
    @IsBoolean()
    status_verific: boolean = false;

    @ManyToOne(type => Student, Student => Student.id_student)
    fk_id_student: Student[];

    @ManyToOne(type => Activity, Subjects => Subjects.id_activity)
    fk_id_activity: string;


}