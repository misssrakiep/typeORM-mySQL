import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";


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
}
