import {Router, Request, Response, NextFunction} from 'express';
import { interfaces, controller, httpGet, httpPost, httpDelete, request, queryParam, response, requestParam, httpPut } from "inversify-express-utils";
import { injectable, inject } from "inversify";
import TYPES from '../config/appTypes';
import {Todo} from "../models/Todo";
import {TodoService} from "../services/TodoService";


@controller("/t")
export class TodoController implements interfaces.Controller {

    //constructor( @inject("FooService") private fooService: FooService ) {}
    constructor( @inject(TYPES.TodoService) private todoService: TodoService) { }
    

    @httpGet("/")
    private index(req: Request, res: Response, next: NextFunction) {
        
        res.send([{}]);
        //return this.fooService.get(req.query.id);
    }

    @httpGet("/all")
    public getTodos(): Promise<Todo[]> {
        return this.todoService.getTodos();
    }

    @httpPost('/')
    public newTodo(request: Request): Promise<Todo> {
        console.log("adding todo: ", request.body);
        return this.todoService.newTodo(request.body);
    }

    @httpPut('/:id')
    public updateTodo(request: Request): Promise<Todo> {
        return this.todoService.updateTodo(request.params.id, request.body);
    }

    @httpDelete('/:id')
    public deleteTodo(request: Request): Promise<any> {
        return this.todoService.deleteTodo(request.params.id);
    }
}
