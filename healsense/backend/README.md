# HealSense Backend API

FastAPI-based REST API for the HealSense health monitoring and prediction system.

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Virtual environment (automatically configured)

### Installation

```bash
# Navigate to backend directory
cd healsense/backend

# Virtual environment is already configured at project root
# Dependencies are already installed

# Copy environment file (already done)
# cp .env.example .env
```

### Running the Server

**Development Mode (with auto-reload):**
```bash
python run.py
```

**Production Mode:**
```bash
gunicorn api.app:app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:5000
```

**Using uvicorn directly:**
```bash
uvicorn api.app:app --host 0.0.0.0 --port 5000 --reload
```

### Access Points

- **API Root**: http://localhost:5000/
- **Health Check**: http://localhost:5000/health
- **Interactive API Docs (Swagger)**: http://localhost:5000/api/docs
- **Alternative Docs (ReDoc)**: http://localhost:5000/api/redoc

## 📁 Project Structure

```
backend/
├── api/
│   ├── __init__.py
│   ├── app.py                 # Main FastAPI application
│   ├── config.py              # Configuration management
│   ├── routes/                # API endpoints
│   │   └── __init__.py
│   ├── models/                # Data models
│   │   ├── __init__.py
│   │   └── database/          # SQLAlchemy models
│   │       └── __init__.py
│   ├── services/              # Business logic
│   │   └── __init__.py
│   ├── middleware/            # Custom middleware
│   │   └── __init__.py
│   └── utils/                 # Utility functions
│       ├── __init__.py
│       └── logger.py          # Logging configuration
├── tests/                     # Test suite
├── .env                       # Environment variables (not in git)
├── .env.example               # Environment template
├── .gitignore                 # Git ignore patterns
├── requirements.txt           # Python dependencies
├── run.py                     # Development server script
└── wsgi.py                    # WSGI entry point

```

## 🔧 Configuration

Edit `.env` file to configure:

### Core Settings
- `ENV` - Environment (development/production)
- `DEBUG` - Debug mode (true/false)
- `PORT` - Server port (default: 5000)
- `SECRET_KEY` - JWT secret key (change in production!)

### Database
- `DATABASE_URL` - PostgreSQL connection string

### External Services
- `REDIS_HOST`, `REDIS_PORT` - Redis cache
- `MQTT_BROKER`, `MQTT_PORT` - IoT device communication
- `FIREBASE_CREDENTIALS_PATH` - Firebase integration

### ML Models
- `LSTM_MODEL_PATH` - LSTM model file
- `RF_MODEL_PATH` - Random Forest model file
- `SCALER_PATH` - Data scaler file

## 📦 Dependencies

Major dependencies:
- **FastAPI** - Modern web framework
- **Uvicorn** - ASGI server
- **SQLAlchemy** - ORM for database
- **Pydantic** - Data validation
- **TensorFlow** - ML model inference
- **Scikit-learn** - Classical ML models
- **Redis** - Caching
- **Paho-MQTT** - IoT communication
- **Firebase Admin** - Cloud services

See [requirements.txt](requirements.txt) for complete list.

## 🛣️ API Endpoints (Planned)

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/refresh` - Refresh token

### Sensor Data
- `POST /api/v1/data/` - Ingest sensor data
- `GET /api/v1/data/latest/{patient_id}` - Get latest vitals
- `GET /api/v1/data/history/{patient_id}` - Get vital history

### Predictions
- `POST /api/v1/predict/` - Get health prediction
- `GET /api/v1/predict/batch/{patient_id}` - Batch predictions

### Patients
- `GET /api/v1/patients/` - List patients
- `POST /api/v1/patients/` - Create patient
- `GET /api/v1/patients/{id}` - Get patient details
- `PUT /api/v1/patients/{id}` - Update patient
- `DELETE /api/v1/patients/{id}` - Delete patient

### Analytics
- `GET /api/v1/analytics/dashboard` - Dashboard stats
- `GET /api/v1/analytics/trends/{patient_id}` - Trend analysis

## 🧪 Testing

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=api tests/

# Run specific test file
pytest tests/test_api/test_health.py -v
```

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS middleware configured
- Rate limiting (to be implemented)
- Input validation with Pydantic

## 📝 Development

### Code Quality

```bash
# Format code
black api/

# Sort imports
isort api/

# Type checking
mypy api/

# Linting
flake8 api/
```

### Adding New Endpoints

1. Create route file in `api/routes/`
2. Define Pydantic models for request/response
3. Implement business logic in `api/services/`
4. Add router to `api/app.py`
5. Write tests in `tests/`

## 📊 Monitoring

- Health check endpoint: `/health`
- Prometheus metrics (to be implemented)
- Structured JSON logging

## 🐳 Docker

```bash
# Build image
docker build -t healsense-backend .

# Run container
docker run -d -p 5000:5000 --env-file .env healsense-backend
```

## 🚧 TODO

- [ ] Implement authentication endpoints
- [ ] Add sensor data ingestion endpoints
- [ ] Integrate ML model for predictions
- [ ] Set up PostgreSQL database
- [ ] Implement Redis caching
- [ ] Add MQTT client for IoT devices
- [ ] Implement rate limiting
- [ ] Add comprehensive test suite
- [ ] Set up CI/CD pipeline
- [ ] Add API documentation
- [ ] Implement WebSocket for real-time updates

## 📄 License

MIT License - See LICENSE file

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Add tests
4. Ensure code quality checks pass
5. Submit pull request

---

**Status**: ✅ Environment Setup Complete | 🚧 API Implementation In Progress
