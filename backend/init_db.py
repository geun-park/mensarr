import psycopg2
import os

# Connect to the PostgreSQL database using the DATABASE_URL environment variable
conn = psycopg2.connect(os.getenv("DATABASE_URL"))
cursor = conn.cursor()

# Check if the todos table exists
cursor.execute("""
SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_name = 'todos'
);
""")
table_exists = cursor.fetchone()[0]

if not table_exists:
    # Create the todos table if it doesn't exist
    cursor.execute("""
    CREATE TABLE todos (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL
    )
    """)

    # Insert initial todos data
    todos = [
        (1, "Find a great team"),
        (2, "Choose a project"),
        (3, "Interview people for need-finding"),
        (4, "Come up with a lo-fi prototype")
    ]

    cursor.executemany("INSERT INTO todos (id, title) VALUES (%s, %s) ON CONFLICT DO NOTHING", todos)

    conn.commit()

cursor.close()
conn.close()