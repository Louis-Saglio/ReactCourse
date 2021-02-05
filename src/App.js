import React, {useState} from "react"
import Task from "./Task";

function App() {
  const [tasks, setTasks] = useState([])
  const [newTaskName, setNewTaskName] = useState("")

  function createTask(name) {
    return {name, id: Math.random().toString(), state: "new"}
  }

  function addTask(newTaskName) {
    if (newTaskName) {
      setTasks(prev => [...prev, createTask(newTaskName)])
      setNewTaskName("")
    }
  }

  function advanceTask(id) {
    setTasks(prev => {
      return prev.map(it => {
        if (it.id === id)
          return {...it, state: {'new': 'todo', 'todo': 'done', 'done': 'done'}[it.state]}
        return it
      })
    })
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(it => it.id !== id))
  }

  function updateName(id, newName) {
    if (newName) {
      setTasks(prev => {
        return prev.map(it => {
          if (it.id === id) {
            return {...it, name: newName}
          }
          return it
        })
      })
    }
  }

  return (
    <div className="App">
      <input id="input" value={newTaskName} onChange={event => setNewTaskName(event.target.value)}/>
      <button onClick={() => addTask(newTaskName)} >Add task</button>
      <div className="tasks">
        {tasks.map(({name, id, state}) => <Task
          key={id}
          id={id}
          name={name}
          state={state}
          onClick={advanceTask}
          onDelete={deleteTask}
          onNewName={updateName}
        />)}
      </div>
    </div>
  )
}

export default App;
