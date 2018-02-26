import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Place {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    placeName: string;

    @Column({ unique: true })
    city: string;

    @Column({ unique: true })
    indoor: boolean;

}
