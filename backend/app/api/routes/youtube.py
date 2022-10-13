from api.objects import youtube
import joblib
from core.errors import PredictException
from fastapi import APIRouter, HTTPException
from loguru import logger
from api.types import *

router = APIRouter()


def search_channels(youtube, query):
    response = youtube.search().list(
        q=query,
        order="relevance",
        part="snippet",
        maxResults=10
    ).execute()
    channels = []
    while response:
        for item in response['items']:
            if item['id']['kind'] == 'youtube#channel':
                channel = item['snippet']
                channel_info = ChannelInfo(
                    channel_id=channel['channelId'],
                    channel_name=channel['title'],
                    thumbnail=channel['thumbnails']['medium']['url']
                )
                channels.append(channel_info)
        if 'nextPageToken' in response:
            break
    return channels


@router.get("/channel/{channel_name}")
async def channel_search(channel_name: str):
    channels = search_channels(youtube, channel_name)
    return ChannelResponse(channels=channels)
