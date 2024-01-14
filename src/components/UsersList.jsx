import { Component } from "react";
import UserItem from "./UserItem";

class UsersList extends Component {
  state = {
    inputValue: "",
    users: [
      { id: 1, name: "Create JS object", redirect: "complete" },
      { id: 2, name: "Create project with React", redirect: "complete" },
    ],
    completed: [
      { id: 1, name: "Create Modal" },
      { id: 2, name: "Add products to the page" },
    ],
  };

  onChange = (event) => {
    const value = event.target.value;
    this.setState({
      inputValue: value,
    });

    console.log(this.state.inputValue);
  };

  addUser = (event) => {
    event.preventDefault();

    const user = {
      id: this.state.users.length + 1,
      name: this.state.inputValue,
    };

    this.setState({
      users: [...this.state.users, user],
      inputValue: "",
    });
  };
  removeUser = (id) => {
    const users = this.state.users.filter((user) => user.id !== id);
    this.setState({
      users,
    });
  };

  removeCompletedTask = (id) => {
    const updatedCompleted = this.state.completed.filter(
      (task) => task.id !== id
    );

    this.setState({
      completed: updatedCompleted,
    });
  };

  moveToToDo = (id) => {
    const completedTask = this.state.completed.find((task) => task.id === id);
    const updatedCompleted = this.state.completed.filter(
      (task) => task.id !== id
    );

    this.setState((prevState) => ({
      completed: updatedCompleted,
      users: [...prevState.users, { ...completedTask, redirect: "complete" }],
    }));
  };
  redirectUser = (id) => {
    const updatedUsers = this.state.users.filter((user) => user.id !== id);
    const completedTask = this.state.users.find((user) => user.id === id);

    this.setState((prevState) => ({
      users: updatedUsers,
      completed: [...prevState.completed, completedTask],
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
          <div>
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
          </div>
          <div className="completed">
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
          </div>
        </div>
      </div>
    );
  }
}

export default UsersList;
