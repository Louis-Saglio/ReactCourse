import React, {useState, useEffect} from "react"

function Sandbox({name = "lorem"}) {
  const [username, setUsername] = useState("")

  useEffect(
    () => {},
    [username]
  )

  function displayUserName(username) {
    let html
    if (username === "") {
       html = <p>Enter your name</p>
    } else {
      html = (
        <div>
          <p>Hello {username}</p>
          <button onClick={() => setUsername("")}>Reset</button>
        </div>
      )
    }
    return html
  }

  return (
    <div className="Sandbox">
      <input value={username} onChange={(event => setUsername(event.target.value))}/>
      {displayUserName(username)}
    </div>
  )
}

export default Sandbox;
