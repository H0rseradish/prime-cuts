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


    return {
        "reply": f"{data.text}, your location is {data.location}, and you submitted these activities: {', '.join(data.activities)}",
        "activity_locations": ["Menai Straits", "Zip World", "North Wales Zoo"]
    }
 
# activity_locations: ["menai straits", "zip world", "north wales zoo"]