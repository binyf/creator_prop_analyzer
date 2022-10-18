from email.policy import HTTP
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
    if response['items'] != []:
        while response:
            for item in response['items']:
                channel = item['snippet']
                channel_info = ChannelInfo(
                    channel_id=channel['channelId'],
                    channel_name=channel['title'],
                    description=channel['description'],
                    thumbnail=channel['thumbnails']['medium']['url']
                )
                channels.append(channel_info)
            if 'nextPageToken' in response:
                break
    return channels


async def search_channel_info(youtube, channel_id):
    response = youtube.channels().list(
        id=channel_id,
        part='statistics',
    ).execute()
    if response['pageInfo']['totalResults'] == 1:
        while response:
            for item in response['items']:
                return ChannelStatistics(
                    view_count=int(item['statistics']['viewCount']),
                    sub_count=int(item['statistics']['subscriberCount']),
                    vid_count=int(item['statistics']['videoCount']),
                )

    else:
        return False


async def get_comments(youtube, channel_id, n):
    response = youtube.commentThreads().list(
        part="snippet,replies",
        allThreadsRelatedToChannelId=channel_id,
        maxResults=n,
        order="time"
    ).execute()
    comments = []
    if response['items'] != []:
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
    print(channel_name)
    future = search_channels(youtube, channel_name)
    channels = await future
    return ChannelResponse(channels=channels)


@router.get("/channel_info/{channel_id}")
async def channel_info(channel_id: str):
    future = search_channel_info(youtube, channel_id)
    statistics = await future
    if statistics:
        return statistics
    else:
        return HTTPException(400, detail='Unavailable ID')
