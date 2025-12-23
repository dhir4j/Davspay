"""
Database Initialization Script for Davspay Backend

This script creates all necessary database tables.
Run this AFTER deploying to PythonAnywhere or setting up locally.

Usage:
    python init_db.py
"""
import psycopg2
from psycopg2.extras import RealDictCursor
from config import config
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def get_db_config(env="production"):
    """Get database configuration"""
    cfg = config[env]
    return {
        'host': cfg.DB_HOST if hasattr(cfg, 'DB_HOST') else os.getenv('DB_HOST'),
        'database': cfg.DB_NAME if hasattr(cfg, 'DB_NAME') else os.getenv('DB_NAME'),
        'user': cfg.DB_USER if hasattr(cfg, 'DB_USER') else os.getenv('DB_USER'),
        'password': cfg.DB_PASSWORD if hasattr(cfg, 'DB_PASSWORD') else os.getenv('DB_PASSWORD'),
        'port': cfg.DB_PORT if hasattr(cfg, 'DB_PORT') else os.getenv('DB_PORT')
    }

def init_database(env="production"):
    """Initialize database tables"""
    print("\n" + "="*60)
    print("  Davspay Database Initialization")
    print("="*60)

    db_config = get_db_config(env)

    print(f"\n[*] Connecting to database...")
    print(f"   Host: {db_config['host']}")
    print(f"   Database: {db_config['database']}")
    print(f"   User: {db_config['user']}")

    try:
        # Connect to database
        conn = psycopg2.connect(**db_config)
        cursor = conn.cursor()

        print("\n[+] Connected successfully!")
        print("\n[*] Creating tables...\n")

        # Create users table
        print("   [*] Creating 'users' table...")
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                full_name VARCHAR(255) NOT NULL,
                company_name VARCHAR(255),
                phone VARCHAR(20),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                is_active BOOLEAN DEFAULT TRUE,
                is_verified BOOLEAN DEFAULT FALSE
            )
        """)

        # Create index on email for faster lookups
        print("   [*] Creating email index...")
        cursor.execute("""
            CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)
        """)

        # Create index on is_active for faster queries
        print("   [*] Creating is_active index...")
        cursor.execute("""
            CREATE INDEX IF NOT EXISTS idx_users_active ON users(is_active)
        """)

        # Create function to update updated_at timestamp
        print("   [*] Creating timestamp trigger function...")
        cursor.execute("""
            CREATE OR REPLACE FUNCTION update_updated_at_column()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = CURRENT_TIMESTAMP;
                RETURN NEW;
            END;
            $$ language 'plpgsql';
        """)

        # Create trigger to auto-update updated_at
        print("   [*] Creating auto-update trigger...")
        cursor.execute("""
            DROP TRIGGER IF EXISTS update_users_updated_at ON users;
            CREATE TRIGGER update_users_updated_at
                BEFORE UPDATE ON users
                FOR EACH ROW
                EXECUTE FUNCTION update_updated_at_column();
        """)

        # Commit changes
        conn.commit()

        print("\n[+] All tables created successfully!")

        # Verify tables
        print("\n[*] Verifying database schema...")
        cursor.execute("""
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'public'
            ORDER BY table_name
        """)
        tables = cursor.fetchall()

        print("\n   Tables found:")
        for table in tables:
            print(f"       - {table[0]}")

        # Show users table structure
        print("\n[*] 'users' table structure:")
        cursor.execute("""
            SELECT column_name, data_type, character_maximum_length, is_nullable, column_default
            FROM information_schema.columns
            WHERE table_name = 'users'
            ORDER BY ordinal_position
        """)
        columns = cursor.fetchall()

        print("\n   Column Name          | Type              | Nullable | Default")
        print("   " + "-"*70)
        for col in columns:
            col_name = col[0].ljust(20)
            col_type = (col[1] if col[2] is None else f"{col[1]}({col[2]})").ljust(18)
            nullable = col[3].ljust(8)
            default = str(col[4] if col[4] else "")[:20]
            print(f"   {col_name} | {col_type} | {nullable} | {default}")

        cursor.close()
        conn.close()

        print("\n" + "="*60)
        print("[+] Database initialization completed successfully!")
        print("="*60)
        print("\n[+] You can now start using the Davspay API!\n")

        return True

    except Exception as e:
        print(f"\n[!] Error: {e}")
        print("\n[*] Troubleshooting:")
        print("   1. Check your .env file has correct database credentials")
        print("   2. Verify your PostgreSQL database is running")
        print("   3. Ensure you have network access to the database")
        print("   4. Check database user has CREATE TABLE permissions\n")
        return False

def check_connection(env="production"):
    """Test database connection"""
    print("\n[*] Testing database connection...")

    db_config = get_db_config(env)

    try:
        conn = psycopg2.connect(**db_config)
        cursor = conn.cursor()
        cursor.execute("SELECT version()")
        version = cursor.fetchone()
        print(f"[+] Connection successful!")
        print(f"   PostgreSQL version: {version[0][:50]}...")
        cursor.close()
        conn.close()
        return True
    except Exception as e:
        print(f"[!] Connection failed: {e}")
        return False

if __name__ == "__main__":
    import sys

    # Determine environment
    env = "production"
    if len(sys.argv) > 1:
        env = sys.argv[1]

    print(f"\nEnvironment: {env}")

    # Test connection first
    if check_connection(env):
        # Initialize database
        init_database(env)
    else:
        print("\n[!] Cannot initialize database - connection failed\n")
        sys.exit(1)
