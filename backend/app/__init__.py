from flask import Flask, jsonify, render_template_string
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from config import config
import psycopg2
from psycopg2.extras import RealDictCursor

# Initialize extensions
bcrypt = Bcrypt()
jwt = JWTManager()

def get_db_connection(app):
    """Create and return a database connection using app config"""
    try:
        conn = psycopg2.connect(
            host=app.config['DB_HOST'],
            database=app.config['DB_NAME'],
            user=app.config['DB_USER'],
            password=app.config['DB_PASSWORD'],
            port=app.config['DB_PORT']
        )
        return conn
    except Exception as e:
        app.logger.error(f"Database connection error: {e}")
        return None

def create_app(env="development"):
    """Flask application factory"""
    app = Flask(__name__)

    # Load configuration
    app.config.from_object(config[env])

    # Initialize extensions
    bcrypt.init_app(app)
    jwt.init_app(app)

    # Initialize CORS
    CORS(
        app,
        resources={r"/api/*": {"origins": app.config['CORS_ORIGINS']}},
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization"],
        expose_headers=["Content-Type"]
    )

    # Store db connection function in app
    app.get_db_connection = lambda: get_db_connection(app)

    # Root route - Server status page
    @app.route("/")
    def index():
        return render_template_string("""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <title>Davspay API Server</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: #fff;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
                    overflow-x: hidden;
                    padding: 20px;
                }
                .logo {
                    font-size: 5rem;
                    animation: float 3s ease-in-out infinite;
                    margin-bottom: 20px;
                    filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                h1 {
                    font-size: clamp(1.5rem, 5vw, 2.5rem);
                    margin-bottom: 0.5em;
                    letter-spacing: 2px;
                    text-align: center;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
                }
                .status-indicator {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-top: 20px;
                    padding: 15px 30px;
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border-radius: 50px;
                    border: 2px solid rgba(255, 255, 255, 0.2);
                }
                .dot {
                    height: 16px;
                    width: 16px;
                    background-color: #00ff88;
                    border-radius: 50%;
                    box-shadow: 0 0 12px #00ff88, 0 0 24px #00ff88;
                    animation: pulse 1.5s infinite;
                }
                @keyframes pulse {
                    0%, 100% {
                        box-shadow: 0 0 8px #00ff88, 0 0 16px #00ff88;
                        transform: scale(1);
                    }
                    50% {
                        box-shadow: 0 0 16px #00ff88, 0 0 32px #00ff88;
                        transform: scale(1.1);
                    }
                }
                .info {
                    margin-top: 40px;
                    padding: 30px;
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border-radius: 20px;
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    max-width: 600px;
                    text-align: center;
                }
                .info h2 {
                    font-size: 1.5rem;
                    margin-bottom: 15px;
                    color: #fff;
                }
                .endpoint {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px 20px;
                    margin: 10px 0;
                    background: rgba(0, 0, 0, 0.2);
                    border-radius: 10px;
                    font-family: 'Courier New', monospace;
                    font-size: 0.9rem;
                }
                .method {
                    padding: 4px 12px;
                    border-radius: 6px;
                    font-weight: bold;
                    font-size: 0.75rem;
                }
                .get { background: #61affe; color: #fff; }
                .post { background: #49cc90; color: #fff; }
                .put { background: #fca130; color: #fff; }
                .endpoint-path {
                    flex: 1;
                    margin-left: 15px;
                    text-align: left;
                    color: #f0f0f0;
                }
                .footer {
                    margin-top: 40px;
                    opacity: 0.7;
                    font-size: 0.9rem;
                    text-align: center;
                }
                @media (max-width: 768px) {
                    .logo { font-size: 3rem; }
                    .info { padding: 20px; }
                    .endpoint {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 8px;
                    }
                    .endpoint-path {
                        margin-left: 0;
                        word-break: break-all;
                    }
                }
            </style>
        </head>
        <body>
            <div class="logo">&#128179;</div>
            <h1>Davspay Payment Gateway API</h1>
            <div class="status-indicator">
                <span class="dot"></span>
                <span style="font-weight: 600; font-size: 1.1rem;">Server Running</span>
            </div>

            <div class="info">
                <h2>&#128279; Available Endpoints</h2>
                <div class="endpoint">
                    <span class="method get">GET</span>
                    <span class="endpoint-path">/api/health</span>
                </div>
                <div class="endpoint">
                    <span class="method post">POST</span>
                    <span class="endpoint-path">/api/auth/register</span>
                </div>
                <div class="endpoint">
                    <span class="method post">POST</span>
                    <span class="endpoint-path">/api/auth/login</span>
                </div>
                <div class="endpoint">
                    <span class="method get">GET</span>
                    <span class="endpoint-path">/api/auth/me</span>
                </div>
                <div class="endpoint">
                    <span class="method put">PUT</span>
                    <span class="endpoint-path">/api/auth/update-profile</span>
                </div>
            </div>

            <div class="footer">
                <p>&#128274; Secure Payment Processing Platform</p>
                <p style="margin-top: 10px;">Powered by Flask & PostgreSQL</p>
            </div>
        </body>
        </html>
        """)

    # Register blueprints
    from .routes import auth_bp
    app.register_blueprint(auth_bp)

    # Global error handlers
    @app.errorhandler(404)
    def not_found(err):
        return jsonify({
            "success": False,
            "message": "Endpoint not found"
        }), 404

    @app.errorhandler(500)
    def internal_server_error(err):
        app.logger.error(f"Internal server error: {err}")
        return jsonify({
            "success": False,
            "message": "Internal server error"
        }), 500

    @app.errorhandler(422)
    @app.errorhandler(400)
    def handle_validation_error(err):
        messages = getattr(err, 'data', {}).get('messages', 'Invalid input.')
        return jsonify({"error": messages}), 400

    return app
