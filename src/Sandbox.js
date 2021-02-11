import React, {useState, useEffect} from "react"
import './App.css'

export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const setFromEvent = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", setFromEvent);

    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, []);

  return position;
};

export function useScroll() {
  const [position, setPosition] = useState({x: 0, y: 0})

  useEffect(() => {
    function setFromEvent() { setPosition({x: window.scrollX, y: window.scrollY}) }
    window.addEventListener('scroll', setFromEvent)
    return () => window.removeEventListener('scroll', setFromEvent);
  }, [position])

  return position
}


function Sandbox({name = "lorem"}) {
  const [username, setUsername] = useState("")
  const position = useMousePosition()
  const scroll = useScroll()

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
      <p>{position.x} | {position.y}</p>
      <p>{scroll.x} | {scroll.y}</p>
      <div className="big"></div>
    </div>
  )
}

export default Sandbox;
