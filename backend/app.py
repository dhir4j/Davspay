from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import timedelta
import os
from dotenv import load_dotenv
from services.twofactor import TwoFactorService

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key-change-in-production')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key-change-in-production')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

# Initialize extensions
CORS(app, origins=['http://localhost:3000', 'https://yourdomain.com'])
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Database configuration
DB_CONFIG = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'database': os.getenv('DB_NAME', 'davspay_db'),
    'user': os.getenv('DB_USER', 'postgres'),
    'password': os.getenv('DB_PASSWORD', 'password'),
    'port': os.getenv('DB_PORT', '5432')
}

def get_db_connection():
    """Create and return a database connection"""
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        return conn
    except Exception as e:
        print(f"Database connection error: {e}")
        return None

def init_db():
    """Initialize database tables"""
    conn = get_db_connection()
    if conn is None:
        return

    try:
        cursor = conn.cursor()

        # Create users table
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
        cursor.execute("""
            CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)
        """)

        conn.commit()
        cursor.close()
        conn.close()
        print("Database initialized successfully")
    except Exception as e:
        print(f"Database initialization error: {e}")
        if conn:
            conn.close()

# Initialize database on startup
init_db()

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'Davspay API is running'
    }), 200

@app.route('/api/auth/register', methods=['POST'])
def register():
    """Register a new user"""
    try:
        data = request.get_json()

        # Validate required fields
        required_fields = ['email', 'password', 'full_name']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'success': False,
                    'message': f'{field} is required'
                }), 400

        email = data.get('email').lower().strip()
        password = data.get('password')
        full_name = data.get('full_name').strip()
        company_name = data.get('company_name', '').strip()
        phone = data.get('phone', '').strip()

        # Validate email format
        if '@' not in email or '.' not in email:
            return jsonify({
                'success': False,
                'message': 'Invalid email format'
            }), 400

        # Validate password strength
        if len(password) < 8:
            return jsonify({
                'success': False,
                'message': 'Password must be at least 8 characters long'
            }), 400

        # Connect to database
        conn = get_db_connection()
        if conn is None:
            return jsonify({
                'success': False,
                'message': 'Database connection error'
            }), 500

        cursor = conn.cursor(cursor_factory=RealDictCursor)

        # Check if user already exists
        cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
        existing_user = cursor.fetchone()

        if existing_user:
            cursor.close()
            conn.close()
            return jsonify({
                'success': False,
                'message': 'Email already registered'
            }), 409

        # Hash password
        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

        # Insert new user
        cursor.execute("""
            INSERT INTO users (email, password_hash, full_name, company_name, phone)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id, email, full_name, company_name, phone, created_at
        """, (email, password_hash, full_name, company_name, phone))

        new_user = cursor.fetchone()
        conn.commit()
        cursor.close()
        conn.close()

        # Generate access token
        access_token = create_access_token(identity=new_user['id'])

        return jsonify({
            'success': True,
            'message': 'Registration successful',
            'data': {
                'user': {
                    'id': new_user['id'],
                    'email': new_user['email'],
                    'full_name': new_user['full_name'],
                    'company_name': new_user['company_name'],
                    'phone': new_user['phone'],
                    'created_at': new_user['created_at'].isoformat()
                },
                'access_token': access_token
            }
        }), 201

    except Exception as e:
        print(f"Registration error: {e}")
        return jsonify({
            'success': False,
            'message': 'An error occurred during registration'
        }), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    """Login user"""
    try:
        data = request.get_json()

        # Validate required fields
        if not data.get('email') or not data.get('password'):
            return jsonify({
                'success': False,
                'message': 'Email and password are required'
            }), 400

        email = data.get('email').lower().strip()
        password = data.get('password')

        # Connect to database
        conn = get_db_connection()
        if conn is None:
            return jsonify({
                'success': False,
                'message': 'Database connection error'
            }), 500

        cursor = conn.cursor(cursor_factory=RealDictCursor)

        # Get user by email
        cursor.execute("""
            SELECT id, email, password_hash, full_name, company_name, phone, is_active, is_verified
            FROM users
            WHERE email = %s
        """, (email,))

        user = cursor.fetchone()
        cursor.close()
        conn.close()

        if not user:
            return jsonify({
                'success': False,
                'message': 'Invalid email or password'
            }), 401

        # Check if account is active
        if not user['is_active']:
            return jsonify({
                'success': False,
                'message': 'Account is deactivated. Please contact support.'
            }), 403

        # Verify password
        if not bcrypt.check_password_hash(user['password_hash'], password):
            return jsonify({
                'success': False,
                'message': 'Invalid email or password'
            }), 401

        # Generate access token
        access_token = create_access_token(identity=user['id'])

        return jsonify({
            'success': True,
            'message': 'Login successful',
            'data': {
                'user': {
                    'id': user['id'],
                    'email': user['email'],
                    'full_name': user['full_name'],
                    'company_name': user['company_name'],
                    'phone': user['phone'],
                    'is_verified': user['is_verified']
                },
                'access_token': access_token
            }
        }), 200

    except Exception as e:
        print(f"Login error: {e}")
        return jsonify({
            'success': False,
            'message': 'An error occurred during login'
        }), 500

@app.route('/api/auth/me', methods=['GET'])
@jwt_required()
def get_current_user():
    """Get current user profile"""
    try:
        current_user_id = get_jwt_identity()

        # Connect to database
        conn = get_db_connection()
        if conn is None:
            return jsonify({
                'success': False,
                'message': 'Database connection error'
            }), 500

        cursor = conn.cursor(cursor_factory=RealDictCursor)

        # Get user data
        cursor.execute("""
            SELECT id, email, full_name, company_name, phone, is_verified, created_at
            FROM users
            WHERE id = %s AND is_active = TRUE
        """, (current_user_id,))

        user = cursor.fetchone()
        cursor.close()
        conn.close()

        if not user:
            return jsonify({
                'success': False,
                'message': 'User not found'
            }), 404

        return jsonify({
            'success': True,
            'data': {
                'user': {
                    'id': user['id'],
                    'email': user['email'],
                    'full_name': user['full_name'],
                    'company_name': user['company_name'],
                    'phone': user['phone'],
                    'is_verified': user['is_verified'],
                    'created_at': user['created_at'].isoformat()
                }
            }
        }), 200

    except Exception as e:
        print(f"Get user error: {e}")
        return jsonify({
            'success': False,
            'message': 'An error occurred'
        }), 500

@app.route('/api/auth/update-profile', methods=['PUT'])
@jwt_required()
def update_profile():
    """Update user profile"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()

        # Connect to database
        conn = get_db_connection()
        if conn is None:
            return jsonify({
                'success': False,
                'message': 'Database connection error'
            }), 500

        cursor = conn.cursor(cursor_factory=RealDictCursor)

        # Build update query dynamically
        update_fields = []
        params = []

        if data.get('full_name'):
            update_fields.append("full_name = %s")
            params.append(data['full_name'].strip())

        if data.get('company_name'):
            update_fields.append("company_name = %s")
            params.append(data['company_name'].strip())

        if data.get('phone'):
            update_fields.append("phone = %s")
            params.append(data['phone'].strip())

        if not update_fields:
            cursor.close()
            conn.close()
            return jsonify({
                'success': False,
                'message': 'No fields to update'
            }), 400

        update_fields.append("updated_at = CURRENT_TIMESTAMP")
        params.append(current_user_id)

        query = f"""
            UPDATE users
            SET {', '.join(update_fields)}
            WHERE id = %s
            RETURNING id, email, full_name, company_name, phone
        """

        cursor.execute(query, params)
        updated_user = cursor.fetchone()
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({
            'success': True,
            'message': 'Profile updated successfully',
            'data': {
                'user': dict(updated_user)
            }
        }), 200

    except Exception as e:
        print(f"Update profile error: {e}")
        return jsonify({
            'success': False,
            'message': 'An error occurred while updating profile'
        }), 500

@app.route('/api/auth/send-otp', methods=['POST'])
def send_otp():
    """Send OTP to phone number"""
    try:
        data = request.get_json()
        phone = data.get('phone')

        if not phone:
            return jsonify({
                'success': False,
                'message': 'Phone number is required'
            }), 400

        # Send OTP via 2Factor API
        result = TwoFactorService.send_otp(phone)

        if result.get('Status') == 'Success':
            return jsonify({
                'success': True,
                'message': 'OTP sent successfully',
                'session_id': result.get('Details')
            }), 200
        else:
            return jsonify({
                'success': False,
                'message': result.get('Details', 'Failed to send OTP')
            }), 500

    except Exception as e:
        print(f"Send OTP error: {e}")
        return jsonify({
            'success': False,
            'message': 'An error occurred while sending OTP'
        }), 500

@app.route('/api/auth/verify-otp', methods=['POST'])
def verify_otp():
    """Verify OTP using session ID"""
    try:
        data = request.get_json()
        session_id = data.get('session_id')
        otp = data.get('otp')

        if not session_id or not otp:
            return jsonify({
                'success': False,
                'message': 'session_id and otp are required'
            }), 400

        # Verify OTP via 2Factor API
        result = TwoFactorService.verify_otp(session_id, otp)

        if result.get('Status') == 'Success':
            return jsonify({
                'success': True,
                'message': 'OTP verified successfully'
            }), 200
        else:
            return jsonify({
                'success': False,
                'message': result.get('Details', 'Invalid OTP')
            }), 400

    except Exception as e:
        print(f"Verify OTP error: {e}")
        return jsonify({
            'success': False,
            'message': 'An error occurred while verifying OTP'
        }), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'success': False,
        'message': 'Endpoint not found'
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'success': False,
        'message': 'Internal server error'
    }), 500

if __name__ == '__main__':
    # For development only - use gunicorn for production
    app.run(debug=True, host='0.0.0.0', port=5000)
