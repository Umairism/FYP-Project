# HealSense Backend - PostgreSQL + SQLAlchemy Setup Complete ✅

## 🎉 What We Accomplished

Successfully set up a full-stack database integration for the HealSense backend using **PostgreSQL** (via SQLite for development) with **SQLAlchemy ORM**.

---

## 📊 Database Architecture

### Models Created
1. **Patient** - Patient demographics and profile
2. **VitalSigns** - Real-time health monitoring data
3. **Alert** - Health alerts and warnings
4. **Device** - IoT device management
5. **Emergency** - Emergency event tracking

### Relationships
- Patient → VitalSigns (one-to-many)
- Patient → Alerts (one-to-many)
- Patient → Devices (one-to-many)
- Patient → Emergencies (one-to-many)
- Device → VitalSigns (one-to-many)

---

## 🗂️ Files Created/Modified

### Core Database Files
- `backend/api/models/database/models.py` - SQLAlchemy ORM models
- `backend/api/models/database/database.py` - Database connection & session management
- `backend/api/models/database/__init__.py` - Package exports

### API Routes (Database-Enabled)
- `backend/api/routes/patients.py` - Patient management (10 endpoints)
- `backend/api/routes/alerts.py` - Alert management (2 endpoints)
- `backend/api/routes/devices.py` - Device management (3 endpoints)

### Database Management
- `backend/init_db.py` - Database initialization & seeding
- `backend/alembic/` - Migration framework
- `backend/alembic.ini` - Alembic configuration
- `backend/.env` - Updated with DATABASE_URL

---

## 🚀 How to Use

### 1. Start the Backend Server
```bash
cd e:\Github\FYP-Project\healsense\backend
python run.py
```

Server will start at:
- **API**: http://localhost:5000
- **API Docs**: http://localhost:5000/api/docs
- **Health Check**: http://localhost:5000/health

### 2. Test Endpoints

#### Get All Patients
```bash
curl http://localhost:5000/api/v1/patients
```

#### Get Patient Profile
```bash
curl http://localhost:5000/api/v1/patients/P001/profile
```

#### Get Latest Vitals
```bash
curl http://localhost:5000/api/v1/patients/P001/vitals/latest
```

#### Get Patient Alerts
```bash
curl http://localhost:5000/api/v1/patients/P001/alerts
```

#### Get Device Status
```bash
curl http://localhost:5000/api/v1/devices/DEV001/status
```

### 3. View API Documentation
Open in browser: http://localhost:5000/api/docs

Interactive Swagger UI for testing all endpoints!

---

## 📝 Test Data

Database comes pre-seeded with:

### Patients (2)
- **P001**: Muhammad Umair (24, Male, O+)
  - Email: umair@healsense.com
  - Phone: +92-300-1234567

- **P002**: Sarah Ahmed (32, Female, A+)
  - Email: sarah@healsense.com
  - Phone: +92-300-9876543

### Devices (2)
- **DEV001**: Connected to P001 (Battery: 85%, Signal: 92%)
- **DEV002**: Connected to P002 (Battery: 45%, Signal: 78%)

### Vital Signs (2)
- **V001** (P001): HR=75, SpO2=98%, Temp=37.2°C, BP=120/80 (NORMAL)
- **V002** (P002): HR=92, SpO2=95%, Temp=37.8°C, BP=135/88 (WARNING)

### Alerts (1)
- **A001**: Elevated heart rate for P002 (MEDIUM severity)

---

## 🔧 Database Configuration

### Current Setup (SQLite)
```env
DATABASE_URL=sqlite:///./healsense.db
```

### Switch to PostgreSQL (Production Ready)
1. Install PostgreSQL
2. Create database:
   ```sql
   CREATE DATABASE healsense;
   ```
3. Update `.env`:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/healsense
   ```
4. Run migrations:
   ```bash
   alembic upgrade head
   ```

---

## 📦 Dependencies Added

Core database packages installed:
- `sqlalchemy==2.0.45` - ORM framework (Python 3.14 compatible)
- `alembic==1.12.1` - Database migrations
- `psycopg2-binary==2.9.9` - PostgreSQL adapter
- `python-dotenv==1.0.0` - Environment variable management

---

## 🔄 Migration Workflow

### Create New Migration
```bash
cd backend
alembic revision --autogenerate -m "Description of changes"
```

### Apply Migrations
```bash
alembic upgrade head
```

### Rollback
```bash
alembic downgrade -1
```

---

## 🎯 API Endpoints Summary

### Patients (`/api/v1/patients`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all patients |
| GET | `/{patient_id}` | Get patient by ID |
| GET | `/{patient_id}/profile` | Get patient profile |
| GET | `/{patient_id}/vitals/latest` | Get latest vitals |
| GET | `/{patient_id}/vitals/history` | Get vitals history |
| GET | `/{patient_id}/alerts` | Get patient alerts |
| POST | `/{patient_id}/vitals` | Record new vitals |
| GET | `/{patient_id}/predictions` | Get health predictions |
| GET | `/{patient_id}/device` | Get patient's device |
| POST | `/{patient_id}/emergency` | Trigger emergency |

### Devices (`/api/v1/devices`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/{device_id}/status` | Get device status |
| POST | `/{device_id}/connect` | Connect device to patient |
| POST | `/{device_id}/disconnect` | Disconnect device |

### Alerts (`/api/v1/alerts`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/{alert_id}/acknowledge` | Acknowledge alert |
| POST | `/{alert_id}/dismiss` | Dismiss alert |

---

## ✅ Features Implemented

- ✅ SQLAlchemy ORM models with relationships
- ✅ Database connection with session management
- ✅ Dependency injection (`Depends(get_db)`)
- ✅ Database initialization & seeding
- ✅ Alembic migration framework
- ✅ All API routes connected to database
- ✅ Automatic timestamps (created_at, updated_at)
- ✅ Foreign key relationships
- ✅ Enum types (HealthStatus, AlertSeverity)
- ✅ Indexed columns for performance
- ✅ Health check endpoint
- ✅ API documentation (Swagger UI)

---

## 🔜 Next Steps

### Immediate
1. Switch from SQLite to PostgreSQL (optional)
2. Add authentication & authorization (JWT)
3. Implement WebSocket for real-time updates
4. Add rate limiting & request validation

### Future Enhancements
1. ML model integration for predictions
2. Batch data processing
3. Data analytics & reporting
4. Notification system (email/SMS)
5. Multi-tenant support
6. Audit logging
7. Backup & recovery procedures

---

## 📚 Resources

- **FastAPI Docs**: https://fastapi.tiangolo.com
- **SQLAlchemy Docs**: https://docs.sqlalchemy.org
- **Alembic Docs**: https://alembic.sqlalchemy.org
- **PostgreSQL Docs**: https://www.postgresql.org/docs

---

## 🐛 Troubleshooting

### Server Won't Start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill process if needed
taskkill /PID <PID> /F
```

### Database Errors
```bash
# Reinitialize database
cd backend
python init_db.py
```

### Module Import Errors
```bash
# Ensure you're in correct directory
cd e:\Github\FYP-Project\healsense\backend

# Check Python environment
E:/Github/FYP-Project/.venv/Scripts/python.exe --version
```

---

## 📞 Support

If you encounter issues:
1. Check the logs in the terminal
2. Visit http://localhost:5000/api/docs for API documentation
3. Review the `.env` file for correct configuration
4. Ensure database is initialized (`python init_db.py`)

---

**Status**: 🟢 Fully Operational  
**Last Updated**: 2026-01-21  
**Version**: 1.0.0
