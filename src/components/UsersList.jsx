import React, { useCallback, useEffect, useRef, useState } from "react";
import UserItem from "./UserItem";

import styles from "../App.module.css";

const UsersList = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([
    { id: 1, name: "Create JS object", redirect: "complete" },
    { id: 2, name: "Create project with React", redirect: "complete" },
  ]);
  const [inProgress, setInProgress] = useState([
    { id: 5, name: "Set up utillities payments" },
    {
      id: 6,
      name: "View transaction history by category",
    },
  ]);

  const [completed, setCompleted] = useState([
    { id: 3, name: "Create Modal" },
    { id: 4, name: "Add products to the page" },
  ]);

  const nextId = useRef(7);
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onChange = (event) => {
    setInputValue(event.target.value);
  };

  const addTask = useCallback(
    (event) => {
      event.preventDefault();
      if (!inputValue.trim()) return;
      const newTask = {
        id: nextId.current++,
        name: inputValue,
        status: "todo",
      };
      setTodos((prevState) => [...prevState, newTask]);
      setInputValue("");
    },
    [inputValue]
  );

  const removeCompletedTask = (id) => {
    setCompleted((prevState) => prevState.filter((task) => task.id !== id), []);
  };

  const moveToToDo = useCallback(
    (id) => {
      setCompleted((prevState) => prevState.filter((task) => task.id !== id));
      setTodos((prevState) => [
        ...prevState,
        { ...completed.find((task) => task.id === id), redirect: "incomplete" },
      ]);
    },
    [completed, setCompleted, setTodos]
  );

  const redirectUser = (id) => {
    const task = todos.find((todo) => todo.id === id);
    if (task) {
      setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
      setCompleted((prevCompleted) => [
        ...prevCompleted,
        { ...task, redirect: "complete" },
      ]);
    }
  };
  const moveToInProgress = useCallback(
    (id) => {
      const task = todos.find((todo) => todo.id === id);
      if (task) {
        setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
        setInProgress((prevState) => [
          ...prevState,
          { ...task, redirect: "inProgress" },
        ]);
      }
    },
    [todos]
  );

  const inProgressComplete = useCallback(
    (id) => {
      const task = inProgress.find((task) => task.id === id);
      if (task) {
        setInProgress((prevState) =>
          prevState.filter((task) => task.id !== id)
        );
        setCompleted((prevState) => [
          ...prevState,
          { ...task, redirect: "complete" },
        ]);
      }
    },
    [inProgress, setInProgress, setCompleted]
  );

  return (
    <div className={styles.users}>
      <form className={styles.userForm} onSubmit={addTask}>
        <input
          ref={inputRef}
          type="text"
          onChange={onChange}
          value={inputValue}
          placeholder="...Add Item"
        />
        <button type="submit">Add Task</button>
      </form>
      <div className={styles.todos}>
        <div className={styles.forms}>
          <h1>To Do Tasks</h1>
          {todos.map((todo) => (
            <UserItem
              key={`todo-${todo.id}`}
              id={todo.id}
              name={todo.name}
              moveToInProgress={() => moveToInProgress(todo.id)}
              completeTask={redirectUser}
              isInProgress={false}
              isCompleted={false}
            />
          ))}
        </div>
        <div className={styles.forms}>
          <h1>In Progress</h1>
          {inProgress.map((task) => (
            <UserItem
              key={`inProgress-${task.id}`}
              id={task.id}
              name={task.name}
              inProgressComplete={() => inProgressComplete(task.id)}
              isInProgress={true}
              isCompleted={false}
            />
          ))}
        </div>

        <div className={styles.forms}>
          <h1>Completed Tasks</h1>
          {completed.map((task) => (
            <UserItem
              key={`completed-${task.id}`}
              id={task.id}
              name={task.name}
              action={redirectUser}
              redirect={task.redirect}
              isCompleted={true}
              deleteAction={removeCompletedTask}
              moveToToDoAction={moveToToDo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersList;
