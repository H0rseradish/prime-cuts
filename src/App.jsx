import { useState, useRef } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [userReply, setUserReply] = useState(null)

  const userNameInput = useRef()
  
// <input id="messageInput" placeholder="Type message">
//* <button onclick="sendMessage()">Send</button>
 
//<p id="response"></p>
 

async function userNameSubmit(e) {
    e.preventDefault()
 
    const userName = userNameInput.current.value;
    
    try {
      const response = await fetch("http://127.0.0.1:8000/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: userName })
    });

    if (!response.ok) {
      throw new Error("Failed to fetch from FastAPI");
    }

    const data = await response.json();
    setUserReply(data.reply || "No reply from server");
    } catch (error) {
      setUserReply(`Error ${error.message}`);
    }
}


  return (
    <>
      <h1>Sustainable holidays with Prime Cuts</h1>
      <form onSubmit={ userNameSubmit }>
        <label htmlFor="uname">Choose a username: </label>
        <input ref={ userNameInput } id="uname"type="text" name="name" minLength="4" maxLength="20" className="user-name"/>
        <button type="submit">Submit</button>
        <p id="response">{ userReply }</p>
      </form>


      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
     
      </div>
    </>
  )
}

export default App
