# PythonAnywhere Quick Deployment Checklist

## <¯ For http://server.davspay.com/

Follow these steps in order to deploy your restructured Davspay backend to PythonAnywhere.

---

## Step 1: Upload Code to PythonAnywhere

### Option A: Git (Recommended)
```bash
# Open Bash console on PythonAnywhere
cd ~
git clone YOUR_REPO_URL davspay-backend
cd davspay-backend/backend
```

### Option B: Manual Upload
1. Go to Files tab on PythonAnywhere
2. Create folder: `/home/dhir4j/davspay-backend/backend`
3. Upload all files from local `backend/` directory

---

## Step 2: Create Virtual Environment

```bash
# In Bash console
cd ~/davspay-backend/backend
mkvirtualenv davspay-env --python=/usr/bin/python3.10
```

You should see: `(davspay-env)` in your prompt

---

## Step 3: Install Dependencies

```bash
# Make sure you're in davspay-env
pip install -r requirements.txt
```

Wait for installation to complete (~1-2 minutes)

---

## Step 4: Get PostgreSQL Credentials

1. Go to **Databases** tab in PythonAnywhere
2. Find your PostgreSQL database section
3. Note down:
   - **Host**: `dhir4j-XXXX.postgres.pythonanywhere-services.com`
   - **Database**: `dhir4j$davspay_db` (or your db name)
   - **Username**: `dhir4j`
   - **Password**: (the one you set)
   - **Port**: `1XXXX` (5-digit number)

---

## Step 5: Create .env File

```bash
cd ~/davspay-backend/backend
nano .env
```

Paste this (UPDATE with your actual values):

```env
# PostgreSQL Database
DB_HOST=dhir4j-XXXX.postgres.pythonanywhere-services.com
DB_NAME=dhir4j$davspay_db
DB_USER=dhir4j
DB_PASSWORD=YOUR_ACTUAL_PASSWORD
DB_PORT=1XXXX

# Generate new secret keys!
SECRET_KEY=GENERATE_NEW_KEY_HERE
JWT_SECRET_KEY=GENERATE_NEW_JWT_KEY_HERE

# CORS (add your frontend domain)
CORS_ORIGINS=https://davspay.com,https://www.davspay.com,http://localhost:3000

# Environment
FLASK_ENV=production
FLASK_DEBUG=False
```

**Generate Secret Keys:**
```python
# In Python console
import secrets
print("SECRET_KEY:", secrets.token_hex(32))
print("JWT_SECRET_KEY:", secrets.token_hex(32))
```

Copy the generated keys to your `.env` file.

Save: `Ctrl+X`, `Y`, `Enter`

---

## Step 6: Initialize Database

```bash
cd ~/davspay-backend/backend
workon davspay-env
python init_db.py production
```

You should see:
```
=Ä  Davspay Database Initialization
 Connected successfully!
=Ë Creating tables...
 All tables created successfully!
```

---

## Step 7: Configure Web App

### 7a. Create Web App

1. Go to **Web** tab
2. Click **Add a new web app**
3. Domain: Use `dhir4j.pythonanywhere.com` (or custom domain)
4. Select: **Manual configuration**
5. Python version: **3.10**

### 7b. Edit WSGI File

1. On Web tab, find **Code** section
2. Click WSGI file link: `/var/www/dhir4j_pythonanywhere_com_wsgi.py`
3. **Delete ALL content**
4. Replace with:

```python
import sys
import os

# IMPORTANT: Update this path!
project_home = '/home/dhir4j/davspay-backend/backend'

if project_home not in sys.path:
    sys.path.insert(0, project_home)

# Change to project directory (critical for .env loading!)
os.chdir(project_home)

# Import Flask application
from app import create_app

# Create production app instance
application = create_app("production")
```

Save: `Ctrl+S` or click **Save** button

### 7c. Set Virtual Environment

1. On Web tab, scroll to **Virtualenv** section
2. Enter path:
```
/home/dhir4j/.virtualenvs/davspay-env
```
3. Click checkmark 

---

## Step 8: Reload Web App

1. Scroll to top of **Web** tab
2. Click big green button: **Reload dhir4j.pythonanywhere.com**
3. Wait for reload (~10 seconds)

---

## Step 9: Test Your API

### Test 1: Root Page
Open browser:
```
https://dhir4j.pythonanywhere.com/
```

You should see beautiful server status page with endpoints list.

### Test 2: Health Check
```bash
curl https://dhir4j.pythonanywhere.com/api/health
```

Expected:
```json
{
  "status": "healthy",
  "message": "Davspay API is running",
  "service": "payment-gateway"
}
```

### Test 3: Register User
```bash
curl -X POST https://dhir4j.pythonanywhere.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@davspay.com",
    "password": "Test1234",
    "full_name": "Test User",
    "company_name": "Test Company",
    "phone": "9876543210"
  }'
```

Expected: Success response with user data and access_token

### Test 4: Login
```bash
curl -X POST https://dhir4j.pythonanywhere.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@davspay.com",
    "password": "Test1234"
  }'
```

Expected: Success response with access_token

---

## Step 10: Setup Custom Domain (server.davspay.com)

### 10a. Add CNAME Record (At your domain registrar)

```
Type: CNAME
Name: server
Value: dhir4j.pythonanywhere.com
TTL: 3600
```

### 10b. Configure in PythonAnywhere

1. Go to **Web** tab
2. In **Configuration for** section, click **Add a new web app**
3. OR edit existing app
4. Add custom domain: `server.davspay.com`
5. Save and reload

Wait 5-60 minutes for DNS propagation.

---

##  Deployment Complete!

Your API should now be live at:
- `https://dhir4j.pythonanywhere.com/`
- `https://server.davspay.com/` (after DNS propagation)

---

## =' Troubleshooting

### Problem: "Something went wrong" Error

**Check Error Log:**
1. Go to **Web** tab
2. Scroll to **Log files**
3. Click **Error log**
4. Look for Python errors

**Common Fixes:**

**Fix 1: Wrong project_home path**
```python
# In WSGI file, verify path exists:
project_home = '/home/dhir4j/davspay-backend/backend'
```

**Fix 2: Missing dependencies**
```bash
workon davspay-env
pip install -r requirements.txt
# Reload web app
```

**Fix 3: Wrong virtualenv path**
- Check: `/home/dhir4j/.virtualenvs/davspay-env`
- Should match exactly in Web tab

### Problem: Database Connection Failed

**Test connection:**
```bash
cd ~/davspay-backend/backend
workon davspay-env
python
```
```python
from app import create_app
app = create_app("production")
conn = app.get_db_connection()
if conn:
    print(" Connection works!")
    conn.close()
else:
    print("L Connection failed - check .env credentials")
```

**Check .env file:**
```bash
cat ~/davspay-backend/backend/.env
# Verify all DB_* values are correct
```

### Problem: Import Errors

```bash
cd ~/davspay-backend/backend
workon davspay-env
python -c "from app import create_app; print(' Imports work!')"
```

If error, reinstall:
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### Problem: CORS Errors from Frontend

Update `.env`:
```env
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

Then reload web app.

---

## =Ê Check Logs

### Error Log (Python errors)
```bash
cat /var/log/dhir4j.pythonanywhere.com.error.log | tail -50
```

### Access Log (HTTP requests)
```bash
cat /var/log/dhir4j.pythonanywhere.com.access.log | tail -50
```

### Server Log (General info)
```bash
cat /var/log/dhir4j.pythonanywhere.com.server.log | tail -50
```

---

## = Update Code After Changes

```bash
# Pull latest code
cd ~/davspay-backend
git pull origin main

# Reinstall if requirements changed
cd backend
workon davspay-env
pip install -r requirements.txt

# Go to Web tab and click Reload button
```

---

## =Ý Post-Deployment Checklist

- [ ] Health endpoint returns success
- [ ] Register endpoint creates user
- [ ] Login endpoint returns JWT token
- [ ] Database tables created successfully
- [ ] Custom domain configured (if using)
- [ ] Frontend updated with production API URL
- [ ] Secret keys generated and updated
- [ ] CORS_ORIGINS set to production domains only
- [ ] FLASK_DEBUG=False in production
- [ ] Error logs clean (no errors)

---

## <‰ Success Indicators

When everything works, you should see:

**Root page (`/`):**
- =³ Animated card icon
- Green status dot
- List of 5 API endpoints
- Professional styling

**Health check (`/api/health`):**
```json
{"status": "healthy", "message": "Davspay API is running", "service": "payment-gateway"}
```

**Error log:**
- No Python errors
- No import errors
- No database connection errors

---

## =Þ Support

**PythonAnywhere Issues:**
- Forum: https://www.pythonanywhere.com/forums/
- Email: help@pythonanywhere.com

**Backend Code Issues:**
- Check `BACKEND_RESTRUCTURE_SUMMARY.md`
- Check `DEPLOYMENT.md`
- Check `README.md`

---

## =€ Next Steps

1.  Test all API endpoints
2. Update frontend `lib/AuthContext.tsx`:
   ```typescript
   const API_URL = 'https://server.davspay.com/api';
   ```
3. Test login/register from frontend
4. Add rate limiting
5. Set up monitoring
6. Implement email verification
7. Add password reset
8. Create payment endpoints blueprint

---

**Deployment Time:** ~15-20 minutes
**Difficulty:** Medium
**Success Rate:** High (when following steps exactly)

**Good luck! =€**
