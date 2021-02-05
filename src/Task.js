import React, {useState} from "react"
import PropTypes from "prop-types";

function Task({id, name, state, onClick, onDelete, onNewName}) {
  const [newName, setNewName] = useState("")

  return (
    <div className="Task">
      <h2>{name}</h2>
      <p>{state}</p>
      <button onClick={() => onClick(id)}>Next state</button>
      <button onClick={() => onDelete(id)}>Delete</button>
      <input value={newName} onChange={event => setNewName(event.target.value)}/>
      <button onClick={() => {
        onNewName(id, newName);
        setNewName("")
      }}>Change name</button>
    </div>
  )
}

export default Task

Task.propTypes = {
  name: PropTypes.string,
  state: PropTypes.oneOf('new', 'todo', 'done'),
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  onNewName: PropTypes.func
}