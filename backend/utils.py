"""
Utility functions for the application
"""
import re
from datetime import datetime

def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_password(password):
    """
    Validate password strength
    - At least 8 characters
    - Contains at least one uppercase letter
    - Contains at least one lowercase letter
    - Contains at least one number
    """
    if len(password) < 8:
        return False, "Password must be at least 8 characters long"

    if not re.search(r'[A-Z]', password):
        return False, "Password must contain at least one uppercase letter"

    if not re.search(r'[a-z]', password):
        return False, "Password must contain at least one lowercase letter"

    if not re.search(r'\d', password):
        return False, "Password must contain at least one number"

    return True, "Valid password"

def validate_phone(phone):
    """Validate Indian phone number"""
    # Remove all non-digit characters
    digits = re.sub(r'\D', '', phone)

    # Check if it's a valid Indian phone number (10 digits)
    if len(digits) == 10:
        return True

    # Check if it has country code +91
    if len(digits) == 12 and digits.startswith('91'):
        return True

    return False

def sanitize_string(text):
    """Sanitize string input"""
    if not text:
        return ""
    return text.strip()

def format_datetime(dt):
    """Format datetime to ISO string"""
    if isinstance(dt, datetime):
        return dt.isoformat()
    return str(dt)

def generate_response(success=True, message="", data=None, status_code=200):
    """Generate standardized API response"""
    response = {
        'success': success,
        'message': message
    }

    if data is not None:
        response['data'] = data

    return response, status_code
