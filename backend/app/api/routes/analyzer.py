from api.routes.youtube import get_comments
from api.objects import pipe, youtube
import joblib
from core.errors import PredictException
from fastapi import APIRouter, HTTPException
from loguru import logger
from api.types import *
import heapq
router = APIRouter()

async def prop_analyze(comments):
    result = {}
    top = []
    print(len(comments))
    for i,prop in enumerate(pipe(comments)):
        temp = 0
        for p in prop:
            if p['label'] not in {'clean', '악플/욕설'}:
                if p['score'] > 0.5:
                    temp += p['score']
            if p['label'] in result:
                result[p['label']] +=  p['score']
            else:
                result[p['label']] =  p['score']
        if temp > 0.5:
            top.append([-temp,comments[i],prop])
    top3 = []
    cnt = 0
    heapq.heapify(top)
    while top:
        if cnt >= 3:
            break
        t = heapq.heappop(top)
        print(t)
        top3.append(t[1:])
        cnt+=1
    n = len(comments)
            
    return AnalyzedResponse(totalsum=result, comment_num=n, top_3=top3)


@router.get("/analyze/{channel_id}")
async def channel_search(channel_id: str):
    future = get_comments(youtube,channel_id,500)
    comments = await future
    future =  prop_analyze(comments)
    properties = await future
    return properties
        