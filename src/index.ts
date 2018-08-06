import 'reflect-metadata';
import * as http from 'http';
import * as debug from 'debug';
import { Container } from 'inversify';
import { interfaces, InversifyExpressServer, TYPE } from 'inversify-express-utils'; 
import TYPES from './config/appTypes';
import App from './App';
import { MongoDBClient } from './config/dbclient';
import {TodoService} from "./services/TodoService";

debug('ts-express:server');

// initialize controllers/routes
import "./routes/TodoController";

// set up container
let container = new Container();

// set up bindings
container.bind<MongoDBClient>(TYPES.MongoDBClient).to(MongoDBClient);
container.bind<TodoService>(TYPES.TodoService).to(TodoService);

const port = normalizePort(process.env.PORT || 3000);
App.set('port', port);


let server = new InversifyExpressServer(container, null, null, App);
server
/*
.setErrorConfig((app) => {
  app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Something broke!');
  });
})
*/
.build()
.listen(port);



function normalizePort(val: number|string): number|string|boolean {
  let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  else return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') throw error;
  let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
  switch(error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/*
function onListening(): void {
  let addr = server.address();
  let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}
*/