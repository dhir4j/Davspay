"""
WSGI entry point for PythonAnywhere deployment
"""
from app import app

if __name__ == "__main__":
    app.run()
