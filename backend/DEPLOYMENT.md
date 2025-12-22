# PythonAnywhere Deployment Guide

Complete step-by-step guide to deploy Davspay backend on PythonAnywhere with PostgreSQL.

## Prerequisites

1. PythonAnywhere account (paid account for PostgreSQL access)
2. PostgreSQL database purchased on PythonAnywhere
3. Your backend code ready

## Step-by-Step Deployment

### 1. Setup PostgreSQL Database

1. Log in to PythonAnywhere
2. Go to **Databases** tab
3. In the PostgreSQL section, you'll see your database details:
   - **Host**: `xxx-xxx.postgres.pythonanywhere-services.com`
   - **Database name**: Usually `your_username$default`
   - **Username**: Your PythonAnywhere username
   - **Password**: The password you set when creating the database
   - **Port**: Usually `10XXX` (4 or 5 digits)

4. Note all these details - you'll need them for configuration

### 2. Upload Your Code

**Option A: Using Git (Recommended)**

```bash
# Open a Bash console from PythonAnywhere dashboard
cd ~
git clone https://github.com/yourusername/your-repo.git davspay-backend
cd davspay-backend/backend
```

**Option B: Using File Upload**

1. Go to **Files** tab
2. Create directory: `davspay-backend`
3. Upload all backend files to `/home/your_username/davspay-backend/backend/`

### 3. Create Virtual Environment

```bash
# In Bash console
cd ~/davspay-backend/backend
mkvirtualenv davspay-env --python=/usr/bin/python3.10
```

### 4. Install Dependencies

```bash
# Make sure you're in the virtual environment (should see (davspay-env) in prompt)
pip install -r requirements.txt
```

If you get errors:
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 5. Configure Environment Variables

```bash
# Create .env file
nano .env
```

Add your configuration (replace with your actual values):

```env
# PostgreSQL Database Configuration
DB_HOST=xxx-xxx.postgres.pythonanywhere-services.com
DB_NAME=your_username$default
DB_USER=your_username
DB_PASSWORD=your_database_password
DB_PORT=10XXX

# Security Keys (GENERATE NEW ONES!)
SECRET_KEY=your-super-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here

# Application
FLASK_ENV=production
FLASK_DEBUG=False

# CORS (Add your frontend domain)
CORS_ORIGINS=https://yourdomain.com,http://localhost:3000
```

**To generate secure keys**, run in Python console:
```python
import secrets
print("SECRET_KEY:", secrets.token_hex(32))
print("JWT_SECRET_KEY:", secrets.token_hex(32))
```

Save the file: `Ctrl+X`, then `Y`, then `Enter`

### 6. Initialize Database

```bash
# In Bash console
cd ~/davspay-backend/backend
python3
```

```python
from app import init_db
init_db()
# You should see: "Database initialized successfully"
exit()
```

**Verify tables were created:**
```python
from app import get_db_connection
conn = get_db_connection()
cursor = conn.cursor()
cursor.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'")
print(cursor.fetchall())
# Should show: [('users',)]
cursor.close()
conn.close()
exit()
```

### 7. Setup Web App

1. Go to **Web** tab in PythonAnywhere dashboard
2. Click **Add a new web app**
3. Choose your domain (free: `your_username.pythonanywhere.com`)
4. Select **Manual configuration**
5. Choose **Python 3.10**

### 8. Configure WSGI File

1. On the Web tab, find **Code** section
2. Click on the WSGI configuration file link
   - Path: `/var/www/your_username_pythonanywhere_com_wsgi.py`

3. Delete all content and replace with:

```python
import sys
import os

# Add your project directory to sys.path
project_home = '/home/your_username/davspay-backend/backend'
if project_home not in sys.path:
    sys.path.insert(0, project_home)

# Load environment variables
from dotenv import load_dotenv
env_path = os.path.join(project_home, '.env')
load_dotenv(env_path)

# Import the Flask app
from app import app as application
```

**Important**: Replace `your_username` with your actual PythonAnywhere username!

Save: `Ctrl+S` or click **Save**

### 9. Set Virtual Environment

1. On the Web tab, find **Virtualenv** section
2. Enter: `/home/your_username/.virtualenvs/davspay-env`
3. Click the checkmark

### 10. Configure Static Files (Optional)

If you have static files, in **Static files** section:
- URL: `/static/`
- Directory: `/home/your_username/davspay-backend/backend/static/`

### 11. Reload Web App

1. Scroll to top of Web tab
2. Click the big green **Reload your_username.pythonanywhere.com** button
3. Wait for reload to complete

### 12. Test Your API

**Health Check:**
```bash
curl https://your_username.pythonanywhere.com/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "message": "Davspay API is running"
}
```

**Test Registration:**
```bash
curl -X POST https://your_username.pythonanywhere.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test1234",
    "full_name": "Test User",
    "company_name": "Test Company",
    "phone": "9876543210"
  }'
```

**Test Login:**
```bash
curl -X POST https://your_username.pythonanywhere.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test1234"
  }'
```

## Troubleshooting

### 1. "Import Error" in Error Log

**Check Error Log:**
- Web tab → Log files → Error log

**Common fixes:**
```bash
# Reinstall dependencies
workon davspay-env
pip install -r requirements.txt
```

### 2. "Database Connection Failed"

**Verify credentials:**
```bash
cd ~/davspay-backend/backend
nano .env
# Check DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_PORT
```

**Test connection:**
```python
from app import get_db_connection
conn = get_db_connection()
if conn:
    print("Connection successful!")
    conn.close()
else:
    print("Connection failed!")
```

### 3. "500 Internal Server Error"

1. Check error log (Web tab → Error log)
2. Common causes:
   - Missing dependencies
   - Wrong .env configuration
   - Import errors in code
   - Database connection issues

### 4. CORS Errors from Frontend

Update `app.py`:
```python
CORS(app, origins=['https://yourdomain.com'])
```

Or in `.env`:
```env
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

Then reload web app.

### 5. Check Logs

**Access Log:**
```bash
cat /var/log/your_username.pythonanywhere.com.access.log
```

**Error Log:**
```bash
cat /var/log/your_username.pythonanywhere.com.error.log
```

**Server Log:**
```bash
cat /var/log/your_username.pythonanywhere.com.server.log
```

## Update Code After Changes

```bash
# Pull latest changes
cd ~/davspay-backend/backend
git pull origin main

# Reinstall dependencies if requirements.txt changed
workon davspay-env
pip install -r requirements.txt

# Reload web app
# Go to Web tab and click Reload button
```

## Database Backup

### Export Database

```bash
# In Bash console
pg_dump -h xxx.postgres.pythonanywhere-services.com \
  -p 10XXX \
  -U your_username \
  your_username$default > backup.sql
```

### Import Database

```bash
psql -h xxx.postgres.pythonanywhere-services.com \
  -p 10XXX \
  -U your_username \
  -d your_username$default < backup.sql
```

## Security Checklist

- ✅ Generated new SECRET_KEY and JWT_SECRET_KEY
- ✅ Set FLASK_DEBUG=False in production
- ✅ Updated CORS_ORIGINS to your domain only
- ✅ Using HTTPS (automatic on PythonAnywhere)
- ✅ Database credentials stored in .env (not in code)
- ✅ .env file added to .gitignore

## Support

**PythonAnywhere Help:**
- Forum: https://www.pythonanywhere.com/forums/
- Help: help@pythonanywhere.com

**Davspay Support:**
- Email: support@davspaysolution.com

## Next Steps

1. ✅ API deployed and tested
2. Update frontend to use production API URL
3. Add rate limiting for security
4. Set up monitoring and alerts
5. Configure custom domain (optional)
6. Set up SSL certificate for custom domain
7. Implement email verification
8. Add logging and monitoring
