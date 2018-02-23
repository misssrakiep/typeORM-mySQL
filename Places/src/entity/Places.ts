import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Place {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    placeName: string;

    @Column()
    city: string;

    @Column()
    indoor: boolean;

}
