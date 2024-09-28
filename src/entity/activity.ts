import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { MinLength, IsNotEmpty, IsEmail, Matches, IsInt, Min, Max, IsDate, IsString, IsBoolean } from "class-validator";
import * as bcrypt from "bcryptjs";
import { Subjects } from "./subjects";

@Entity()
export class Activity {

    @PrimaryGeneratedColumn()
    id_activity: number;
    @Column()
    @IsNotEmpty()
    @IsString()
    name_activity:string;
    @Column()
    @IsNotEmpty()
    @IsString()
    description:string;
    @Column()
    @IsDate()
    @IsNotEmpty()
    Date_delivery:Date;
    @Column()
    @CreateDateColumn()
    Date_create:Date;
    @Column()
    @IsInt()
    @Min(5)
    @Max(100)
    @IsNotEmpty()
    weighint:number;
    @Column()
    @IsBoolean()
    Status:boolean;
    @ManyToOne(type => Subjects, Subjects => Subjects.code_subjects)
    fk_code_subject:string;
}
