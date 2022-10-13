from api.objects import youtube
import joblib
from core.errors import PredictException
from fastapi import APIRouter, HTTPException
from loguru import logger
from api.types import *

router = APIRouter()


async def search_channels(youtube, query):
    response = youtube.search().list(
        q=query,
        type='channel',
        order="relevance",
        part="snippet",
        maxResults=10
    ).execute()
    channels = []
    while response:
        for item in response['items']:
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


async def get_comments(youtube, channel_id, n):
    response = youtube.commentThreads().list(
        part="snippet,replies",
        allThreadsRelatedToChannelId=channel_id,
        maxResults=n,
        order="time"
    ).execute()
    comments = []
    while response:
        for item in response['items']:
            comment = item['snippet']['topLevelComment']['snippet']
            comments.append(comment['textDisplay'])
            if item['snippet']['totalReplyCount'] > 0:
                for reply_item in item['replies']['comments']:
                    reply = reply_item['snippet']
                    comments.append(reply['textDisplay'])
        if 'nextPageToken' in response:
            #    response = youtube.commentThreads().list(part='snippet,replies', videoId='x2kcdJo1uwU', pageToken=response['nextPageToken'], maxResults=100).execute()
            # else:
            break
    return comments


@router.get("/channel/{channel_name}")
async def channel_search(channel_name: str):
    future = search_channels(youtube, channel_name)
    channels = await future
    return ChannelResponse(channels=channels)
