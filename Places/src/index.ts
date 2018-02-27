import "reflect-metadata";
import {createConnection} from "typeorm";
import {getConnection} from "typeorm";
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
    // const place = new Place();
    // place.placeName = "Grand West Casino";
  
    // await connection.manager.save(place);
    // console.log("Saved a new place with id: " + place.id);
    
    // console.log("Loading places from the database...");
    // const places = await connection.manager.find(Place);
    // console.log("Loaded users: ", places);
     
    // console.log("Here you can setup and run express/koa/any other framework.");

    const place = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Place)
    .values([
        { address_components: "Timber",
        lat: 65.76568,
        lng: 76.83765884,
        placeName: "Somewhere",
        type: "Club" }
     ])
    .execute();

    // const getPlace = await getConnection()
    // .createQueryBuilder()
    // .select()
    // .from(Place, "place")
    // .getMany();

console.log("New Place added:" ,place);
console.log(getPlace);

}).catch(error => console.log(error));
