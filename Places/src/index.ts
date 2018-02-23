import "reflect-metadata";
import {createConnection} from "typeorm";
import {Place} from "./entity/Places";
import app from './App';

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const place = new Place();
    place.placeName = "Arabian nights";
    place.city = "Cape Town";
    place.indoor = true;
    await connection.manager.save(place);
    console.log("Saved a new place with id: " + place.id);
    
    console.log("Loading places from the database...");
    const places = await connection.manager.find(Place);
    console.log("Loaded users: ", places);
     
    console.log("Here you can setup and run express/koa/any other framework.");
  const port = process.env.PORT || 9090;  

}).catch(error => console.log(error));
