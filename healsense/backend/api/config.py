"""
HealSense Backend API - Configuration Management
Handles environment variables and application settings
"""
from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import Optional


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""
    
    # App Configuration
    PROJECT_NAME: str = "HealSense"
    ENV: str = "development"
    DEBUG: bool = True
    API_V1_PREFIX: str = "/api/v1"
    HOST: str = "0.0.0.0"
    PORT: int = 5000
    
    # Security
    SECRET_KEY: str = "change-this-in-production-use-secrets-generator"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    ALLOWED_ORIGINS: str = "*"
    
    # Database
    DATABASE_URL: str = "postgresql://user:password@localhost:5432/healsense"
    
    # Cache/Queue
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379
    REDIS_PASSWORD: Optional[str] = None
    
    # MQTT (IoT Communication)
    MQTT_BROKER: str = "localhost"
    MQTT_PORT: int = 1883
    MQTT_TOPIC: str = "healsense/vitals"
    MQTT_USERNAME: Optional[str] = None
    MQTT_PASSWORD: Optional[str] = None
    
    # Firebase (Optional)
    FIREBASE_CREDENTIALS_PATH: Optional[str] = None
    
    # ML Model Paths
    LSTM_MODEL_PATH: str = "../data/models/lstm_model.h5"
    RF_MODEL_PATH: str = "../data/models/random_forest.pkl"
    SCALER_PATH: str = "../data/models/scaler.pkl"
    
    # Alert Thresholds
    HEART_RATE_MIN: int = 50
    HEART_RATE_MAX: int = 120
    SPO2_MIN: int = 92
    TEMP_MAX: float = 38.0
    SYSTOLIC_BP_MIN: int = 90
    SYSTOLIC_BP_MAX: int = 140
    
    # WhatsApp Business API (Optional)
    WHATSAPP_API_URL: Optional[str] = None
    WHATSAPP_API_TOKEN: Optional[str] = None
    WHATSAPP_TEMPLATE_ALERT: str = "health_alert"
    
    # Twilio SMS (Optional)
    TWILIO_ACCOUNT_SID: Optional[str] = None
    TWILIO_AUTH_TOKEN: Optional[str] = None
    TWILIO_FROM_NUMBER: Optional[str] = None
    
    # Logging
    LOG_LEVEL: str = "INFO"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


@lru_cache()
def get_settings() -> Settings:
    """
    Get cached settings instance.
    Uses lru_cache to avoid recreating settings on every call.
    """
    return Settings()
