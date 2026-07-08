from flask import Flask, render_template
from letters import LETTERS

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html", letters=LETTERS)

if __name__ == "__main__":
    app.run(debug=True)