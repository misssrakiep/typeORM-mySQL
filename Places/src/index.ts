import "reflect-metadata";
import {createConnection} from "typeorm";
import {Place} from "./entity/Places";
import app from './App';

createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  database: "Places",
  entities: [
      Place
  ],
  synchronize: true,
  logging: false
}).then(async connection => {

    console.log("Inserting a new user into the database...");
    const place = new Place();
    place.placeName = "Grand West Casino";
    place.city = "Cape Town";
    place.indoor = true;
    await connection.manager.save(place);
    console.log("Saved a new place with id: " + place.id);
    
    console.log("Loading places from the database...");
    const places = await connection.manager.find(Place);
    console.log("Loaded users: ", places);
     
    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
