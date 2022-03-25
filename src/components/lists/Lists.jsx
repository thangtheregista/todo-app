import React, { useState } from "react";
import "./Lists.scss";

function Lists(props) {
  // const { title, tasks } = props.list;
  const [individualList, setIndividualList] = useState(props.list);
  const [tasks, setTasks] = useState(individualList.tasks);
  console.log(tasks);
  const onDelete = (e) => {
    e.target.parentElement.remove();
  };
  const onDeleteList = (e) => {
    e.target.parentElement.remove();
  };
  const changeMessage = () => {
    setIndividualList({ ...individualList, title: "hello" });
  };
  return (
    <div className="list">
      <h3
        className="list-title"
        onClick={() => {
          changeMessage();
        }}
      >
        {individualList.title}
      </h3>
      <ul className="list-items">
        {individualList.tasks.map((task) => (
          <li key={task}>
            {task}
            <button className="x" onClick={onDelete}>
              X
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Add a card..."
        className="add-card-btn btn  "
      ></input>
      <button onClick={onDeleteList}>Delete list</button>
    </div>
  );
}

export default Lists;
