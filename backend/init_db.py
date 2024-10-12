import psycopg2
import os

# Connect to the PostgreSQL database using the DATABASE_URL environment variable
conn = psycopg2.connect(os.getenv("DATABASE_URL"))
cursor = conn.cursor()

#check if groups table exists
cursor.execute("""
SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'groups'
)
""")
exists = cursor.fetchone()[0]

if not exists:



    # Create the groups table if it doesn't exist
    cursor.execute("""
    CREATE TABLE groups (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL
    )
    """)

    # Insert initial groups data
    groups = [
        (0, "test 1"),
        (1, "test 2"),
    ]

    cursor.executemany("INSERT INTO groups (id, title) VALUES (%s, %s) ON CONFLICT DO NOTHING", groups)

    cursor.execute("""
    CREATE TABLE names (
        id SERIAL PRIMARY KEY,
        title  VARCHAR(255) NOT NULL UNIQUE
    )
    """)

    cursor.execute("""
    CREATE TABLE names_groups (
        name_id INT REFERENCES names(id) On DELETE CASCADE On UPDATE CASCADE,
        group_id INT REFERENCES groups(id) On DELETE CASCADE On UPDATE CASCADE,
        PRIMARY KEY (name_id, group_id)
    )
    """)

    cursor.executemany("INSERT INTO names (id, title) VALUES (%s, %s) ON CONFLICT DO NOTHING", [
        (0, "ryo"),
        (1, "jonas"),
    ])

    cursor.executemany("INSERT INTO names_groups (name_id, group_id) VALUES (%s, %s) ON CONFLICT DO NOTHING", [
        (0, 0),
        (1, 1),
        (0, 1),
    ])


    cursor.execute("""
    CREATE TABLE locations (
        gid INT REFERENCES groups(id) ON DELETE CASCADE ON UPDATE CASCADE, 
        location_x DOUBLE PRECISION NOT NULL,
        location_y DOUBLE PRECISION NOT NULL,
        joinable BOOLEAN DEFAULT FALSE,
        mensa_id VARCHAR(255) NOT NULL,
        PRIMARY KEY (gid) 
    )
    """)

    cursor.executemany("INSERT INTO locations (gid, location_x, location_y, mensa_id) VALUES (%s, %s, %s, %s) ON CONFLICT DO NOTHING", [
        (0, 1.0, 1.0,"POLY"),
    ])



conn.commit()

cursor.close()
conn.close()