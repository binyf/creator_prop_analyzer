from fastapi import APIRouter

from api.routes import predictor
from api.routes import youtube
router = APIRouter()
router.include_router(youtube.router, tags=["youtube"], prefix="/v1")
