import { inject, injectable } from 'inversify';
import { MongoDBClient } from '../config/dbclient';
import {Todo} from "../models/Todo";
import TYPES from '../config/appTypes';

@injectable()
export class TodoService {
    private mongoClient: MongoDBClient;

    constructor(
        @inject(TYPES.MongoDBClient) mongoClient: MongoDBClient) {
        this.mongoClient = mongoClient;
    }

    public getTodos(): Promise<Todo[]> {
        return new Promise<Todo[]>((resolve, reject) => {
          this.mongoClient.find('todos', {}, (error, data: Todo[]) => {
            resolve(data);
          });
        });
      }
    
      public getTodo(id: string): Promise<Todo> {
        return new Promise<Todo>((resolve, reject) => {
          this.mongoClient.findOneById('todos', id, (error, data: Todo) => {
            resolve(data);
          });
        });
      }
    
      public newTodo(todo: Todo): Promise<Todo> {
        return new Promise<Todo>((resolve, reject) => {
          this.mongoClient.insert('todos', todo, (error, data: Todo) => {
            resolve(data);
          });
        });
      }
    
      public updateTodo(id: string, todo: Todo): Promise<Todo> {
        return new Promise<Todo>((resolve, reject) => {
          this.mongoClient.update('todos', id, todo, (error, data: Todo) => {
            resolve(data);
          });
        });
      }
    
      public deleteTodo(id: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
          this.mongoClient.remove('todos', id, (error, data: any) => {
            resolve(data);
          });
        });
      }
}