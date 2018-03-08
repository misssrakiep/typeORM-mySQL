import * as express from 'express';
import { Request, Response } from "express";
import { Place } from "./entity/Places";
import { Reviews } from "./entity/Reviews"
import { getConnection, getRepository } from "typeorm";
import * as $ from "jquery";
import * as bodyParser from "body-parser";




class App {
    public express

    constructor() {
        this.express = express()
        this.middleware()
        this.mountRoutes()
    }

    private middleware(): void {
        this.express.use(bodyParser.urlencoded({'extended':true})); // parse expresslication/x-www-form-urlencoded
        this.express.use(bodyParser.json()); // parse application/json
        this.express.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', "*");
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', '"Origin, X-Requested-With, Content-Type, Accept"');
            next();
        });
    }

    private mountRoutes(): void {
        const router = express.Router()

        //route for posting new place entries to the database
        router.post('/api/postEntry', (req, res) => {            
             getConnection()
            .createQueryBuilder()
            .insert()
            .into( Place )
            .values(req.body)
            .execute();
            console.log("done");
            
        })

        //route to get al posted entries for rendering on front end screen
        router.get('/api/allEntries', (req, res) => {

            getRepository(Place)
                .createQueryBuilder("place")
                .from(Place, "place")
                .getMany()
        })

        //route for posting new review entries into the database
        router.post('/api/postReviews', (req, res) => {
            getConnection()
            .createQueryBuilder()
            .insert()
            .into( Reviews )
            .values(req.body)
            .execute();
            console.log("done");
        });

        router.get('/api/getReviews', (req, res) => {
            getRepository(Place)
            .createQueryBuilder("reviews")
            .from(Reviews, "reviews")
            .getMany()
        })


        this.express.use('/', router)

    }
}




export default new App().express