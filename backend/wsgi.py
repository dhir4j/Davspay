"""
WSGI entry point for PythonAnywhere deployment

IMPORTANT: Update the project_home path to your actual PythonAnywhere directory!
Example: '/home/dhir4j/davspay-backend/backend'
"""
import sys
import os

# Add the project directory to Python path
# UPDATE THIS PATH to match your PythonAnywhere directory structure
project_home = '/home/dhir4j/davspay-backend/backend'

if project_home not in sys.path:
    sys.path.insert(0, project_home)

# Change to project directory (critical for .env and imports)
os.chdir(project_home)

# Import the Flask application factory
from app import create_app

# Create the application instance for production
application = create_app("production")

if __name__ == "__main__":
    application.run()
