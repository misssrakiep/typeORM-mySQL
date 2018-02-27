import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Place {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    address_components: string;
    
    @Column()
    lat: number;

    @Column()
    lng: number;

    @Column()
    placeName: string;

    @Column()
    review?: string;

    @Column()
    rating?: number;

    @Column()
    type: string;

    @Column()
    website?: string;
    
}
