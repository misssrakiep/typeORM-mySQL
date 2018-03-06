import "reflect-metadata";
import {createConnection} from "typeorm";
import {getConnection} from "typeorm";
import app from './App';
import {Place} from "./entity/Places";

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
    console.log("connected");
    app.listen(4000)

}).catch(error => console.log(error));
