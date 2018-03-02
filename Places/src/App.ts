import * as express from 'express';
import {Request, Response} from "express";
import {Place} from "./entity/Places";
import {getConnection, getRepository} from "typeorm";





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

        router.post('/api/allEntries', (req, res) => {
            const place = getConnection()
            .createQueryBuilder()
            .insert()
            .into(Place)
            .values(values)
            .execute();

            res.json(place)
        })

        router.get('/api/entries', (req, res) => {

            getRepository(Place)
            .createQueryBuilder("place")
            .getMany()
            .then(result => {
                res.json(result)
                console.log(result);
                
            })
        })


        this.express.use('/', router)

    } 
}



export default new App().express