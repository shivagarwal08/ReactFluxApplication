import React from 'react';
import CreateToDo from '../components/todo/create-todo';
import ToDosList from '../components/todo/todos-list';
import * as TodoActions from "../actions/TodoActions";
import TodoStore from '../stores/TodoStore';

export default class ToDos extends React.Component {
    constructor(props) {
        super(props);
        this.getTodos = this.getTodos.bind(this);
        this.state = {
            todos: TodoStore.getAll(),
        }
    }

    componentWillMount() {
        TodoStore.on("change", this.getTodos);
        console.log("count:", TodoStore.listenerCount("emit"));
    }
    componentWillUnmount() {
        TodoStore.removeListener("change", this.getTodos);
    }
    getTodos() {
        this.setState({
            todos: TodoStore.getAll()
        });
    }

    render() {
        return (
            <div>
                <button type="btn btn-default" onClick={this.loadAsync.bind(this)}>Load Async Todos</button>
                <CreateToDo todos={this.state.todos} createTask={this.createTask.bind(this)} />
                <ToDosList
                    todos={this.state.todos}
                    toggleTask={this.toggleTask.bind(this)}
                    saveTask={this.saveTask.bind(this)}
                    deleteTask={this.deleteTask.bind(this)}
                    />
            </div>
        )
    }

    loadAsync() {
        TodoActions.loadTodos();
    }
    toggleTask(task) {
        TodoActions.toggleTodo(task);
    }
    createTask(task) {
        TodoActions.createTodo(task);
    }
    saveTask(oldTask, newTask) {
        TodoActions.saveTodo(oldTask, newTask);
    }
    deleteTask(id) {
        TodoActions.deleteTodo(id);
    }

}
