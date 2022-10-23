from email.policy import HTTP
from api.objects import youtube
import joblib
from core.errors import PredictException
from fastapi import APIRouter, HTTPException
from loguru import logger
from api.types import *
import re

router = APIRouter()
c = re.compile('<.*?>|&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});|@\S*\s')


async def search_channels(youtube, query):
    response = youtube.search().list(
        q=query,
        type='channel',
        order="relevance",
        part="snippet",
        maxResults=10
    ).execute()
    channels = []
    if response['pageInfo']['totalResults'] != 0:
        for item in response['items']:
            channel = item['snippet']
            channel_info = ChannelInfo(
                channel_id=channel['channelId'],
                channel_name=channel['title'],
                description=channel['description'],
                thumbnail=channel['thumbnails']['medium']['url']
            )
            channels.append(channel_info)
    return channels


async def search_channel_info(youtube, channel_id):
    response = youtube.channels().list(
        id=channel_id,
        part='statistics, brandingSettings',
    ).execute()
    if response['pageInfo']['totalResults'] == 1:
        for item in response['items']:
            try:
                return ChannelStatistics(
                    view_count=int(item['statistics']['viewCount']),
                    sub_count=int(item['statistics']['subscriberCount']),
                    vid_count=int(item['statistics']['videoCount']),
                    banner_url=item['brandingSettings']['image']['bannerExternalUrl']
                )
            except:
                return ChannelStatistics(
                    view_count=int(item['statistics']['viewCount']),
                    sub_count=int(item['statistics']['subscriberCount']),
                    vid_count=int(item['statistics']['videoCount']),
                    banner_url=''
                )
    else:
        return False


async def get_comments(youtube, channel_id, n):
    response = youtube.commentThreads().list(
        part="snippet,replies",
        allThreadsRelatedToChannelId=channel_id,
        maxResults=100,
        order="time"
    ).execute()
    comments = []
    while response:
        try:
            if len(comments) > n:
                break
            for item in response['items']:
                comment = item['snippet']['topLevelComment']['snippet']
                if len(comment['textDisplay']) < 300:
                    filtered = re.sub(c, '', comment['textDisplay'])
                    comments.append(filtered)
                if item['snippet']['totalReplyCount'] > 0:
                    for reply_item in item['replies']['comments']:
                        reply = reply_item['snippet']
                        if len(reply['textDisplay']) < 300:
                            filtered = re.sub(c, '', reply['textDisplay'])
                            comments.append(filtered)
            if 'nextPageToken' in response:
                response = youtube.commentThreads().list(part='snippet,replies', allThreadsRelatedToChannelId=channel_id,
                                                         pageToken=response['nextPageToken'], maxResults=100, order='time').execute()
            else:
                break
        except:
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
