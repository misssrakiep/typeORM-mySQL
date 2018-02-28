import "reflect-metadata";
import {createConnection} from "typeorm";
import {getConnection} from "typeorm";
import app from './App';
import * as bodyParser from "body-parser";
import {Place} from "./entity/Places";

createConnection({
  type: "mysql",
  host: "localhost",
  port: 4000,
  username: "root",
  database: "Places",
  entities: [
      Place
  ],
  synchronize: true,
  logging: false
}).then(async connection => {
    app.use(bodyParser.json());
    app.listen(4000)

}).catch(error => console.log(error));
