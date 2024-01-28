import React from "react";
import styles from "../App.module.css";

const UserItem = React.memo(
  ({
    id,
    name,
    moveToInProgress,
    inProgressComplete,
    completeTask,
    deleteAction,
    moveToToDoAction,
    isCompleted,
    isInProgress,
  }) => {
    return (
      <div
        className={`${styles.userItem} ${
          isCompleted ? isCompleted : isInProgress ? "in-progress-task" : ""
        }`}
      >
        <p>N: {id}</p>
        <p>TASK: {name}</p>
        {isCompleted ? (
          <>
            <button onClick={() => deleteAction(id)}>Delete</button>
            <button onClick={() => moveToToDoAction(id)}>Move to ToDo</button>
          </>
        ) : isInProgress ? (
          <>
            <button onClick={() => inProgressComplete(id)}>Complete</button>
          </>
        ) : (
          <>
            <button onClick={() => moveToInProgress(id)}>In Progress</button>
            <button onClick={() => completeTask(id)}>Complete</button>
          </>
        )}
      </div>
    );
  }
);

export default UserItem;
