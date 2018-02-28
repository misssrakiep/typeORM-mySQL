import * as express from 'express';
import {Request, Response} from "express";
import {Place} from "./entity/Places";
import {getConnection} from "typeorm";


    let address_components:string = "16 Panton Road, Fairways";
    let lat:number = 0;
    let lng:number = 0;
    let placeName:string = "my House";
    let review:string = "There is a dog outside";
    let rating:number = 0;
    let type:string = "Home";
    let website:string = "No website";

    let values = {
        address_components: address_components,
        lat: lat,
        lng: lng,
        placeName: placeName,
        review: review,
        rating: rating,
        type: type,
        website: website
    }

class App {
    public express
    
    constructor() {
        this.express = express()
        this.mountRoutes()
    }

    private mountRoutes(): void {
        const router = express.Router()

        router.get('/api/allEntries', (req, res) => {
            const place = getConnection()
            .createQueryBuilder()
            .insert()
            .into(Place)
            .values(values)
            .execute();

            res.json(place)
        })

        router.get('/api/entries', (req, res) => {
            const placesInfo = getConnection()
            .createQueryBuilder()
            .from(Place, "place")
            .getMany();
            res.json(placesInfo)
        })

        this.express.use('/', router)

    } 
}



export default new App().express