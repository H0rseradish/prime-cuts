from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
 
app = FastAPI()
 
# allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
 
class Message(BaseModel):
    text: str
 
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

class UserActivities(BaseModel):
    username: str
    activities: list[str]

@app.post("/send")
def receive_user_activities(data: UserActivities):
    return {"reply": f"{data.username} submitted: {', '.join(data.activities)}"}

 @app.post("/send")
def receive_message(msg: Message):
    print(msg)
    print(msg.activities)
 