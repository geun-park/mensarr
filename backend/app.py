from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import os

app = Flask(__name__)
CORS(app)

# Connect to the PostgreSQL database using the DATABASE_URL environment variable
conn = psycopg2.connect(os.getenv("DATABASE_URL"))
cursor = conn.cursor()

@app.route("/api/groupAndMemberList/<int:id>", methods=["GET"])
def getGroup(id):
    if not conn or not cursor:
        return jsonify({"error": "Database connection not established"}), 500
    try:
        cursor.execute("""
            SELECT 
            g.id AS group_id,
            g.title AS group_title,
            n.id AS member_id,
            n.title AS member_name
            FROM 
            groups g
            JOIN 
            names_groups ng ON g.id = ng.group_id
            JOIN 
            names n ON ng.name_id = n.id
            WHERE 
            g.id IN (
                SELECT group_id
                FROM names_groups
                WHERE name_id = %s
            )
            ORDER BY 
            g.id, n.title;
        """, (id,))
        groups = cursor.fetchall()
        # Create a dictionary to hold the groups and their members
        groups_dict = {}
        for group in groups:
            group_id = group[0]
            if group_id not in groups_dict:
                groups_dict[group_id] = {
                    "group_id": group_id,
                    "group_title": group[1],
                    "members": []
                }
            groups_dict[group_id]["members"].append({
                "member_id": group[2],
                "member_name": group[3]
            })
        # Convert groups_dict to a list
        groups_dict = [group for group_id, group in groups_dict.items()]
        return jsonify(groups_dict)
    except Exception as e:
        print(f"Error fetching group: {e}")
        conn.rollback()
        return jsonify({"error": "Error fetching group"}), 500

@app.route("/api/getMembersOfGroup/<int:id>", methods=["GET"])
def getMembers(id):
    if not conn or not cursor:
        return jsonify({"error": "Database connection not established"}), 500
    try:
        cursor.execute("""
            SELECT 
            n.id AS name_id,
            n.title AS name_title
            FROM 
            groups l
            JOIN 
            names_groups ng ON l.id = ng.group_id
            JOIN 
            names n ON ng.name_id = n.id
            WHERE 
            l.id = %s;
        """, (id,))
        members = cursor.fetchall()
        members = [{"name_id": member[0], "name_title": member[1]} for member in members]
        return jsonify(members)
    except Exception as e:
        print(f"Error fetching group: {e}")
        conn.rollback()
        return jsonify({"error": "Error fetching group"}), 500

@app.route("/api/getIdFromName/<string:s>", methods=["GET"])
def getId(s):
    if not conn or not cursor:
        return jsonify({"error": "Database connection not established"}), 500
    try:
        cursor.execute("""
            SELECT id 
            FROM names 
            WHERE title = %s;
        """, (s,))
        name_id = cursor.fetchone()[0]
        name = {"name_id": name_id}
        return jsonify(name)
    except Exception as e:
        print(f"Error fetching Id: {e}")
        conn.rollback()
        return jsonify({"error": "Error fetching Id"}), 500
    
@app.route("/api/createGroup/", methods=["POST"])
def createGroup():
    if not conn or not cursor:
        return jsonify({"error": "Database connection not established"}), 500
    try:
        content = request.get_json() 
        cursor.execute("""INSERT INTO groups (title) VALUES (%s) RETURNING id;""", (content["groupName"],))
        group_id = cursor.fetchone()[0]
        cursor.execute("""INSERT INTO names_groups (name_id, group_id) VALUES (%s, %s);""", (content["personalId"], group_id,))
        conn.commit()
        return jsonify({"group_id": group_id})
    except Exception as e:
        print(f"Error creating group: {e}")
        conn.rollback()
        return jsonify({"error": "Error creating group"}), 500

@app.route("/api/addToGroup/<int:id>/", methods=["POST"])
def joinGroup(id):
    if not conn or not cursor:
        return jsonify({"error": "Database connection not established"}), 500
    try:
        content = request.get_json() 
        cursor.execute("""INSERT INTO names_groups (name_id, group_id) VALUES (%s, %s);""", (content["personalId"], id,))
        conn.commit()
        return jsonify({"message": "Join group successful"})
    except Exception as e:
        print(f"Error joining group: {e}")
        conn.rollback()
        return jsonify({"error": "Error joining group"}), 500

@app.route("/api/getGroupTable/<string:mensaName>/<int:groupid>", methods=["GET"])
def getLocationGroup(groupid, mensaName):
    if not conn or not cursor:
        return jsonify({"error": "Database connection not established"}), 500
    try:
        cursor.execute("""SELECT mensa.id FROM mensa WHERE mensa.name = %s""", (mensaName,))
        mensaid = cursor.fetchone()
        if mensaid is None:
            return jsonify({"error": "Mensa not found"}), 404
        mensaid = mensaid[0]
        cursor.execute("""SELECT locations.location_x, locations.location_y, locations.time FROM locations where gid = %s AND mensa_id = %s""", (groupid, mensaid,))
        location = cursor.fetchone()
        if location is None:
            return jsonify([])
        locations = {"location_x": location[0], "location_y": location[1], "time": location[2]}
        return jsonify(locations)
    except Exception as e:
        print(f"Error fetching group: {e}")
        conn.rollback()
        return jsonify({"error": "Error fetching group"}), 500
    
@app.route("/api/getOpenTables/<string:mensaName>", methods=["GET"])
def getLocationAlone(mensaName):
    if not conn or not cursor:
        return jsonify({"error": "Database connection not established"}), 500
    try:
        cursor.execute("""SELECT mensa.id FROM mensa WHERE mensa.name = %s""", (mensaName,))
        mensaid = cursor.fetchone() 
        if mensaid is None:
            return jsonify({"error": "Mensa not found"}), 404
        mensaid = mensaid[0]
        cursor.execute("""SELECT locations.location_x, locations.location_y, locations.time FROM locations where locations.joinable = 1 AND locations.mensa_id = %s""", (mensaid,))
        locations = cursor.fetchall()
        locations = [{"location_x": location[0], "location_y": location[1], "time": location[2]} for location in locations]
        return jsonify(locations)
    except Exception as e:
        print(f"Error fetching group: {e}")
        conn.rollback()
        return jsonify({"error": "Error fetching group"}), 500

# do get getGroupTable first to check if location exists
@app.route("/api/setLocationGroup/<string:mensaName>/<int:groupid>", methods=["POST"])
def setLocationGroup(groupid, mensaName):
    if not conn or not cursor:
        return jsonify({"error": "Database connection not established"}), 500
    try:
        content = request.get_json()
        cursor.execute("""SELECT mensa.id FROM mensa WHERE mensa.name = %s""", (mensaName,))
        mensaid = cursor.fetchone()
        if mensaid is None:
            return jsonify({"error": "Mensa not found"}), 404
        mensaid = mensaid[0]
        content = request.get_json()
        cursor.execute("""INSERT INTO locations (gid, location_x, location_y, joinable, mensa_id) values (%s, %s, %s, %s, %s) """, (groupid, content["location_x"], content["location_y"], content["joinable"], mensaid,))
        conn.commit()
        return jsonify({"message": "Location set successful"})
    except Exception as e:
        print(f"Error setting location: {e}")
        conn.rollback()
        return jsonify({"error": "Error setting location"}), 500

@app.route("/api/setLocationAlone/<string:mensaName>", methods=["POST"])
def setLocationAlone(mensaName):
    if not conn or not cursor:
        return jsonify({"error": "Database connection not established"}), 500
    try:
        content = request.get_json()
        cursor.execute("""SELECT mensa.id FROM mensa WHERE mensa.name = %s""", (mensaName,))
        mensaid = cursor.fetchone()
        if mensaid is None:
            return jsonify({"error": "Mensa not found"}), 404
        mensaid = mensaid[0]
        content = request.get_json()
        cursor.execute("""INSERT INTO groups (title) VALUES (%s) RETURNING groups.id;""", (content["personalId"],))
        group_id = cursor.fetchone()[0]
        cursor.execute("""INSERT INTO names_groups (name_id, group_id) VALUES (%s, %s);""", (content["personalId"], group_id,))
        cursor.execute("""INSERT INTO locations (gid, location_x, location_y, joinable, mensa_id) values (%s, %s, %s, %s, %s) """, (group_id, content["location_x"], content["location_y"], 1, mensaid,))
        conn.commit()
        return jsonify({"group_id": group_id})
    except Exception as e:
        print(f"Error setting location: {e}")
        conn.rollback()
        return jsonify({"error": "Error setting location"}), 500
    
@app.route("/api/delLocationAlone/<int:gid>", methods=["DELETE"])
def delLocationAlone(gid):
    if not conn or not cursor:
        return jsonify({"error": "Database connection not established"}), 500
    try:
        cursor.execute("""DELETE FROM groups WHERE groups.id = %s""", (gid,))
        conn.commit()
        return jsonify({"message": "Location deleted successful"})
    except Exception as e:
        print(f"Error deleting location: {e}")
        conn.rollback()
        return jsonify({"error": "Error deleting location"}), 500

@app.route("/api/delLocationGroup/<int:gid>", methods=["DELETE"])
def delLocationGroup(gid):
    if not conn or not cursor:
        return jsonify({"error": "Database connection not established"}), 500
    try:
        cursor.execute("""DELETE FROM locations WHERE gid = %s""", (gid,))
        conn.commit()
        return jsonify({"message": "Location deleted successful"})
    except Exception as e:
        print(f"Error deleting location: {e}")
        conn.rollback()
        return jsonify({"error": "Error deleting location"}), 500

@app.route("/api/removeFromGroup/<int:gid>/<int:pid>", methods=["DELETE"])
def leaveGroup(gid, pid):
    if not conn or not cursor:
        return jsonify({"error": "Database connection not established"}), 500
    try:
        cursor.execute("""DELETE FROM names_groups WHERE name_id = %s AND group_id = %s""", (pid, gid,))
        conn.commit()
        return jsonify({"message": "Leave group successful"})
    except Exception as e:
        print(f"Error leaving group: {e}")
        conn.rollback()
        return jsonify({"error": "Error leaving group"}), 500

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')