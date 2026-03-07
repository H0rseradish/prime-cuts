import { useState, useRef } from 'react'

import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  const [userReply, setUserReply] = useState(null)
  //this needs to be an array:
  const [activities, setActivities] = useState([])

  const userNameInput = useRef()
  const activity1Input = useRef()
  
// <input id="messageInput" placeholder="Type message">
//* <button onclick="sendMessage()">Send</button>
 
//<p id="response"></p>

  // function MakeActivityInput() {
  //   return <>
  //     <label htmlFor="activity1">Choose an activity:</label>
  //     <input ref={ activity1Input } id="activity1"type="text" name="activity1" minLength="4" maxLength="20" className="activity-input" required />

  //   </>
  // }
  //with the help of chatgpt...

   const handleActivityChange = (index, value) => {
    const newActivities = [...activities];
    newActivities[index] = value;
    setActivities(newActivities);
  };

  const addActivity = () => setActivities([...activities, ""])
 

  async function userNameSubmit(e) {
      e.preventDefault()
  
      const userName = userNameInput.current.value;

      //store it gettattably??????
      const jsonData = {
        text: userName,
        activities: activities
      };

      console.log(jsonData);
      
      try {
        const response = await fetch("http://127.0.0.1:8000/send", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ text: userName, activities })
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

  // async function handleActivitySubmit(e) {
  //     e.preventDefault()
  
  //     // const userName = userNameInput.current.value;
      
  //     try {
  //       const response = await fetch("http://127.0.0.1:8000/send", {
  //         method: "POST",
  //         headers: {
  //             "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify({ activities })
  //     });


  //     if (!response.ok) {
  //       throw new Error("Failed to fetch from FastAPI");
  //     }

  //     const data = await response.json();
  //     setUserReply(data.reply || "No reply from server");
  //     } catch (error) {
  //       setUserReply(`Error ${error.message}`);
  //     }
  // }



    return (
      <>
        <h1>Sustainable holidays with Prime Cuts</h1>

        <form onSubmit={ userNameSubmit }>

          <label htmlFor="uname">Enter your username: </label>
          <input ref={ userNameInput } id="uname" type="text" name="name" minLength="4" maxLength="20" className="username-input" required />
          

          {/* <label htmlFor="activity1">Choose an activity:</label>
          <input ref={ activity1Input } id="activity1"type="text" name="activity1" minLength="4" maxLength="20" className="activity-input" required /> */}

          {/* <MakeActivityInput /> */}

          <h2>Activities</h2>

          {activities.map((activity, index) => (
            <div>
              <label htmlFor="activity-input">Activity { index + 1 }</label>
              <input id="activity-input"type="text" value={ activity } onChange={(e) => handleActivityChange(index, e.target.value)}></input>
            </div>

          ))}


          <button type="button" onClick={ addActivity }>Add another activity</button>

          <p>When you have finished choosing, press Submit</p>

          <button type="submit">Submit</button>

          <p id="response" className="username">{ userReply }</p>


          {activities.length > 0 && <p>You have chosen { activities }</p>}

        </form>


        {/* <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
      
        </div> */}
      </>
    )
}

export default App
