from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import os

app = Flask(__name__)
CORS(app)

# Connect to the PostgreSQL database using the DATABASE_URL environment variable
try:
    conn = psycopg2.connect(os.getenv("DATABASE_URL"))
    cursor = conn.cursor()
except Exception as e:
    print(f"Error connecting to the database: {e}")

@app.route("/api/todos", methods=["GET"])
def fetch_todos():
    try:
        cursor.execute("SELECT * FROM todos")
        todos = cursor.fetchall()
        return todos
    except Exception as e:
        print(f"Error fetching todos: {e}")
        return jsonify({"error": "Error fetching todos"}), 500

@app.route("/api/todos", methods=["POST"])
def create_todo():
    try:
        content = request.json
        cursor.execute("INSERT INTO todos (title) VALUES (%s) RETURNING id", (content["title"],))
        new_id = cursor.fetchone()[0]
        conn.commit()
        return jsonify({"id": new_id, "title": content["title"]})
    except Exception as e:
        print(f"Error creating todo: {e}")
        return jsonify({"error": "Error creating todo"}), 500

@app.route("/api/todos/<int:id>", methods=["DELETE"])
def delete_todo(id):
    try:
        cursor.execute("DELETE FROM todos WHERE id = %s", (id,))
        conn.commit()
        return "OK"
    except Exception as e:
        print(f"Error deleting todo: {e}")
        return jsonify({"error": "Error deleting todo"}), 500

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')