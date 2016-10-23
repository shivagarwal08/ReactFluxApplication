import dispatcher from "../dispatcher";

export function createTodo(task) {
    dispatcher.dispatch({
        type: "CREATE_TODO",
        task,
    })
}

export function deleteTodo(id) {
    dispatcher.dispatch({
        type: "DELETE_TODO",
        id
    })
}

export function saveTodo(oldTask, newTask) {
    dispatcher.dispatch({
        type: "SAVE_TODO",
        oldTask,
        newTask
    })
}

export function toggleTodo(task) {
    dispatcher.dispatch({
        type: "TOGGLE_TODO",
        task
    })
}
