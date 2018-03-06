import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";


@Entity()
export class Place {


    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    address_components?: string;
    
    @Column()
    latlng: number;

    @Column()
    placeName: string;

    @Column()
    review?: string;

    @Column()
    rating?: number;

    @Column()
    type?: string;

    @Column()
    website?: string;
    
}
