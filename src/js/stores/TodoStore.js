import { EventEmitter } from "events";

import dispatcher from '../dispatcher';

class TodoStore extends EventEmitter {

    constructor() {
        super()
        this.todos = [
            {
                id: 112233445,
                task: 'Go Shopping',
                isCompleted: false
            },
            {
                id: 112233556,
                task: 'Pay Water Bills',
                isCompleted: false
            }
        ];
    }
    createTodo(task) {
        const id = Date.now();
        this.todos.push({
            id,
            task,
            complete: false
        });
        this.emit("change");
    }
    deleteTodo(id) {
        _.remove(this.todos, todo => todo.id === id);
        this.emit("change");
    }
    saveTodo(oldTask, newTask) {
        const foundTodo = _.find(this.todos, todo => todo.task === oldTask);
        foundTodo.task = newTask;
       this.emit("change");
    }
    toggleTodo(task) {
        const foundTodo = _.find(this.todos, todo => todo.task === task);
        foundTodo.isCompleted = !foundTodo.isCompleted;
        this.emit("change");
    }

    getAll() {
        return this.todos;
    }
    handleActions(action) {
        switch (action.type) {
            case "CREATE_TODO": {
                this.createTodo(action.task);
                break;
            }
            case "DELETE_TODO": {
                this.deleteTodo(action.id);
                break;
            }
            case "SAVE_TODO": {
                this.saveTodo(action.oldTask, action.newTask);
                break;
            }
            case "TOGGLE_TODO": {
                this.toggleTodo(action.task);
                break;
            }
            case "FETCH_TODOS": break;
            case "FETCH_TODOS_ERROR": break;
            case "RECEIVED_TODOS": {
                this.todos = this.todos.concat(action.todos);
                this.emit("change");
                break;
            }
        }
    }
}
const todoStore = new TodoStore;
dispatcher.register(todoStore.handleActions.bind(todoStore));
window.dispatcher = dispatcher;
export default todoStore;
