import logging
import sys

from core.logging import InterceptHandler
from loguru import logger
from starlette.config import Config

config = Config(".env")

API_PREFIX = "/api"
VERSION = "0.1.0"
DEBUG: bool = config("DEBUG", cast=bool, default=False)


PROJECT_NAME: str = config("PROJECT_NAME", default="creator-prop-analyzer")

DEVELOPER_KEY: str = config("DEVELOPER_KEY", cast=str, default='')
YOUTUBE_API_SERVICE_NAME: str = config(
    "YOUTUBE_API_SERVICE_NAME", cast=str, default='')
YOUTUBE_API_VERSION = 'v3'
# logging configuration
LOGGING_LEVEL = logging.DEBUG if DEBUG else logging.INFO
logging.basicConfig(
    handlers=[InterceptHandler(level=LOGGING_LEVEL)], level=LOGGING_LEVEL
)
logger.configure(handlers=[{"sink": sys.stderr, "level": LOGGING_LEVEL}])
