from flask import Flask
from models import db
from config import DATABASE_URL
from routes import bp

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
app.register_blueprint(bp, url_prefix="/api")

@app.route("/")
def index():
    return "Employee Directory API is running"
