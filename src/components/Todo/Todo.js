import React, { useState, useEffect } from 'react';
import Toast from 'light-toast';

const Todo = ({ task = {}, editTodo }) => {
    // set for possible edit
    const [taskDescription, setTaskDescription] = useState(task.taskDescription);
    const [subtask, setSubtask] = useState(task.subtask);
    const [isDone, setIsDone] = useState(task.isDone);

    useEffect(() => {
        editTodo({
            taskDescription: taskDescription,
            isDone,
            subtask,
        })
    }, [taskDescription, isDone, subtask, editTodo]);

    const onTaskDescriptionChange = e => {
        setTaskDescription(e.target.value);
    };

    const onTaskDescriptionEnter = e => {
        if (e.keyCode === 13) {
            // TODO: set input to non-editable
        }
    };

    const editSubtask = idx => {
        return content => {
            const tmpSubtask = subtask.slice(0);
            tmpSubtask[idx] = content;
            setSubtask(tmpSubtask);
        }
    };

    const addSubtask = () => {
        if (taskDescription === "" || subtask[subtask.length - 1] === "") {
            Toast.fail("Task should have a description before adding new items", 3000);
            return;
        }

        setSubtask([...subtask, {
            taskDescription: "",
            isDone: false,
            subtask: [],
        }]);
    };

    return (
        <>
            <div className="row">
                {/* tick */}
                <div
                    style={{
                        marginTop: "-2px",
                        width: "35px",
                    }}
                    className="col"
                >
                    <p>
                        <label>
                            <input
                                type="checkbox"
                                className="filled-in"
                                onClick={() => setIsDone(!isDone)}
                                defaultChecked={isDone ? "checked" : ""}
                            />
                            <span></span>
                        </label>
                    </p>
                </div>

                <div className="col s8">
                    <input
                        id="task-description"
                        type="text"
                        value={taskDescription}
                        onChange={onTaskDescriptionChange}
                        onKeyPress={onTaskDescriptionEnter}
                        placeholder="Item description"
                    />
                    <label htmlFor="task-description">Task Description</label>
                </div>

                {/* add subtask */}
                <div className="col s2">
                    <button className="btn"
                        onClick={addSubtask}
                    >
                        Add sub-items
                    </button>
                </div>
            </div>

            <div className="row">
                {subtask.map((task, idx) => (
                    <div key={idx} style={{marginLeft: "20px"}}>
                        <Todo task={task} editTodo={editSubtask(idx)}/>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Todo;
