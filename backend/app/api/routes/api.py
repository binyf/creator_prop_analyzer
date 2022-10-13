from fastapi import APIRouter

from api.routes import predictor
from api.routes import youtube
from api.routes import analyzer

router = APIRouter()
router.include_router(youtube.router, tags=["youtube"], prefix="/v1")
router.include_router(analyzer.router, tags=["analyzer"], prefix="/v1")
