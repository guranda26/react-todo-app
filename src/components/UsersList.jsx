import React, { useCallback, useEffect, useRef, useState } from "react";
import UserItem from "./UserItem";

const UsersList = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([
    { id: 1, name: "Create JS object", redirect: "complete" },
    { id: 2, name: "Create project with React", redirect: "complete" },
  ]);
  const [completed, setCompleted] = useState([
    { id: 1, name: "Create Modal" },
    { id: 2, name: "Add products to the page" },
  ]);

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onChange = (event) => {
    const value = event.target.value;

    setInputValue(value);

    console.log(inputValue);
  };

  const addTask = (event) => {
    event.preventDefault();

    const todo = {
      id: todos.length + 1,
      name: inputValue,
      redirect: "complete",
    };

    setTodos((prevState) => [...prevState, todo]);
    setInputValue("");
  };

  // const removeUser = (id) => {
  //   const taskData = todos.filter((task) => task.id !== id);
  //   setTodos(taskData);
  // };

  const removeCompletedTask = useCallback((id) => {
    setCompleted((prevState) => prevState.filter((task) => task.id !== id), []);
  });

  // const moveToToDo = useCallback((id) => {
  //   setCompleted((prevState) => prevState.filter((task) => task.id !== id));
  //   setTodos((prevState) => [
  //     ...todos,
  //     { ...prevState.find((task) => task.id === id), redirect: "complete" },
  //   ]);
  // });

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

  const redirectUser = useCallback((id) => {
    setTodos((prevState) => prevState.filter((user) => user.id !== id));
    setCompleted((prevCompleted) => [
      ...completed,
      prevCompleted.find((user) => user.id === id),
    ]);
  });

  return (
    <div className="users">
      <form className="user-form" onSubmit={addTask}>
        <input
          ref={inputRef}
          type="text"
          onChange={onChange}
          value={inputValue}
          placeholder="...Add Item"
        />
        <button type="submit">Add Task</button>
      </form>
      <div className="todos">
        <div>
          <h1>To Do Tasks</h1>
          {todos.map((todo) => (
            <UserItem
              key={`todo-${todo.id}`}
              id={todo.id}
              name={todo.name}
              action={redirectUser}
              redirect={todo.redirect}
            />
          ))}
        </div>
        <div className="completed">
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
