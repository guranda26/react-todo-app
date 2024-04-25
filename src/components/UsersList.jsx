import React, { Component } from "react";
import UserItem from "./UserItem";

class UsersList extends Component {
  state = {
    inputValue: "",
    users: [],
    completed: [],
  };

  componentDidMount() {
    const savedUsers = localStorage.getItem("users");
    const savedCompleted = localStorage.getItem("completed");
    this.setState({
      users: savedUsers
        ? JSON.parse(savedUsers)
        : [
            { id: 1, name: "Create JS object", redirect: "complete" },
            { id: 2, name: "Create project with React", redirect: "complete" },
          ],
      completed: savedCompleted
        ? JSON.parse(savedCompleted)
        : [
            { id: 1, name: "Create Modal" },
            { id: 2, name: "Add products to the page" },
          ],
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.users !== this.state.users) {
      localStorage.setItem("users", JSON.stringify(this.state.users));
    }
    if (prevState.completed !== this.state.completed) {
      localStorage.setItem("completed", JSON.stringify(this.state.completed));
    }
  }

  onChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  addUser = (event) => {
    event.preventDefault();
    if (this.state.inputValue.trim()) {
      const newUser = {
        id: this.state.users.length + 1,
        name: this.state.inputValue,
        redirect: "complete",
      };
      this.setState((prevState) => ({
        users: [...prevState.users, newUser],
        inputValue: "",
      }));
    }
  };

  removeUser = (id) => {
    this.setState((prevState) => ({
      users: prevState.users.filter((user) => user.id !== id),
    }));
  };

  removeCompletedTask = (id) => {
    this.setState((prevState) => ({
      completed: prevState.completed.filter((task) => task.id !== id),
    }));
  };

  moveToToDo = (id) => {
    const task = this.state.completed.find((task) => task.id === id);
    this.setState((prevState) => ({
      completed: prevState.completed.filter((task) => task.id !== id),
      users: [...prevState.users, { ...task, redirect: "complete" }],
    }));
  };

  redirectUser = (id) => {
    const user = this.state.users.find((user) => user.id === id);
    this.setState((prevState) => ({
      users: prevState.users.filter((user) => user.id !== id),
      completed: [...prevState.completed, user],
    }));
  };

  render() {
    return (
      <div className="users">
        <form className="user-form" onSubmit={this.addUser}>
          <input
            type="text"
            onChange={this.onChange}
            value={this.state.inputValue}
            placeholder="...Add Item"
          />
          <button type="submit">Add Task</button>
        </form>
        <div className="todos">
          <section>
            <h1>To Do Tasks</h1>
            {this.state.users.map((user) => (
              <UserItem
                key={user.id}
                id={user.id}
                name={user.name}
                action={this.redirectUser}
                redirect={user.redirect}
              />
            ))}
          </section>
          <section>
            <h1>Completed Tasks</h1>
            {this.state.completed.map((task) => (
              <UserItem
                key={task.id}
                id={task.id}
                name={task.name}
                action={this.redirectUser}
                redirect={task.redirect}
                isCompleted={true}
                deleteAction={this.removeCompletedTask}
                moveToToDoAction={this.moveToToDo}
              />
            ))}
          </section>
        </div>
      </div>
    );
  }
}

export default UsersList;
