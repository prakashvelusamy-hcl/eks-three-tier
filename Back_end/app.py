from flask import Flask
from models import db
from config import SQLALCHEMY_DATABASE_URI
from routes import bp  # make sure routes.py exists with a Blueprint named `bp`

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
app.register_blueprint(bp, url_prefix="/api")

@app.route("/")
def index():
    return "Employee Directory API is running"

if __name__ == "__main__":
    # ✅ Create tables before starting the app (only runs once if tables don't exist)
    with app.app_context():
        db.create_all()

    # ✅ Start the Flask app
    app.run(host="0.0.0.0", port=5000)
