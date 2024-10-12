from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import os

app = Flask(__name__)
CORS(app)

# Connect to the PostgreSQL database using the DATABASE_URL environment variable
conn = psycopg2.connect(os.getenv("DATABASE_URL"))
cursor = conn.cursor()


@app.route("/api/todos", methods=["GET"])
def fetch_todos():
    cursor.execute("SELECT * FROM todos")
    todos = cursor.fetchall()
    return todos


@app.route("/api/todos", methods=["POST"])
def create_todo():
    content = request.json
    cursor.execute("INSERT INTO todos (title) VALUES (%s) RETURNING id", (content["title"],))
    new_id = cursor.fetchone()[0]
    conn.commit()
    return jsonify({"id": new_id, "title": content["title"]})


@app.route("/api/todos/<int:id>", methods=["DELETE"])
def delete_todo(id):
    cursor.execute("DELETE FROM todos WHERE id = %s", (id,))
    conn.commit()
    return "OK"

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')