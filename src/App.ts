import * as path from 'path';
import * as express from 'express';
import * as morgan from 'morgan';
var winston = require("./config/Logger");
//import * as winston from "./config/Logger";
import * as bodyParser from 'body-parser';



// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    console.log("app constructor")
    this.express = express();
    this.middleware();    
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(morgan('combined', { stream: winston.stream }));

    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());    
    
  }

}

export default new App().express;