from fastapi import FastAPI
app=FastAPI()
@app.get("/users")
def get_users():
  return [{
    "id":1,
    "username":"qiuqiu"
  },
  {
    "id":2,
    "username":"admin"
  }]