from api.routes.youtube import get_comments
from api.objects import pipe, youtube
import joblib
from core.errors import PredictException
from fastapi import APIRouter, HTTPException
from loguru import logger
from api.types import *

router = APIRouter()

async def prop_analyze(comments):
    result = {}
    for prop in pipe(comments):
        for p in prop:
            if p['label'] in result:
                result[p['label']] +=  p['score']
            else:
                result[p['label']] =  p['score']
    return result


@router.get("/anaylze/{channel_id}")
async def channel_search(channel_id: str):
    future = get_comments(youtube,channel_id,100)
    comments = await future
    future = properties = prop_analyze(comments)
    properties = await future
    return properties
        