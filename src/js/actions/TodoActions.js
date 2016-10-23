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

export function loadTodos() {
    dispatcher.dispatch({ type: "FETCH_TODOS" });

    setTimeout(() => {
        dispatcher.dispatch({
            type: "RECEIVED_TODOS",
            todos: [
                {
                    id: 445566778,
                    task: "Go Shopping Again",
                    isCompleted: false
                },
                {
                    id: 556677889,
                    task: "Pay Water Bills Again",
                    isCompleted: false
                }]
        });
        let ifError; 
        if (ifError) {
            dispatcher.dispatch({type: "FETCH_TODOS_ERROR", error: "Failed!!!" });
        }
    }, 1000);
}
