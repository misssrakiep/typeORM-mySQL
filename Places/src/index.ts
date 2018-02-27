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


    const place = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Place)
    .values(values)
    .execute();

    // const getPlace = await getConnection()
    // .createQueryBuilder()
    // .select()
    // .from(Place, "place")
    // .getMany();

console.log("New Place added:" ,place);

}).catch(error => console.log(error));
