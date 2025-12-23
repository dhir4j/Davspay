# Davspay Backend API

Flask-based REST API for Davspay payment gateway with PostgreSQL database support.

## Features

- User Registration & Login
- JWT Authentication
- PostgreSQL Database
- Password Hashing with Bcrypt
- CORS Support
- Profile Management

## Local Development Setup

### Prerequisites

- Python 3.8+
- PostgreSQL 12+

### Installation

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your database credentials:
```env
DB_HOST=localhost
DB_NAME=davspay_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_PORT=5432

SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret-key
```

5. Initialize the database:
```bash
python init_db.py development
```

6. Run the application:
```bash
python run.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication

#### 1. Register
- **POST** `/api/auth/register`
- **Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "full_name": "John Doe",
  "company_name": "Acme Inc",
  "phone": "+919876543210"
}
```

#### 2. Login
- **POST** `/api/auth/login`
- **Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### 3. Get Current User
- **GET** `/api/auth/me`
- **Headers:** `Authorization: Bearer <token>`

#### 4. Update Profile
- **PUT** `/api/auth/update-profile`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "full_name": "Jane Doe",
  "company_name": "New Company",
  "phone": "+919999999999"
}
```

### Health Check

- **GET** `/api/health`

## PythonAnywhere Deployment

### Step 1: Setup PostgreSQL Database

1. Go to PythonAnywhere Dashboard
2. Navigate to "Databases" tab
3. Create a new PostgreSQL database
4. Note down the connection details:
   - Host: `xxx.postgres.pythonanywhere-services.com`
   - Database name
   - Username
   - Password
   - Port

### Step 2: Upload Code

1. Open a Bash console on PythonAnywhere
2. Clone or upload your backend code:
```bash
cd ~
git clone <your-repo-url> davspay-backend
cd davspay-backend/backend
```

### Step 3: Install Dependencies

```bash
mkvirtualenv davspay-env --python=/usr/bin/python3.10
pip install -r requirements.txt
```

### Step 4: Configure Environment

1. Create `.env` file:
```bash
nano .env
```

2. Add your PostgreSQL credentials:
```env
DB_HOST=xxx.postgres.pythonanywhere-services.com
DB_NAME=your_db_name
DB_USER=your_username
DB_PASSWORD=your_password
DB_PORT=10XXX

SECRET_KEY=your-generated-secret-key
JWT_SECRET_KEY=your-generated-jwt-key

FLASK_ENV=production
FLASK_DEBUG=False
```

### Step 5: Setup Web App

1. Go to "Web" tab in PythonAnywhere
2. Click "Add a new web app"
3. Choose "Manual configuration"
4. Select Python 3.10
5. Configure WSGI file:

Edit `/var/www/your_username_pythonanywhere_com_wsgi.py`:

```python
import sys
import os

# Add your project directory to the sys.path
project_home = '/home/your_username/davspay-backend/backend'
if project_home not in sys.path:
    sys.path = [project_home] + sys.path

# Load environment variables
from dotenv import load_dotenv
load_dotenv(os.path.join(project_home, '.env'))

# Import Flask app
from app import app as application
```

6. Set virtualenv path:
```
/home/your_username/.virtualenvs/davspay-env
```

7. Click "Reload" button

### Step 6: Initialize Database

Run in Bash console:
```bash
cd ~/davspay-backend/backend
workon davspay-env
python init_db.py production
```

### Step 7: Test API

Your API will be available at:
- `https://your_username.pythonanywhere.com/api/health`

## Database Schema

### Users Table

```sql
CREATE TABLE users (
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
);

CREATE INDEX idx_users_email ON users(email);
```

## Security Best Practices

1. **Change Secret Keys**: Generate strong random keys for production
2. **HTTPS Only**: Always use HTTPS in production
3. **Rate Limiting**: Implement rate limiting for authentication endpoints
4. **Input Validation**: All user inputs are validated
5. **SQL Injection Protection**: Using parameterized queries
6. **Password Hashing**: Bcrypt with salt

## Generate Secret Keys

```python
import secrets
print(secrets.token_hex(32))  # For SECRET_KEY
print(secrets.token_hex(32))  # For JWT_SECRET_KEY
```

## Troubleshooting

### Database Connection Issues

1. Verify PostgreSQL credentials in `.env`
2. Check if PostgreSQL service is running
3. Verify firewall rules allow connection
4. Check PythonAnywhere database tab for correct connection details

### CORS Issues

Update allowed origins in `app.py`:
```python
CORS(app, origins=['https://yourdomain.com', 'http://localhost:3000'])
```

### Import Errors

Ensure all dependencies are installed:
```bash
workon davspay-env
pip install -r requirements.txt
```

## Support

For issues or questions, contact: support@davspaysolution.com

## License

Proprietary - Davspay Solutions
