"""
Local development server runner
Run this file for local development: python run.py
"""
from app import create_app

# Create Flask app for development
app = create_app("development")

if __name__ == "__main__":
    print("\n" + "="*60)
    print("=€ Davspay API Server - Development Mode")
    print("="*60)
    print("=á Server running at: http://localhost:5000")
    print("<å Health check: http://localhost:5000/api/health")
    print("=Ú API Documentation: http://localhost:5000/")
    print("="*60 + "\n")

    app.run(
        debug=True,
        host='0.0.0.0',
        port=5000
    )
