import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne} from "typeorm";
import { Place } from "./Places";


@Entity()
export class Reviews {


    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_name?: string;
   
    @Column()
    rating?: number;

    @Column()
    review: string;

    @Column()
    pictures?: string;

    @ManyToOne(type => Reviews, reviews => reviews.place)
    place ?: Place
}
