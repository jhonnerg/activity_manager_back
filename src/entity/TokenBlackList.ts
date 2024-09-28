import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { MinLength, IsNotEmpty, IsEmail, Matches } from "class-validator";
import * as bcrypt from "bcryptjs";

@Entity() 
@Unique(['token'])
export class TokenBlackList {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @Column()
    DateExpired: string;
}