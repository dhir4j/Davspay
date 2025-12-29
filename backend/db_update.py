"""
Database Update Script for 2FA Implementation
Adds necessary fields for Two-Factor Authentication
"""
import psycopg2
from psycopg2.extras import RealDictCursor
from config import Config
import sys

# Database configuration
DB_CONFIG = {
    'host': Config.DB_HOST,
    'database': Config.DB_NAME,
    'user': Config.DB_USER,
    'password': Config.DB_PASSWORD,
    'port': Config.DB_PORT
}

def get_db_connection():
    """Create and return a database connection"""
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        return conn
    except Exception as e:
        print(f"❌ Database connection error: {e}")
        return None

def update_users_table_for_2fa():
    """Add 2FA-related columns to users table"""
    conn = get_db_connection()
    if conn is None:
        sys.exit(1)

    try:
        cursor = conn.cursor()

        print("🔄 Starting database update for 2FA...")

        # Check if columns already exist
        cursor.execute("""
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name = 'users'
            AND column_name IN ('two_factor_enabled', 'phone_verified', 'remember_token', 'remember_token_expires')
        """)
        existing_columns = [row[0] for row in cursor.fetchall()]

        # Add two_factor_enabled column
        if 'two_factor_enabled' not in existing_columns:
            print("  ➕ Adding two_factor_enabled column...")
            cursor.execute("""
                ALTER TABLE users
                ADD COLUMN two_factor_enabled BOOLEAN DEFAULT FALSE
            """)
            print("  ✅ Added two_factor_enabled column")
        else:
            print("  ⏭️  two_factor_enabled column already exists")

        # Add phone_verified column
        if 'phone_verified' not in existing_columns:
            print("  ➕ Adding phone_verified column...")
            cursor.execute("""
                ALTER TABLE users
                ADD COLUMN phone_verified BOOLEAN DEFAULT FALSE
            """)
            print("  ✅ Added phone_verified column")
        else:
            print("  ⏭️  phone_verified column already exists")

        # Add remember_token column for "Remember Me" functionality
        if 'remember_token' not in existing_columns:
            print("  ➕ Adding remember_token column...")
            cursor.execute("""
                ALTER TABLE users
                ADD COLUMN remember_token VARCHAR(255)
            """)
            print("  ✅ Added remember_token column")
        else:
            print("  ⏭️  remember_token column already exists")

        # Add remember_token_expires column
        if 'remember_token_expires' not in existing_columns:
            print("  ➕ Adding remember_token_expires column...")
            cursor.execute("""
                ALTER TABLE users
                ADD COLUMN remember_token_expires TIMESTAMP
            """)
            print("  ✅ Added remember_token_expires column")
        else:
            print("  ⏭️  remember_token_expires column already exists")

        # Create index on remember_token for faster lookups
        cursor.execute("""
            SELECT indexname
            FROM pg_indexes
            WHERE tablename = 'users'
            AND indexname = 'idx_users_remember_token'
        """)
        if not cursor.fetchone():
            print("  ➕ Creating index on remember_token...")
            cursor.execute("""
                CREATE INDEX idx_users_remember_token ON users(remember_token)
            """)
            print("  ✅ Created index on remember_token")
        else:
            print("  ⏭️  Index idx_users_remember_token already exists")

        # Ensure phone column exists and is not null for 2FA users
        cursor.execute("""
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name = 'users'
            AND column_name = 'phone'
        """)
        if cursor.fetchone():
            print("  ✅ Phone column exists")
        else:
            print("  ⚠️  Warning: Phone column does not exist. It should have been created during initial setup.")

        conn.commit()
        print("\n✅ Database update completed successfully!")
        print("\n📋 Summary:")
        print("  - two_factor_enabled: Boolean field to enable/disable 2FA per user")
        print("  - phone_verified: Boolean field to track phone verification status")
        print("  - remember_token: Stores token for 'Remember Me' functionality")
        print("  - remember_token_expires: Expiration timestamp for remember token")
        print("\n💡 Next steps:")
        print("  1. Make sure TWO_FACTOR_API_KEY is set in your .env file")
        print("  2. Users need to have a verified phone number to use 2FA")
        print("  3. Enable 2FA for users through the dashboard settings")

        cursor.close()
        conn.close()

    except Exception as e:
        print(f"\n❌ Error updating database: {e}")
        if conn:
            conn.rollback()
            conn.close()
        sys.exit(1)

def verify_update():
    """Verify that all columns were added successfully"""
    conn = get_db_connection()
    if conn is None:
        sys.exit(1)

    try:
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute("""
            SELECT column_name, data_type, column_default
            FROM information_schema.columns
            WHERE table_name = 'users'
            AND column_name IN ('two_factor_enabled', 'phone_verified', 'remember_token', 'remember_token_expires')
            ORDER BY column_name
        """)
        columns = cursor.fetchall()

        if columns:
            print("\n🔍 Verification - Added columns:")
            for col in columns:
                print(f"  - {col['column_name']}: {col['data_type']} (default: {col['column_default']})")

        cursor.close()
        conn.close()

    except Exception as e:
        print(f"\n⚠️  Verification error: {e}")
        if conn:
            conn.close()

if __name__ == '__main__':
    print("=" * 60)
    print("  2FA Database Update Script")
    print("=" * 60)
    print()

    update_users_table_for_2fa()
    verify_update()

    print("\n" + "=" * 60)
