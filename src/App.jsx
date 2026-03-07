import { useState, useRef } from 'react'
// import Map from './Map'
import './App.css'
// import { APIProvider, Map, MapCameraChangedEvent } from '@vis.gl/react-google-maps';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

function App() {
  // const [count, setCount] = useState(0)
  const [userReply, setUserReply] = useState(null)
  //this needs to be an array:
  const [activities, setActivities] = useState([])
  const [activityLocations, setActivityLocations] = useState([])
  const [activityCoords, setActivityCoords] = useState([])

  const userNameInput = useRef()
  const userLocationInput = useRef()

  
  
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
      const userLocation = userLocationInput.current.value;

      //store it gettattably??????
      const jsonData = {
        text: userName,
        location: userLocation,
        activities: activities
      };

      console.log(jsonData);
      
      try {
        const response = await fetch("http://127.0.0.1:8000/send", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ text: userName, location: userLocation, activities })
      });

      if (!response.ok) {
        throw new Error("Failed to fetch from FastAPI");
      }

      const data = await response.json();
      setUserReply(data.reply || "No reply from server");
      setActivityLocations(data.activity_locations || []);
      setActivityCoords(data.activity_coords || []);

      } catch (error) {
        setUserReply(`Error ${error.message}`);
      }
      console.log(activityCoords)
     
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

          <label htmlFor="location">Enter your town or city: </label>
          <input ref={ userLocationInput } id="location" type="text" name="location" minLength="4" maxLength="20" className="location-input" required />
          

          {/* <label htmlFor="activity1">Choose an activity:</label>
          <input ref={ activity1Input } id="activity1"type="text" name="activity1" minLength="4" maxLength="20" className="activity-input" required /> */}

          {/* <MakeActivityInput /> */}

          <h2>Activities</h2>

          {activities.map((activity, index) => (
            <div key={ index }>
              <label htmlFor="activity-input">Activity { index + 1 }</label>
              <input id="activity-input" type="text" value={ activity } onChange={(e) => handleActivityChange(index, e.target.value)}></input>
            </div>
          ))}


          <button type="button" onClick={ addActivity }>Add activity</button>

          <p>When you have finished choosing, press Submit</p>

          <button type="submit">Submit</button>

          {/* {activities.length > 0 && <p> You have chosen { activities }</p>} */}

          {/* this actually gets it */}
          <p id="response" className="username">{ userReply }</p>

        </form>

        <div className='itinerary'>
          <h2>Your sustainable itinerary:</h2>
          <p>We have found the most efficient route taking in the nearest locations that meet your requirements: </p>
          <ul>
            { activityLocations.map((location, index) => (
              <li key={ index }>{ index + 1 }. { location }</li>
            ))
            }
          </ul>

          <div className="map">
            <LoadScript googleMapsApiKey=''>
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '400px' }}
                center={{ lat: 53.2, lng: -3.8 }} // example
                zoom={10}
              >
                { activityCoords.map((coordpair, index) => 
                    <Marker 
                      key={ index } 
                      position={ { lat: coordpair.lat, lng: coordpair.lng } }
                      // title={ index + 1 }
                    />
                )}
                {/* <Marker position={center} /> */}
              </GoogleMap>

            </LoadScript>

          </div>

          {/* <APIProvider apiKey={'AIzaSyAn7mQS3tRfditAyRrsrKtya2wgAlSLfrs'} onLoad={() => console.log('Maps API has loaded.')}>
            <Map>
              defaultZoom={13}
              defaultCenter={ { lat: -33.860664, lng: 151.208138 } }
              onCameraChanged={ (ev: MapCameraChangedEvent) =>
              console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
              }
            </Map>
          </APIProvider> */}

        </div>
        {/* <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
      
        </div> */}
      </>
    )
}

export default App
``