import React, { useState, useEffect } from 'react';
import Toast from 'light-toast';

import Todo from '../Todo';

const TodoList = () => {
    // TODO: getItem from localstorage
    const [todos, setTodos] = useState(
        JSON.parse(window.localStorage.getItem('todos')) || []
    );

    useEffect(() => {
        // TODO: setItem to localstorage
        window.localStorage.setItem('todos', JSON.stringify(todos));
    });

    const addTodo = () => {
        if (todos[todos.length - 1] === "") {
            Toast.fail("Task should have a description before adding new items", 3000);
            return;
        }

        setTodos([...todos, {
            taskDescription: "",
            isDone: false,
            subtask: [],
        }]);
    };

    const editTodo = idx => {
        return (content) => {
            const tmpTodos = todos.slice(0);
            tmpTodos[idx] = content; // content should be object
            setTodos(tmpTodos);
        }
    }

    return (
        <>
            {/* add task; set fixed (?) */}
            <button
                style={{
                    position: "fixed",
                    bottom: "50px",
                    right: "50px",
                }}
                className="btn-floating btn-large waves-effect grey darken-4"
                onClick={addTodo}
            >
                <i className="material-icons">add</i>
            </button>

            <div>
                {todos.map((todo, idx) => (
                    <div key={idx}>
                        <Todo
                            task={todo}
                            editTodo={editTodo(idx)}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

export default TodoList;
