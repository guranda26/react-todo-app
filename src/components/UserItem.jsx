import React from "react";

const UserItem = ({
  id,
  name,
  action,
  redirect,
  isCompleted,
  deleteAction,
  moveToToDoAction,
}) => {
  return (
    <div className={`user-item ${isCompleted ? "completed-task" : ""}`}>
      <p>N: {id}</p>
      <p>TASK: {name}</p>
      {isCompleted ? (
        <>
          <button onClick={() => deleteAction(id)}>Delete</button>
          <button onClick={() => moveToToDoAction(id)}>Move to ToDo</button>
        </>
      ) : (
        <button onClick={() => action(id)}>{redirect}</button>
      )}
    </div>
  );
};

export default UserItem;
