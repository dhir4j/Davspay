from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from psycopg2.extras import RealDictCursor
from app import bcrypt

auth_bp = Blueprint('auth', __name__, url_prefix='/api')

@auth_bp.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'Davspay API is running',
        'service': 'payment-gateway'
    }), 200

@auth_bp.route('/auth/register', methods=['POST'])
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
        conn = current_app.get_db_connection()
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
        current_app.logger.error(f"Registration error: {e}")
        return jsonify({
            'success': False,
            'message': 'An error occurred during registration'
        }), 500

@auth_bp.route('/auth/login', methods=['POST'])
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
        conn = current_app.get_db_connection()
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
        current_app.logger.error(f"Login error: {e}")
        return jsonify({
            'success': False,
            'message': 'An error occurred during login'
        }), 500

@auth_bp.route('/auth/me', methods=['GET'])
@jwt_required()
def get_current_user():
    """Get current user profile"""
    try:
        current_user_id = get_jwt_identity()

        # Connect to database
        conn = current_app.get_db_connection()
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
        current_app.logger.error(f"Get user error: {e}")
        return jsonify({
            'success': False,
            'message': 'An error occurred'
        }), 500

@auth_bp.route('/auth/update-profile', methods=['PUT'])
@jwt_required()
def update_profile():
    """Update user profile"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()

        # Connect to database
        conn = current_app.get_db_connection()
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
        current_app.logger.error(f"Update profile error: {e}")
        return jsonify({
            'success': False,
            'message': 'An error occurred while updating profile'
        }), 500
