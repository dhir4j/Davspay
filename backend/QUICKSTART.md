# Quick Start Guide

Get your Davspay backend running in minutes.

## For Local Development

### 1. Install PostgreSQL

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**macOS:**
```bash
brew install postgresql
brew services start postgresql
```

**Windows:**
Download and install from: https://www.postgresql.org/download/windows/

### 2. Create Database

```bash
# Switch to postgres user
sudo -u postgres psql

# In PostgreSQL prompt:
CREATE DATABASE davspay_db;
CREATE USER davspay_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE davspay_db TO davspay_user;
\q
```

### 3. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
```

### 4. Configure Environment

Edit `.env`:
```env
DB_HOST=localhost
DB_NAME=davspay_db
DB_USER=davspay_user
DB_PASSWORD=your_password
DB_PORT=5432

SECRET_KEY=dev-secret-key
JWT_SECRET_KEY=dev-jwt-key
```

### 5. Run Application

```bash
python app.py
```

API will be available at: `http://localhost:5000`

### 6. Test API

```bash
# In a new terminal
python test_api.py
```

## For PythonAnywhere Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment guide.

### Quick Deploy Steps:

1. **Upload Code**
   ```bash
   git clone <your-repo> davspay-backend
   cd davspay-backend/backend
   ```

2. **Install Dependencies**
   ```bash
   mkvirtualenv davspay-env --python=/usr/bin/python3.10
   pip install -r requirements.txt
   ```

3. **Configure .env**
   - Add your PostgreSQL credentials from PythonAnywhere
   - Generate new secret keys

4. **Initialize Database**
   ```python
   from app import init_db
   init_db()
   ```

5. **Setup Web App**
   - Configure WSGI file
   - Set virtualenv path
   - Reload web app

6. **Test**
   ```bash
   curl https://your_username.pythonanywhere.com/api/health
   ```

## API Endpoints

### Health Check
```bash
GET /api/health
```

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123",
  "full_name": "John Doe",
  "company_name": "Acme Inc",
  "phone": "9876543210"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123"
}
```

### Get Profile
```bash
GET /api/auth/me
Authorization: Bearer <token>
```

### Update Profile
```bash
PUT /api/auth/update-profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "full_name": "Jane Doe",
  "company_name": "New Company"
}
```

## Common Issues

### Port Already in Use
```bash
# Find and kill process using port 5000
lsof -ti:5000 | xargs kill -9
```

### Database Connection Failed
- Check PostgreSQL is running
- Verify credentials in .env
- Check if database exists

### Import Errors
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

## Next Steps

1. ✅ Backend running locally
2. Test all endpoints with `test_api.py`
3. Deploy to PythonAnywhere (see DEPLOYMENT.md)
4. Connect frontend to backend API
5. Add more features as needed

## Support

- **Documentation**: See README.md
- **Deployment**: See DEPLOYMENT.md
- **Email**: support@davspaysolution.com
