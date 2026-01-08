"""
Database Update Script for Verification System
Adds verification_status and verification_submitted_at columns to users table

Usage:
    python add_verification.py
"""
import psycopg2
from psycopg2.extras import RealDictCursor
from config import config
import sys
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

def get_db_connection(env="production"):
    """Create and return a database connection"""
    try:
        db_config = get_db_config(env)
        conn = psycopg2.connect(**db_config)
        return conn
    except Exception as e:
        print(f"❌ Database connection error: {e}")
        return None

def add_verification_columns(env="production"):
    """Add verification columns to users table"""
    conn = get_db_connection(env)
    if conn is None:
        sys.exit(1)

    try:
        cursor = conn.cursor()

        print("🔄 Starting database update for Verification System...")

        # Check if columns already exist
        cursor.execute("""
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name = 'users'
            AND column_name IN ('verification_status', 'verification_submitted_at')
        """)
        existing_columns = [row[0] for row in cursor.fetchall()]

        # Add verification_status column
        if 'verification_status' not in existing_columns:
            print("  ➕ Adding verification_status column...")
            cursor.execute("""
                ALTER TABLE users
                ADD COLUMN verification_status VARCHAR(20) DEFAULT 'not_submitted'
                CHECK (verification_status IN ('not_submitted', 'pending'))
            """)
            print("  ✅ Added verification_status column")
        else:
            print("  ⏭️  verification_status column already exists")

        # Add verification_submitted_at column
        if 'verification_submitted_at' not in existing_columns:
            print("  ➕ Adding verification_submitted_at column...")
            cursor.execute("""
                ALTER TABLE users
                ADD COLUMN verification_submitted_at TIMESTAMP
            """)
            print("  ✅ Added verification_submitted_at column")
        else:
            print("  ⏭️  verification_submitted_at column already exists")

        # Create index on verification_status for faster queries
        cursor.execute("""
            SELECT indexname
            FROM pg_indexes
            WHERE tablename = 'users'
            AND indexname = 'idx_users_verification_status'
        """)
        if not cursor.fetchone():
            print("  ➕ Creating index on verification_status...")
            cursor.execute("""
                CREATE INDEX idx_users_verification_status ON users(verification_status)
            """)
            print("  ✅ Created index on verification_status")
        else:
            print("  ⏭️  Index idx_users_verification_status already exists")

        # Update existing users to have 'not_submitted' status
        cursor.execute("""
            UPDATE users
            SET verification_status = 'not_submitted'
            WHERE verification_status IS NULL
        """)
        updated_count = cursor.rowcount
        if updated_count > 0:
            print(f"  ✅ Updated {updated_count} existing users to 'not_submitted' status")

        conn.commit()
        print("\n✅ Database update completed successfully!")
        print("\n📋 Summary:")
        print("  - verification_status: VARCHAR(20) - 'not_submitted' or 'pending'")
        print("  - verification_submitted_at: TIMESTAMP - when user clicked submit")
        print("\n💡 How it works:")
        print("  1. New users start with 'not_submitted' status")
        print("  2. User clicks submit button → status changes to 'pending'")
        print("  3. User stays 'pending' FOREVER (no approval needed)")
        print("  4. Protected dashboard features check this status")
        print("\n🚀 Next steps:")
        print("  1. Restart your backend server")
        print("  2. Test the verification flow on the frontend")
        print("  3. User will be blocked from features until they submit")

        cursor.close()
        conn.close()

    except Exception as e:
        print(f"\n❌ Error updating database: {e}")
        if conn:
            conn.rollback()
            conn.close()
        sys.exit(1)

def verify_update(env="production"):
    """Verify that all columns were added successfully"""
    conn = get_db_connection(env)
    if conn is None:
        sys.exit(1)

    try:
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute("""
            SELECT column_name, data_type, column_default
            FROM information_schema.columns
            WHERE table_name = 'users'
            AND column_name IN ('verification_status', 'verification_submitted_at')
            ORDER BY column_name
        """)
        columns = cursor.fetchall()

        if columns:
            print("\n🔍 Verification - Added columns:")
            for col in columns:
                print(f"  - {col['column_name']}: {col['data_type']} (default: {col['column_default']})")

        # Show count of users by verification status
        cursor.execute("""
            SELECT verification_status, COUNT(*) as count
            FROM users
            GROUP BY verification_status
            ORDER BY verification_status
        """)
        status_counts = cursor.fetchall()

        if status_counts:
            print("\n📊 User verification status counts:")
            for status in status_counts:
                print(f"  - {status['verification_status']}: {status['count']} users")

        cursor.close()
        conn.close()

    except Exception as e:
        print(f"\n⚠️  Verification error: {e}")
        if conn:
            conn.close()

if __name__ == '__main__':
    import sys

    print("=" * 60)
    print("  Verification System Database Update")
    print("=" * 60)
    print()

    # Determine environment
    env = "production"
    if len(sys.argv) > 1:
        env = sys.argv[1]

    print(f"Environment: {env}\n")

    add_verification_columns(env)
    verify_update(env)

    print("\n" + "=" * 60)
