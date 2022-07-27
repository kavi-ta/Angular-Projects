import { Injectable } from '@angular/core';
import {of} from "rxjs"
import {Todo} from "../model/todo"
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos:Todo[];
  constructor() {
    this.todos = [
      {
        id:'111',
        title:"Learn C++",
        isCompleted:true,
        date:new Date()
      },
      {
        id:'222',
        title:"Learn React",
        isCompleted:true,
        date:new Date()
      },
      {
        id:'333',
        title:"Learn Angular",
        isCompleted:false,
        date:new Date()
      }
    ]
   }

  //  methods for crud
  //1. read
  getTodos(){
    return of(this.todos)
  }

  // 2. create
  addTodo(todo:Todo){
    this.todos.push(todo)
  }

  // 3. update
  changeStatus(todo:Todo){
    this.todos.map(singleTodo =>{
      if(singleTodo.id==todo.id){
        todo.isCompleted = !todo.isCompleted
      }
    })
  }

  //4. delete
  deleteTodo(todo:Todo){
    const indexofTodo = this.todos.findIndex(
      (currentObj)=> currentObj.id===todo.id
    )
    this.todos.splice(indexofTodo,1)
  }

}
// any modification in data is done through services