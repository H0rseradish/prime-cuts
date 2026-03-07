from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
 
app = FastAPI()
 
# allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserActivities(BaseModel):
    text: str
    location: str
    activities: list[str]
    coords: dict


# class Message(BaseModel):
#     text: str
 
@app.get("/")
def read_root():
    return {"message": "FastAPI is running"}
 
# @app.post("/send")
# def receive_message(msg: Message):
#     messages = msg.text.split(" ")
#     text = ""
#     for message in messages:
#         text += message + ","
 
#     return {"reply": f"Hi {text}"}



@app.post("/send")
def receive_user_activities(data: UserActivities):
    
    print(data.text)
    print(data.activities)

    data_dict = data.dict()

    with open("activities.json", "a") as f:
        json.dump(data_dict, f)
        f.write("\n")

    activity_locations = [
        "Menai Straits",
        "Zip World",
        "Welsh Mountain Zoo"
    ]

    activity_coords = [
        {"lat": 53.2274, "lng": -4.1292},
        {"lat": 53.2300, "lng": -4.1200},
        {"lat": 53.2200, "lng": -4.1400}
    ]


    return {
        "reply": f"{data.text}, your location is {data.location}, and you submitted these activities: {', '.join(data.activities)}",
        "activity_locations": activity_locations,
        "activity_coords": activity_coords
    }
 
# activity_locations: ["menai straits", "zip world", "north wales zoo"]